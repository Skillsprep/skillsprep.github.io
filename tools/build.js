#!/usr/bin/env node
/* SkillPrep static site generator.
 *   node tools/build.js
 * site root (index.html, guides/<slug>/index.html, about/, contact/, privacy/, terms/,
 * 404.html, sitemap.xml, robots.txt). No dependencies. */
"use strict";
const fs = require("fs");
const path = require("path");
const cfg = require("./config");
// Power BI and Google Sheets guides live in their own files; place it right after the SQL guide in the site order.
const POSTS = (() => {
  const base = require("./content/guides"), extra = require("./content/powerbi"), sheets = require("./content/sheets");
  const at = base.findIndex((x) => x.slug === "sql-study-guide") + 1;
  const out = [...base.slice(0, at), ...extra, ...sheets, ...base.slice(at)];
  // Advanced Python guide goes right after the Python guide.
  const py = out.findIndex((x) => x.slug === "python-study-guide") + 1;
  out.splice(py, 0, ...require("./content/advpython"));
  // Developer fundamentals guide goes right after the Git guide.
  const dv = out.findIndex((x) => x.slug === "git-study-guide") + 1;
  out.splice(dv, 0, ...require("./content/devskills"));
  // Practical AI guide goes right before the Generative AI practice test.
  const ai = out.findIndex((x) => x.slug === "generative-ai-career-essentials-practice-test");
  out.splice(ai < 0 ? out.length : ai, 0, ...require("./content/practicalai"));
  return out;
})();
// Group questions by topic (topics in first-appearance order, original order kept within each topic)
// so each topic heading appears once in a test.
function groupByTopic(list) {
  const order = [];
  list.forEach((q) => { if (!order.includes(q.p)) order.push(q.p); });
  return order.flatMap((t) => list.filter((q) => q.p === t));
}
const qid = (text) => require("crypto").createHash("sha1").update(text).digest("hex").slice(0, 8);
const BANKS = {
  GENAI_QUESTIONS: require("./content/genai"),
  LEAN_QUESTIONS: groupByTopic(require("./content/lean").concat(require("./content/lean_more"))),
  POWERBI_QUESTIONS: groupByTopic(require("./content/powerbi_test")),
};

const ROOT = path.resolve(__dirname, "..");
const SITE = cfg.siteUrl.replace(/\/+$/, "") + "/";
const BASE = cfg.basePath.endsWith("/") ? cfg.basePath : cfg.basePath + "/";
const OG_IMAGE = SITE + "assets/og-image.png";

/* ---------------- helpers ---------------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const stripTags = (h) => h.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
const slugify = (s) => stripTags(s).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
function isoDate(str) {
  const m = /^(\w{3}) (\d{1,2}), (\d{4})$/.exec(str);
  if (!m) throw new Error("Bad date: " + str);
  return `${m[3]}-${String(MONTHS[m[1]] + 1).padStart(2, "0")}-${String(+m[2]).padStart(2, "0")}`;
}
const longDate = (iso) => {
  const [y, mo, d] = iso.split("-").map(Number);
  return `${Object.keys(MONTHS)[mo - 1]} ${d}, ${y}`;
};
function trimDesc(s, max = 158) {
  s = stripTags(s);
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s—-]+$/, "") + "…";
}
// Meta description / title guards. Google sets no hard limit but truncates to the device width, so descriptions
// must be complete sentences that fit, and titles concise. Long ones need an explicit entry in tools/config.js.
const DESC_MAX = 158, TITLE_MAX = 60;
function guideDesc(p) {
  const d = (cfg.descriptions || {})[p.slug] || stripTags(p.excerpt);
  if (d.length > DESC_MAX) throw new Error(`${p.slug}: meta description is ${d.length} characters (max ${DESC_MAX}). Add a complete one to cfg.descriptions.`);
  if (/…|\.\.\.$/.test(d)) throw new Error(`${p.slug}: meta description must not be truncated with an ellipsis`);
  return d;
}
function guideTitle(p) {
  const t = (cfg.seoTitles || {})[p.slug] || p.title;
  const full = `${t} | ${cfg.siteName}`;
  if (full.length > TITLE_MAX) throw new Error(`${p.slug}: page title is ${full.length} characters (max ${TITLE_MAX}). Add a shorter one to cfg.seoTitles.`);
  return t;
}
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
function write(rel, content) {
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  if (f.endsWith('.html')) content = content.replace(/<pre>/g, '<pre tabindex="0">'); // scrollable code must be keyboard-reachable
  fs.writeFileSync(f, content);
}

/* ---------------- content preparation ---------------- */
// Rendered question banks -> static HTML (no runtime data files needed).
function renderBank(bankKey, prefix) {
  const bank = BANKS[bankKey];
  if (!bank) throw new Error("Unknown bank " + bankKey);
  const total = bank.length;
  let lastPart = null;
  let html = `<div class="mock" data-mock data-total="${total}" data-key="${prefix}">
  <noscript><div class="callout"><b>JavaScript needed</b> The interactive practice test and instant scoring need JavaScript. You can still read every question below.</div></noscript>
  
  <div class="assessment-header" style="background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); padding: 16px 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow); position: sticky; top: 70px; z-index: 40;">
    <div>
      <div style="font-size: 0.85rem; font-weight: 600; color: var(--teal-text); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Practice Assessment</div>
      <div class="mock-count" role="status" aria-live="polite" style="font-weight: 700; color: var(--navy); font-size: 1.1rem;">Answered 0 / ${total}</div>
      <div class="mock-hint" style="font-size: 0.85rem; color: var(--muted); margin-top: 4px;">Untimed · scored at the end</div>
    </div>
    <div style="flex: 1; margin: 0 32px; max-width: 400px; display: none;" class="desktop-only-progress">
      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--muted); margin-bottom: 6px;"><span>Progress</span><span class="progress-pct">0%</span></div>
      <div style="height: 6px; background: var(--line); border-radius: 4px; overflow: hidden;"><div class="progress-fill" style="height: 100%; width: 0%; background: var(--teal); transition: width 0.3s ease;"></div></div>
    </div>
    <div class="mock-actions"><button class="btn mock-finish" type="button">Finish Assessment</button></div>
  </div>
  
  <div class="mock-result" role="status" tabindex="-1" aria-live="polite"></div>`;
  bank.forEach((it, i) => {
    if (it.p !== lastPart) {
      lastPart = it.p;
      const n = bank.filter((q) => q.p === it.p).length;
      html += `\n  <h3 class="mock-part">${esc(it.p)} <span>${n} question${n === 1 ? "" : "s"}</span></h3>`;
    }
    const id = `${prefix}-q${i + 1}`;
    html += `
  <div class="quiz" data-q data-qid="${qid(it.q)}" data-part="${esc(it.p)}" data-answer="${it.a}" id="${id}">
    <div class="q-head"><span>Question ${i + 1} of ${total}</span><span>${esc(it.p)}</span><button type="button" class="bm-btn" aria-pressed="false" hidden>☆ Bookmark</button></div>
    <div class="q-body" role="radiogroup" aria-labelledby="${id}-t">
      <p class="q-text" id="${id}-t">${esc(it.q)}</p>
      ${it.o.map((o, j) => `<label class="opt"><input type="radio" name="${id}" value="${j}"> ${esc(o)}</label>`).join("\n      ")}
    </div>
    <div class="q-explain"><b>Correct answer:</b> ${esc(it.o[it.a])}<br><span class="why">${esc(it.w || "")}</span></div>
  </div>`;
  });
  return html + "\n</div>";
}

// Remove inline quiz blocks (balanced <div> scan) so reading time counts prose only.
function stripQuizzes(html) {
  const marker = '<div class="quiz" data-quiz>';
  let out = "", i = 0;
  for (;;) {
    const at = html.indexOf(marker, i);
    if (at === -1) { out += html.slice(i); break; }
    out += html.slice(i, at);
    let depth = 0, j = at; const re = /<div\b|<\/div>/g; re.lastIndex = at;
    let m;
    while ((m = re.exec(html))) { depth += m[0] === "</div>" ? -1 : 1; j = re.lastIndex; if (depth === 0) break; }
    i = j;
  }
  return out;
}
function prepareBody(post, body) {
  // Bank placeholders -> static test markup
  body = body.replace(/<div id="([\w-]+)" data-bank="(\w+)"><\/div>/g, (_, id, key) => renderBank(key, id));
  // Inline quizzes: unique radio names, accessible groups, result region
  let qn = 0;
  body = body.split('<div class="quiz" data-quiz>').map((chunk, i) => {
    if (i === 0) return chunk;
    qn++;
    const id = `${post.slug}-iq${qn}`;
    chunk = chunk
      .replace(/name="q(\d+)"/g, `name="${post.slug}-q$1"`)
      .replace('<div class="q-body">', `<div class="q-body" role="radiogroup" aria-labelledby="${id}-t">`)
      .replace('<p class="q-text">', `<p class="q-text" id="${id}-t">`)
      .replace('<button class="check-btn">Check answer</button>', '<button type="button" class="check-btn">Check answer</button><span class="q-result" role="status" aria-live="polite"></span>');
    return chunk;
  }).join('<div class="quiz" data-quiz>');
  return body;
}

// Extra in-depth teaching sections live in tools/content/extra/<slug>.js and are merged in
// just before the practice/exercise section of each page.
function withExtras(p) {
  const f = path.join(__dirname, "content", "extra", p.slug + ".js");
  if (!fs.existsSync(f)) return p;
  const extra = require(f);
  const at = p.sections.findIndex((s) => /^(Practical learning exercises|Practice test|How to use SkillPrep now)/.test(s.h));
  const sections = p.sections.slice();
  sections.splice(at < 0 ? sections.length : at, 0, ...extra);
  return { ...p, sections };
}
const posts = POSTS.map(withExtras).map((p, idx) => {
  // id of the full practice-test bank on this page (also the localStorage bookmark key), read before placeholders are rendered
  const bankMatch = p.sections.map((s) => /<div id="([\w-]+)" data-bank="(\w+)"><\/div>/.exec(s.body)).find(Boolean);
  const bankId = bankMatch ? bankMatch[1] : "";
  const bankKey = bankMatch ? bankMatch[2] : "";
  const sections = p.sections.map((s) => ({ h: s.h, id: slugify(s.h), body: prepareBody(p, s.body) }));
  const ids = new Set();
  sections.forEach((s) => { let b = s.id, n = 2; while (ids.has(s.id)) s.id = b + "-" + n++; ids.add(s.id); });
  const words = stripTags(p.intro + " " + p.sections.map((s) => stripQuizzes(s.body.replace(/<div id="[\w-]+" data-bank="\w+"><\/div>/, ""))).join(" ")).split(" ").length;
  const bankN = bankKey ? BANKS[bankKey].length : 0;
  const readTime = bankN ? "About " + Math.max(5, Math.round(bankN * 0.75)) + " min test" : Math.max(2, Math.round(words / 200)) + " min read";
  return { ...p, idx, bankId, bankKey, sections, published: isoDate(p.date), reviewed: p.reviewed || cfg.lastReviewed, readTime, url: `guides/${p.slug}/`, sources: cfg.sources[p.slug] || [] };
});
const CATS = [...new Set(posts.map((p) => p.category))].filter(c => c !== "Getting started" && c !== "Getting Started");
const inlineQs = posts.reduce((n, p) => n + (p.sections.map((s) => s.body).join("").match(/data-quiz/g) || []).length, 0);
const TOTAL_QS = inlineQs + Object.values(BANKS).reduce((n, b) => n + b.length, 0);
// sanity: slugs unique, every legacy mapping lands on a real page
const slugSet = new Set(posts.map((p) => p.slug));
if (slugSet.size !== posts.length) throw new Error("Duplicate slugs");
Object.entries(cfg.related || {}).forEach(([k, arr]) => [k, ...arr].forEach((v) => { if (!slugSet.has(v)) throw new Error("related -> missing " + v); }));
Object.values(cfg.legacySlugs).forEach((v) => { if (!slugSet.has(v)) throw new Error("legacy -> missing " + v); });

/* ---------------- layout ---------------- */
function layout({ title, desc, path: pagePath, prefix, nav, body, ld = [], type = "website", robots = "index,follow", scripts = true, extraHead = "" }) {
  const canonical = SITE + pagePath;
  const home = prefix || "./";
  const link = (p) => (prefix + p) || "./";
  const navItem = (key, label, href) => `<a href="${href}"${nav === key ? ' aria-current="page" class="active"' : ""}>${label}</a>`;
  const popular = posts.slice(0, 3);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="google-site-verification" content="rOGMro0A_ltGwtwagVfnPJFPmn59apiGYOa0LKMT4n8">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#0D1B2A">
<meta property="og:site_name" content="${esc(cfg.siteName)}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${OG_IMAGE}">
<link rel="icon" href="${link("assets/favicon.svg")}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"></noscript>
<link rel="stylesheet" href="${link("css/style.css")}">
<script>(function(){try{if(localStorage.getItem("skillprep:theme")==="dark"){document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();</script>
${extraHead}${ld.map(jsonLd).join("\n")}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9455217122501464" crossorigin="anonymous"></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a href="${home}" class="logo"><span class="mark" aria-hidden="true">S</span> ${esc(cfg.siteName)}</a>
    <button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mainNav">☰</button>
    <nav class="main-nav" id="mainNav" aria-label="Main">
      ${navItem("home", "Home", home)}
      ${navItem("guides", "Guides", link("guides/"))}
      ${navItem("projects", "Projects", link("projects/"))}
      ${navItem("about", "About", link("about/"))}
      ${navItem("contact", "Contact", link("contact/"))}
    </nav>
    <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle dark mode">◐</button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h2 class="foot-h">${esc(cfg.siteName)}</h2>
        <p class="foot-about">Concept-first study guides and practice tests for everyday work skills. Learn the "why" behind every answer.</p>
      </div>
      <div>
        <h2 class="foot-h">Explore</h2>
        <a href="${home}">All guides</a>
        <a href="${link("guides/")}">Guides</a>
        <a href="${link("projects/")}">Projects</a>
        <a href="${link("about/")}">About</a>
        <a href="${link("contact/")}">Contact</a>
        <a href="${link("privacy/")}">Privacy</a>
        <a href="${link("terms/")}">Terms</a>
      </div>
      <div>
        <h2 class="foot-h">Popular guides</h2>
        ${popular.map((p) => `<a href="${link(p.url)}">${esc(p.title.split(":")[0])}</a>`).join("\n        ")}
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 ${esc(cfg.siteName)}. All rights reserved.</span>
      <span>Independent educational site. Not affiliated with LinkedIn, Microsoft or any other vendor; product names are trademarks of their owners.</span>
    </div>
  </div>
</footer>
<button class="back-top" id="backTop" type="button" aria-label="Back to top">↑</button>
<div id="cookieConsent" class="cookie-consent" hidden>
  <div class="cookie-inner">
    <p>SkillPrep saves your quiz progress in your browser's local storage. Ads are shown through Google AdSense, which may use cookies. See our <a href="${link("privacy/")}">Privacy Policy</a> for details and opt-out options.</p>
    <div class="cookie-actions">
      <button id="cookieAccept" class="btn">OK</button>
    </div>
  </div>
</div>
${scripts ? `<script src="${link("js/site.js")}" defer></script>` : ""}
</body>
</html>
`;
}

/* ---------------- pages ---------------- */
function getQuestionCount(p) {
  const inline = (p.sections.map(s => s.body).join("").match(/data-quiz/g) || []).length;
  if (p.bankKey) return BANKS[p.bankKey].length;
  return inline;
}

function card(p, prefix) {
  const qCount = getQuestionCount(p);
  const isTest = /practice-test/.test(p.slug);
  const difficulty = isTest ? "Intermediate - Advanced" : p.category === "Getting Started" ? "All levels" : "Beginner - Intermediate";
  const actionText = isTest ? "Start Practice Test" : p.category === "Getting Started" ? "Read Guide" : "Start Learning";
  const timeLabel = p.readTime;
  
  // Full practice tests carry a bookmark storage key (the bank id) so the dashboard can list their bookmarks.
  const bmAttr = p.bankId ? ` data-bmkey="${p.bankId}"` : "";
  return `<a class="post-card" href="${prefix}${p.url}"${bmAttr} data-cat="${esc(p.category)}" data-search="${esc((p.title + " " + p.excerpt + " " + p.category).toLowerCase())}">
        <div class="thumb" style="background:${p.gradient}" aria-hidden="true">${p.icon}</div>
        <div class="body">
          <div class="cat">${esc(p.category)}</div>
          <h3>${esc(p.title.replace(/:.*/, ''))}</h3>
          <p class="excerpt">${esc(p.excerpt)}</p>
          <div class="card-details">
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> ${difficulty}</span>
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ${esc(timeLabel)}</span>
            ${qCount > 0 ? `<span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> ${qCount} Questions</span>` : ''}
          </div>
          <div class="meta"><span class="btn btn-outline" style="width:100%">${actionText}</span></div>
        </div>
      </a>`;
}

function homePage() {
  const legacy = JSON.stringify(cfg.legacySlugs);
  const redirect = `<script>(function(){var h=location.hash;if(h.indexOf("#/")!==0)return;var m=${legacy},p=h.slice(2).split("/");var t=null;if(p[0]==="post"&&m[p[1]])t="guides/"+m[p[1]]+"/";else if(p[0]==="about")t="about/";else if(p[0]==="contact")t="contact/";if(t)location.replace(t);})();</script>\n`;
  const tests = posts.filter((p) => /practice-test/.test(p.slug));
  const body = `
<section class="hero">
  <div class="container">
    <h1>Build Skills. Test Knowledge. <span>Grow Your Career.</span></h1>
    <p>Explore practical study guides, improve your technical knowledge and prepare for real-world skills assessments.</p>
    <div class="hero-actions">
      <a href="#guides" class="btn">Explore Study Guides</a>
      <a href="guides/generative-ai-career-essentials-practice-test/" class="btn btn-outline" style="background:#fff">Start Practice Tests</a>
    </div>
    <form class="search-bar" id="searchForm" role="search" action="./" method="get" style="margin-top: 30px;">
      <label for="searchInput" class="visually-hidden">Search guides</label>
      <input type="search" id="searchInput" name="q" placeholder="Search Excel, Python, SQL, Power BI, Generative AI..." autocomplete="off">
      <button type="submit">Search</button>
    </form>
    <div class="stats">
      <div class="stat"><b>${posts.length}</b><small>Study Guides</small></div>
      <div class="stat"><b>${TOTAL_QS}</b><small>Practice Questions</small></div>
      <div class="stat"><b>${CATS.length}</b><small>Skill Categories</small></div>
      <div class="stat"><b>${tests.length}</b><small>Assessments</small></div>
    </div>
  </div>
</section>

<section class="section" id="dashboard" style="background: var(--bg); display: none;">
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px;">
      <div>
        <h2 class="section-title">Your Learning Dashboard</h2>
        <p class="section-sub">Track your progress and resume practice where you left off.</p>
      </div>
      <div>
        <button class="btn btn-outline" id="clearDashBtn">Reset Progress</button>
      </div>
    </div>
    
    <div class="stats" style="margin-bottom: 32px; background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); padding: 24px;">
      <div class="stat"><b id="dashTotalQs">0</b><small>Questions Attempted</small></div>
      <div class="stat"><b id="dashAccuracy">0%</b><small>Accuracy Rate</small></div>
      <div class="stat"><b id="dashCompleted">0</b><small>Modules Started</small></div>
    </div>
    
    <div class="post-grid" id="dashGrid">
      <!-- Populated by JS -->
    </div>

    <div id="dashBookmarks" hidden style="margin-top: 32px;">
      <h3 class="section-title" style="font-size: 1.15rem;">Bookmarked questions</h3>
      <ul class="dash-bm-list" id="dashBmList"></ul>
    </div>
  </div>
</section>

<section class="section" id="guides">
  <div class="container">
    <h2 class="section-title" id="gridTitle">All guides</h2>
    <p class="section-sub" id="gridSub">Hand-written study notes with interactive practice quizzes.</p>
    <div class="chip-row" id="chips" role="group" aria-label="Filter by category">
      <button type="button" class="chip active" data-cat="All" aria-pressed="true">All</button>
      ${CATS.map((c) => `<button type="button" class="chip" data-cat="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join("\n      ")}
    </div>
    <div class="post-grid" id="grid">
      ${posts.map((p) => card(p, "")).join("\n      ")}
    </div>
    <div class="empty-state" id="emptyState" hidden>
      <div class="big" aria-hidden="true">🔍</div>
      <h3>No guides found</h3>
      <p>Try a different keyword or category.</p>
    </div>
  </div>
</section>

<section class="section alt" style="background: var(--card); border-top: 1px solid var(--line);">
  <div class="container narrow">
    <h2 class="section-title">Frequently Asked Questions</h2>
    <div class="faq-list" style="margin-top: 24px;">
      <details style="margin-bottom: 16px; border: 1px solid var(--line); border-radius: var(--radius); padding: 16px; background: var(--bg);">
        <summary style="font-weight: 600; cursor: pointer; color: var(--navy); display: flex; justify-content: space-between; align-items: center;">How does SkillPrep work? <span>↓</span></summary>
        <p style="margin-top: 12px; color: var(--muted); font-size: 0.95rem;">SkillPrep provides comprehensive study guides and interactive practice tests for essential professional skills like Excel, SQL, and Python. Read the guides to learn concepts, then test your knowledge.</p>
      </details>
      <details style="margin-bottom: 16px; border: 1px solid var(--line); border-radius: var(--radius); padding: 16px; background: var(--bg);">
        <summary style="font-weight: 600; cursor: pointer; color: var(--navy); display: flex; justify-content: space-between; align-items: center;">Is my progress saved? <span>↓</span></summary>
        <p style="margin-top: 12px; color: var(--muted); font-size: 0.95rem;">Yes! Your progress on practice tests is saved anonymously and securely in your browser's local storage. We don't require an account or track you across devices.</p>
      </details>
      <details style="margin-bottom: 16px; border: 1px solid var(--line); border-radius: var(--radius); padding: 16px; background: var(--bg);">
        <summary style="font-weight: 600; cursor: pointer; color: var(--navy); display: flex; justify-content: space-between; align-items: center;">Do you provide official certifications? <span>↓</span></summary>
        <p style="margin-top: 12px; color: var(--muted); font-size: 0.95rem;">No, we are an independent educational platform. Our materials are designed to help you prepare for real-world assessments and interviews, but we are not affiliated with official vendors.</p>
      </details>
    </div>
  </div>
</section>`;
  return layout({
    title: "SkillPrep — Free Study Guides & Practice Tests for Work Skills",
    desc: "Free, concept-first study guides and practice quizzes for Excel, Python, SQL, JavaScript, Git, project management, generative AI and more — every answer explained.",
    path: "", prefix: "", nav: "home", body, extraHead: redirect,
    ld: [
      { "@context": "https://schema.org", "@type": "WebSite", name: cfg.siteName, url: SITE, description: "Free study guides and practice tests for everyday work skills." },
      { "@context": "https://schema.org", "@type": "Organization", name: cfg.siteName, url: SITE, logo: SITE + "assets/favicon.svg" }
    ]
  });
}

function guidePage(p) {
  const prefix = "../../";
  const curated = ((cfg.related || {})[p.slug] || []).map((slug) => posts.find((x) => x.slug === slug)).filter(Boolean);
  const related = posts.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const rel = (curated.length ? curated : (related.length ? related : posts.filter((x) => x.slug !== p.slug))).slice(0, 3);
  const prev = posts[p.idx - 1], next = posts[p.idx + 1];
  const isTest = /practice-test/.test(p.slug);
  const body = `
<div id="progress" aria-hidden="true"></div>
<section class="article-hero">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${prefix}">Home</a> <span aria-hidden="true" class="sep">›</span> <a href="${prefix}guides/">Guides</a> <span aria-hidden="true" class="sep">›</span> <span aria-current="page">${esc(p.category)}</span></nav>
    <div class="cat">${esc(p.category)}</div>
    <h1>${esc(p.title)}</h1>
    <div class="meta">
      <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${esc(p.readTime)}</span>
      ${getQuestionCount(p) > 0 ? `<span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> ${getQuestionCount(p)} Questions</span>` : ""}
      <span>Published <time datetime="${p.published}">${longDate(p.published)}</time></span>
      <span>Reviewed <time datetime="${p.reviewed}">${longDate(p.reviewed)}</time></span>
    </div>
  </div>
</section>
<div class="container article-wrap">
  <article class="article-body">
    <p class="note"><b>Unofficial study resource.</b> ${isTest ? "These practice questions are independent study aids, not official exam content." : "Written independently of any exam provider, employer or software vendor."}</p>
    <details class="toc-mobile">
      <summary>On this page</summary>
      <div class="toc">
        ${p.sections.map((s) => `<a href="#${s.id}">${esc(s.h)}</a>`).join("\n        ")}
        ${p.sources.length ? `<a href="#sources">Sources &amp; further reading</a>` : ""}
      </div>
    </details>
    <p class="lead">${p.intro}</p>
    ${p.sections.map((s) => `<h2 id="${s.id}">${esc(s.h)}</h2>${s.body}`).join("\n    ")}
    ${p.sources.length ? `<h2 id="sources">Sources &amp; further reading</h2>
    <ul class="sources">${p.sources.map(([t, u]) => `<li><a href="${esc(u)}" rel="noopener noreferrer" target="_blank">${esc(t)}</a></li>`).join("")}</ul>` : ""}
    <hr class="sep">
    <nav class="prevnext" aria-label="More guides">
      ${prev ? `<a class="prev" href="${prefix}${prev.url}"><small>← Previous</small>${esc(prev.title)}</a>` : "<span></span>"}
      ${next ? `<a class="next" href="${prefix}${next.url}"><small>Next →</small>${esc(next.title)}</a>` : "<span></span>"}
    </nav>
    <a href="${prefix}guides/" class="btn btn-link">← Back to all guides</a>
  </article>
  <aside class="sidebar">
    <div class="box toc-box">
      <h2 class="box-h">On this page</h2>
      <div class="toc">
        ${p.sections.map((s) => `<a href="#${s.id}" data-toc="${s.id}">${esc(s.h)}</a>`).join("\n        ")}
        ${p.sources.length ? `<a href="#sources" data-toc="sources">Sources &amp; further reading</a>` : ""}
      </div>
    </div>
    <div class="box rel">
      <h2 class="box-h">Related guides</h2>
      ${rel.map((r) => `<a href="${prefix}${r.url}">${esc(r.title)}</a>`).join("\n      ")}
    </div>
    ${(() => { const pj = typeof PROJECTS !== "undefined" && PROJECTS.find((x) => x.guide[0] === p.slug); return pj ? `<div class="box">
      <h2 class="box-h">Practice project</h2>
      <a href="${prefix}projects/${pj.slug}/">${esc(pj.title.replace(/^Project \d: /, ""))}</a>
      <p class="box-p">Download a synthetic dataset and check your work against an answer key.</p>
    </div>` : ""; })()}
    <div class="box">
      <h2 class="box-h">Share this guide</h2>
      <button type="button" class="btn btn-share" id="shareBtn" data-url="${SITE + p.url}" data-title="${esc(p.title)}">Copy Link</button>
    </div>
    <div class="box">
      <h2 class="box-h">Spotted a mistake?</h2>
      <p class="box-p">We correct errors quickly. Tell us what's wrong and we'll fix it.</p>
      <a class="btn btn-link" href="../../contact/">Report a correction</a>
    </div>
  </aside>
</div>`;
  const url = SITE + p.url;
  return layout({
    title: `${guideTitle(p)} | ${cfg.siteName}`,
    desc: guideDesc(p),
    path: p.url, prefix, nav: "", body, type: "article",
    ld: [
      { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: trimDesc(p.excerpt, 300), datePublished: p.published, dateModified: p.reviewed,
        author: { "@type": "Organization", name: cfg.siteName + " editorial team" }, publisher: { "@type": "Organization", name: cfg.siteName, logo: { "@type": "ImageObject", url: SITE + "assets/favicon.svg" } },
        mainEntityOfPage: url, image: OG_IMAGE, articleSection: p.category, inLanguage: "en" },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Guides", item: SITE + "guides/" },
        { "@type": "ListItem", position: 3, name: p.title, item: url } ] }
    ]
  });
}

function pageHero(h1, sub) {
  return `<section class="page-hero"><div class="container"><h1>${h1}</h1><p>${sub}</p></div></section>`;
}

function guidesHub() {
  const cats = [...new Set(posts.map((p) => p.category))];
  const body = `${pageHero("All Study Guides", "Every SkillPrep guide and practice test, grouped by skill. Each one is unofficial, concept-first and reviewed on the date shown on the guide.")}
<div class="container">
  <div class="card prose">
    ${cats.map((c) => `<h2>${esc(c)}</h2>
    <ul>
      ${posts.filter((p) => p.category === c).map((p) => `<li><a href="${p.slug}/">${esc(p.title)}</a> — ${esc(stripTags(p.excerpt))}</li>`).join("\n      ")}
    </ul>`).join("\n    ")}
  </div>
</div>`;
  return layout({
    title: `All Study Guides and Practice Tests | ${cfg.siteName}`,
    desc: `Browse all ${posts.length} SkillPrep study guides and practice tests: ${cats.slice(0, 4).join(", ")} and more, each with practice questions.`,
    path: "guides/", prefix: "../", nav: "guides", body,
    ld: [{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Guides", item: SITE + "guides/" } ] }]
  });
}

function aboutPage() {
  const body = `${pageHero("About SkillPrep", "Honest, concept-first study guides for everyday work skills — because understanding beats memorizing.")}
<div class="container two-col">
  <div class="card prose">
    <h2>Why we exist</h2>
    <p>SkillPrep began as a set of study notes for LinkedIn Skill Assessments. LinkedIn has since retired that feature, so we rebuilt the site around what actually matters: the skills themselves. Excel, Python, SQL, JavaScript, Git and project management are tested in interviews and used at work every day.</p>
    <p>Online prep material tends to be either thin marketing copy or answer dumps. We take a different approach: <b>teach the concepts</b> behind the questions, and use practice questions that check your reasoning, not your memory.</p>
    <h3>What you will find here</h3>
    <ul>
      <li>Study guides that explain core concepts with worked examples</li>
      <li>Interactive practice questions with an explanation for every answer</li>
      <li>Full-length practice tests with instant scoring and a per-topic breakdown</li>
      <li>Links to official documentation so you can check and go deeper</li>
    </ul>
    <h3>How we write and review</h3>
    <ul>
      <li>Guides are written by identifiable experts such as our SkillPrep Editorial Team (comprising Expert Practitioners & Curriculum Designers) and checked against official documentation where it exists.</li>
      <li>Every guide shows when it was published and when it was last reviewed.</li>
      <li>We don't claim to know what appears on any specific exam, and we don't publish "leaked" questions.</li>
      <li>Found an error? <a href="../contact/">Tell us via the contact form</a> and we'll fix it promptly.</li>
    </ul>
    <p class="muted"><i>Disclaimer: SkillPrep is an independent educational site and is not affiliated with, or endorsed by, LinkedIn Corporation, Microsoft or any other vendor. All product names are trademarks of their respective owners.</i></p>
  </div>
  <div>
    <div class="card" style="margin-bottom:22px">
      <h3 class="card-h">Site stats</h3>
      <p><b>${posts.length}</b> study guides and tests</p>
      <p><b>${TOTAL_QS}</b> explained practice questions</p>
      <p><b>${CATS.length}</b> skill categories</p>
    </div>
    <div class="card">
      <h3 class="card-h">Categories</h3>
      ${CATS.map((c) => `<a class="cat-link" href="./../?cat=${encodeURIComponent(c)}#guides">${esc(c)}</a>`).join("\n      ")}
    </div>
  </div>
</div>`;
  return layout({ title: "About SkillPrep | Free Study Guides", desc: "SkillPrep publishes free, concept-first study guides and practice tests for Excel, Python, SQL, JavaScript, Git and more. Learn how we write and review them.", path: "about/", prefix: "../", nav: "about", body });
}

function contactPage() {
  const body = `${pageHero("Contact us", "Request a guide, report a mistake, or just say hello.")}
<div class="container two-col">
  <div class="card">
    <h2 class="card-h">Send a message</h2>
    <form id="contactForm" action="https://formspree.io/f/xqaerlzq" method="POST">
      <div class="form-group"><label for="cName">Your name</label><input id="cName" name="name" required autocomplete="name" placeholder="Jane Doe"></div>
      <div class="form-group"><label for="cEmail">Email</label><input id="cEmail" name="email" type="email" required autocomplete="email" placeholder="you@email.com"></div>
      <div class="form-group"><label for="cTopic">Topic</label>
        <select id="cTopic" name="topic">
          <option>Request a new guide</option>
          <option>Correction / feedback</option>
          <option>Partnership</option>
          <option>Other</option>
        </select></div>
      <div class="form-group"><label for="cMsg">Message</label><textarea id="cMsg" name="message" rows="5" required placeholder="Which topic should we cover next?"></textarea></div>
      <!-- Honeypot -->
      <div style="display:none;"><label for="honeypot">Leave this field empty</label><input type="text" id="honeypot" name="honeypot"></div>
      <button class="btn" type="submit">Send message</button>
      <p class="form-note">Your name, email address and message are sent to us through Formspree, a third-party form service. See the <a href="../privacy/">Privacy Policy</a>.</p>
      <div id="formStatus" class="form-status" role="status" aria-live="polite"></div>
    </form>
  </div>
  <div>
    <div class="callout tip"><b>Guide requests welcome!</b> The most-requested topic each month gets priority.</div>
  </div>
</div>`;
  return layout({ title: "Contact SkillPrep", desc: "Request a study guide, report a correction or get in touch with the SkillPrep team.", path: "contact/", prefix: "../", nav: "contact", body });
}

function privacyPage() {
  const body = `${pageHero("Privacy policy", "Short and plain: what SkillPrep stores, and what third parties may collect.")}
<div class="container narrow">
  <div class="card prose">
    <p class="muted">Last updated ${longDate(cfg.privacyUpdated || cfg.lastReviewed)}</p>
    <h2>What we collect</h2>
    <p>SkillPrep has no accounts and no newsletter sign-up, and we do not run our own analytics. We do show advertising through Google AdSense and use a few third-party services, all described below.</p>
    <h2>What stays on your device</h2>
    <p>Practice tests remember your scores and progress using your browser's local storage so you can see your progress. This data stays on your device, is not sent to us, and you can clear it in your browser settings. The progress export and import buttons work entirely in your browser.</p>
    <h2>Advertising (Google AdSense)</h2>
    <p>SkillPrep shows ads served by Google AdSense. Google and its advertising partners may use cookies and similar technologies, and may collect information such as your IP address, browser details and the pages you visit, to serve and measure ads. Ads may be personalised or non-personalised. We do not receive this data and do not control which ads are shown.</p>
    <p>Visitors in the EEA, the UK and Switzerland: Google requires consent for personalised advertising there, and may show non-personalised ads where consent has not been given.</p>
    <p>You can manage or opt out of personalised advertising at <a href="https://adssettings.google.com" rel="noopener">Google Ads Settings</a> or <a href="https://www.aboutads.info" rel="noopener">aboutads.info</a>. To learn how Google uses information from sites that use its services, see <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">How Google uses information</a>.</p>
    <h2>Contact form</h2>
    <p>When you use the contact form, your name, email address, chosen topic and message are sent to us through Formspree, a third-party form service, which processes them on our behalf (see the <a href="https://formspree.io/legal/privacy-policy/" rel="noopener">Formspree privacy policy</a>). We use this only to reply or to fix the issue you raised.</p>
    <h2>Fonts</h2>
    <p>Pages load the Inter typeface from Google Fonts, so your browser connects to Google's servers and your IP address is shared with Google when a page loads.</p>
    <h2>Hosting</h2>
    <p>The site is hosted on GitHub Pages. As with any web host, GitHub may process technical data such as your IP address when you load a page; see GitHub's own privacy statement for details.</p>
    <h2>External links</h2>
    <p>Guides link to third-party sites such as official documentation. We are not responsible for their content or privacy practices.</p>
    <h2>Changes</h2>
    <p>If we add analytics, new advertising services or sign-ups, we will update this page <i>before</i> collecting any personal data.</p>
    <h2>Questions</h2>
    <p>Use the <a href="../contact/">contact form</a>.</p>
  </div>
</div>`;
  return layout({ title: "Privacy Policy | SkillPrep", desc: "How SkillPrep handles data: no accounts, local-storage progress, Google AdSense advertising, Google Fonts and the Formspree contact form.", path: "privacy/", prefix: "../", nav: "", body });
}

function termsPage() {
  const body = `${pageHero("Terms of use", "The simple ground rules for using SkillPrep.")}
<div class="container narrow">
  <div class="card prose">
    <p class="muted">Last updated ${longDate(cfg.lastReviewed)}</p>
    <h2>Educational use only</h2>
    <p>Guides and practice questions are provided for general learning. We work hard to keep them accurate, but we give no warranty, and software, exams and regulations change. Check official sources before relying on anything here for an important decision.</p>
    <h2>Independent and unofficial</h2>
    <p>SkillPrep is not affiliated with, endorsed by or sponsored by LinkedIn, Microsoft or any other company. Product and company names are trademarks of their owners. Practice tests are unofficial and do not predict any official exam, assessment or certification result.</p>
    <h2>Content</h2>
    <p>You may read, share links to and quote short extracts of our content with attribution. Please don't republish whole guides or practice tests elsewhere without asking.</p>
    <h2>Corrections and takedowns</h2>
    <p>If you believe something on this site is wrong, or infringes your rights, contact us through the <a href="../contact/">contact form</a> and we will review it promptly.</p>
    <h2>Liability</h2>
    <p>To the extent the law allows, SkillPrep is not liable for any loss arising from use of the site.</p>
  </div>
</div>`;
  return layout({ title: "Terms of Use | SkillPrep", desc: "Terms of use for SkillPrep's free educational study guides and practice tests.", path: "terms/", prefix: "../", nav: "", body });
}

function notFoundPage() {
  // 404.html is served by GitHub Pages at any URL depth, so it must use root-based asset paths.
  const body = `<section class="page-hero"><div class="container"><h1>Page not found</h1><p>That page doesn't exist or has moved. Try a search, or pick a guide below.</p></div></section>
<div class="container narrow" style="padding:40px 20px">
  <form class="search-bar light" action="${BASE}" method="get" role="search">
    <label for="nfq" class="visually-hidden">Search guides</label>
    <input id="nfq" type="search" name="q" placeholder="Search guides…">
    <button type="submit">Search</button>
  </form>
  <h2 class="section-title" style="margin-top:34px">Popular guides</h2>
  <ul class="nf-list">
    ${posts.map((p) => `<li><a href="${BASE}${p.url}">${esc(p.title)}</a></li>`).join("\n    ")}
  </ul>
  <p><a class="btn btn-link" href="${BASE}">← Back to the home page</a></p>
</div>`;
  const html = layout({ title: "Page not found | SkillPrep", desc: "The page you were looking for could not be found.", path: "404.html", prefix: "", nav: "", body, robots: "noindex,follow", scripts: false });
  // swap relative asset/links for base-rooted ones
  return html
    .replace('href="assets/favicon.svg"', `href="${BASE}assets/favicon.svg"`)
    .replace('href="css/style.css"', `href="${BASE}css/style.css"`)
    .replace(/<a href="\.\/" class="logo">/, `<a href="${BASE}" class="logo">`)
    .replace(/(<nav class="main-nav"[\s\S]*?<\/nav>)/, (m) => m.replace(/href="\.\/"/, `href="${BASE}"`).replace('href="about/"', `href="${BASE}about/"`).replace('href="contact/"', `href="${BASE}contact/"`))
    .replace(/(<footer[\s\S]*?<\/footer>)/, (m) => m.replace(/href="(?!https?:)([^"]*)"/g, (_, h) => `href="${BASE}${h === "./" ? "" : h}"`))
    + "";
}

/* ---------------- practice projects ---------------- */
const ANSWERS = JSON.parse(fs.readFileSync(path.join(ROOT, "projects", "data", "answers.json"), "utf8"));
const PROJECTS = require("./content/projects")(ANSWERS);
for (const pr of PROJECTS) {
  if (!posts.some((x) => x.slug === pr.guide[0])) throw new Error(`Project ${pr.slug}: guide ${pr.guide[0]} not found`);
}

function projectsHub() {
  const body = `<section class="article-hero"><div class="container">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="../">Home</a> <span aria-hidden="true" class="sep">›</span> <span aria-current="page">Projects</span></nav>
  <div class="cat">Practice projects</div>
  <h1>Practice Projects with Downloadable Data</h1>
  <div class="meta"><span>${PROJECTS.length} projects</span><span>Free to download</span></div>
</div></section>
<div class="container article-wrap">
  <article class="article-body">
    <p class="note"><b>Unofficial study resource.</b> These projects are independent practice material, not official content from any software vendor.</p>
    <p class="lead">Reading about a skill is not the same as using it. Each project gives you a dataset to download, a set of tasks, and an answer key so you can check your work.</p>
    <div class="callout"><b>Synthetic data</b> Every file is generated by a seeded script (<code>tools/make_data.py</code> in the site's repository). It describes no real company, person or sale.</div>
    <table>
      <tr><th>Project</th><th>Tool</th><th>Level</th><th>Files</th></tr>
      ${PROJECTS.map((pr) => `<tr><td><a href="${pr.slug}/">${esc(pr.title.replace(/^Project \d: /, ""))}</a></td><td>${esc(pr.tool)}</td><td>${esc(pr.level)}</td><td>${pr.files.length}</td></tr>`).join("\n      ")}
    </table>
    <h2>How to use these projects</h2>
    <ol>
      <li>Download the data and read the task list.</li>
      <li>Work through the tasks without looking at the answer key.</li>
      <li>Open the answer key and compare. If your numbers differ, recheck your steps before you doubt the data.</li>
    </ol>
    <h2>How the answers were checked</h2>
    <p>Expected values are computed by script from the same files you download, and the test suite recomputes them independently. SQL solutions were run in SQLite. I could not run Excel, Google Sheets or Power BI, so steps in those tools are verified through the numbers they should produce, not by running the tools.</p>
    <ul>${PROJECTS.map((pr) => `<li><a href="${pr.slug}/">${esc(pr.title)}</a>: ${esc(pr.excerpt)}</li>`).join("")}</ul>
  </article>
  <aside class="sidebar">
    <div class="box rel"><h2 class="box-h">Study guides</h2>
      ${PROJECTS.map((pr) => `<a href="../guides/${pr.guide[0]}/">${esc(pr.guide[1])}</a>`).join("\n      ")}
    </div>
  </aside>
</div>`;
  return layout({ title: "Practice Projects with Downloadable Data | SkillPrep", desc: "Free practice projects for Excel or Google Sheets, SQL and Power BI, with synthetic downloadable datasets, tasks and answer keys.", path: "projects/", prefix: "../", nav: "projects", body,
    ld: [{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Projects", item: SITE + "projects/" } ] }] });
}

function projectPage(pr) {
  const prefix = "../../";
  const url = `projects/${pr.slug}/`;
  const body = `<section class="article-hero"><div class="container">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="${prefix}">Home</a> <span aria-hidden="true" class="sep">›</span> <a href="../">Projects</a> <span aria-hidden="true" class="sep">›</span> <span aria-current="page">${esc(pr.title.replace(/^Project \d: /, ""))}</span></nav>
  <div class="cat">${esc(pr.tool)}</div>
  <h1>${esc(pr.title)}</h1>
  <div class="meta"><span>${esc(pr.level)}</span><span>${esc(pr.time)}</span></div>
</div></section>
<div class="container article-wrap">
  <article class="article-body">
    <p class="note"><b>Unofficial study resource.</b> Independent practice material, not affiliated with any software vendor.</p>
    <p class="lead">${pr.intro}</p>
    ${pr.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.body}`).join("\n    ")}
    <hr class="sep">
    <a href="../" class="btn btn-link">← All projects</a>
  </article>
  <aside class="sidebar">
    <div class="box rel"><h2 class="box-h">Download</h2>
      ${pr.files.map((f) => `<a href="../data/${f}" download>${esc(f)}</a>`).join("\n      ")}
    </div>
    <div class="box rel"><h2 class="box-h">Related guide</h2>
      <a href="${prefix}guides/${pr.guide[0]}/">${esc(pr.guide[1])}</a>
    </div>
    <div class="box"><h2 class="box-h">Spotted a mistake?</h2>
      <p class="box-p">We correct errors quickly.</p>
      <a class="btn btn-link" href="${prefix}contact/">Report a correction</a>
    </div>
  </aside>
</div>`;
  const ptitle = pr.seoTitle || pr.title;
  if (`${ptitle} | ${cfg.siteName}`.length > TITLE_MAX) throw new Error(`Project ${pr.slug}: page title too long (max ${TITLE_MAX}); set seoTitle`);
  if (!pr.description || pr.description.length > DESC_MAX || /…/.test(pr.description)) throw new Error(`Project ${pr.slug}: needs a complete description of at most ${DESC_MAX} characters`);
  return layout({ title: `${ptitle} | ${cfg.siteName}`, desc: pr.description, path: url, prefix, nav: "projects", body,
    ld: [{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Projects", item: SITE + "projects/" },
      { "@type": "ListItem", position: 3, name: pr.title, item: SITE + url } ] }] });
}

/* ---------------- write everything ---------------- */
// remove stale generated output so renamed pages don't linger
for (const d of ["guides", "about", "contact", "privacy", "terms"]) fs.rmSync(path.join(ROOT, d), { recursive: true, force: true });
// projects/data holds committed downloads, so only the generated pages are removed
fs.rmSync(path.join(ROOT, "projects", "index.html"), { force: true });
for (const e of fs.existsSync(path.join(ROOT, "projects")) ? fs.readdirSync(path.join(ROOT, "projects")) : []) {
  if (e !== "data") fs.rmSync(path.join(ROOT, "projects", e), { recursive: true, force: true });
}

write("index.html", homePage());
write("guides/index.html", guidesHub());
posts.forEach((p) => write(p.url + "index.html", guidePage(p)));
write("projects/index.html", projectsHub());
PROJECTS.forEach((pr) => write(`projects/${pr.slug}/index.html`, projectPage(pr)));
write("about/index.html", aboutPage());
write("contact/index.html", contactPage());
write("privacy/index.html", privacyPage());
write("terms/index.html", termsPage());
write("404.html", notFoundPage());

// lastmod must be accurate (Google ignores it otherwise): each page uses the date it was really last changed.
const latestGuide = posts.map((p) => p.reviewed).sort().pop();
const pageDate = (key, fallback) => (cfg.pageUpdated || {})[key] || fallback;
const urls = [["", latestGuide], ["guides/", latestGuide], ["about/", pageDate("about/", cfg.lastReviewed)], ["contact/", pageDate("contact/", cfg.lastReviewed)],
  ["privacy/", cfg.privacyUpdated || cfg.lastReviewed], ["terms/", cfg.lastReviewed],
  ["projects/", pageDate("projects/", cfg.lastReviewed)], ...PROJECTS.map((pr) => [`projects/${pr.slug}/`, pageDate("projects/", cfg.lastReviewed)]),
  ...posts.map((p) => [p.url, p.reviewed])];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, d]) => `  <url><loc>${SITE}${u}</loc><lastmod>${d}</lastmod></url>`).join("\n")}
</urlset>
`);
write("ads.txt", "google.com, pub-9455217122501464, DIRECT, f08c47fec0942fa0\n");
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
write(".nojekyll", "");

console.log(`Built ${posts.length} guides + 5 pages + 404 + sitemap (${urls.length} URLs). Practice questions: ${TOTAL_QS}.`);
