// SEO guard tests over the BUILT site. Exit code 1 on any failure.
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const cfg = require("./config");
const SITE = cfg.siteUrl.replace(/\/?$/, "/");
let errors = 0;
const fail = (m) => { console.error("[Error] seo: " + m); errors++; };

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if ([".git", "tools", "node_modules", "css", "js", "assets", "data"].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith(".html")) pages.push(p);
  }
})(ROOT);
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, "/");
const urlOf = (f) => { const r = rel(f); return r === "404.html" ? null : SITE + r.replace(/index\.html$/, ""); };
const exists = (url) => url.startsWith(SITE) && pages.some((f) => urlOf(f) === url);
const unesc = (t) => t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const titles = {}, descs = {}, articleDates = {};

for (const f of pages) {
  const r = rel(f), h = fs.readFileSync(f, "utf8");
  const title = unesc((h.match(/<title>([^<]*)<\/title>/) || [])[1] || ""), desc = unesc((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const isGuide = /^guides\/[^/]+\/index\.html$/.test(r);
  if (!title) fail(`${r}: missing <title>`);
  if (isGuide && title.length > 60) fail(`${r}: title is ${title.length} characters (max 60): ${title}`);
  if (title.length > 70) fail(`${r}: title is ${title.length} characters (max 70)`);
  if (desc.length < 50 && r !== "404.html") fail(`${r}: meta description missing or too short (${desc.length})`);
  if (desc.length > 165) fail(`${r}: meta description is ${desc.length} characters (max 165)`);
  if (/…$|\.\.\.$/.test(desc)) fail(`${r}: meta description is cut off with an ellipsis: "${desc.slice(-40)}"`);
  if (!/[.!?)]$/.test(desc) && r !== "404.html") fail(`${r}: meta description does not end like a complete sentence: "${desc.slice(-40)}"`);
  (titles[title] = titles[title] || []).push(r); (descs[desc] = descs[desc] || []).push(r);
  if (r !== "404.html") {
    if (canon !== urlOf(f)) fail(`${r}: canonical ${canon} should be ${urlOf(f)}`);
    if (!h.includes(`property="og:url" content="${urlOf(f)}"`)) fail(`${r}: og:url does not match the canonical URL`);
  }
  const h1 = (h.match(/<h1[ >]/g) || []).length;
  if (h1 !== 1) fail(`${r}: expected exactly one <h1>, found ${h1}`);
  // structured data: valid JSON; breadcrumbs point at real, fragment-free pages
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j; try { j = JSON.parse(m[1]); } catch (e) { fail(`${r}: invalid JSON-LD`); continue; }
    for (const node of Array.isArray(j) ? j : [j]) {
      if (node["@type"] === "Article") articleDates[r] = node.dateModified;
      if (node["@type"] === "BreadcrumbList") {
        const items = node.itemListElement;
        if (items.length < 2) fail(`${r}: BreadcrumbList needs at least 2 items`);
        items.forEach((it, i) => {
          if (it.position !== i + 1) fail(`${r}: breadcrumb positions not sequential`);
          if (it.item.includes("#")) fail(`${r}: breadcrumb "${it.name}" points at a fragment (${it.item}), not a page`);
          else if (!exists(it.item)) fail(`${r}: breadcrumb "${it.name}" points at a page that does not exist (${it.item})`);
        });
      }
    }
  }
  // internal links resolve to built files
  for (const m of h.matchAll(/<a [^>]*href="(\.{1,2}\/[^"#?]*)/g)) {
    let t = path.normalize(path.join(path.dirname(f), m[1]));
    if (m[1].endsWith("/") || fs.existsSync(t) && fs.statSync(t).isDirectory()) t = path.join(t, "index.html");
    if (!fs.existsSync(t)) fail(`${r}: broken internal link ${m[1]}`);
  }
}
for (const [t, v] of Object.entries(titles)) if (v.length > 1) fail(`duplicate title "${t}" on ${v.join(", ")}`);
for (const [d, v] of Object.entries(descs)) if (v.length > 1) fail(`duplicate meta description on ${v.join(", ")}`);

// sitemap: exactly the indexable pages, accurate lastmod, no ignored tags
const sm = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
if (/<priority>|<changefreq>/.test(sm)) fail("sitemap contains <priority> or <changefreq>, which Google ignores");
const entries = [...sm.matchAll(/<url><loc>([^<]*)<\/loc><lastmod>([^<]*)<\/lastmod><\/url>/g)].map((m) => ({ url: m[1], mod: m[2] }));
const want = pages.filter((f) => rel(f) !== "404.html").map(urlOf).sort();
const have = entries.map((e) => e.url).sort();
if (JSON.stringify(want) !== JSON.stringify(have)) fail(`sitemap URLs differ from built pages.\n  missing: ${want.filter((u) => !have.includes(u))}\n  extra: ${have.filter((u) => !want.includes(u))}`);
const today = new Date().toISOString().slice(0, 10);
for (const e of entries) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.mod) || isNaN(Date.parse(e.mod))) fail(`sitemap: bad lastmod for ${e.url}`);
  else if (e.mod > today) fail(`sitemap: lastmod in the future for ${e.url}`);
  const r = e.url.slice(SITE.length) + "index.html";
  if (articleDates[r] && articleDates[r] !== e.mod) fail(`sitemap lastmod ${e.mod} differs from the page's dateModified ${articleDates[r]} for ${e.url}`);
}
const pm = Object.fromEntries(entries.map((e) => [e.url, e.mod]));
if (pm[SITE + "privacy/"] !== (cfg.privacyUpdated || cfg.lastReviewed)) fail("sitemap lastmod for privacy does not match the date shown on the page");
// hub lists every guide
const hub = fs.readFileSync(path.join(ROOT, "guides/index.html"), "utf8");
for (const f of pages) if (/^guides\/[^/]+\/index\.html$/.test(rel(f))) { const slug = rel(f).split("/")[1]; if (!hub.includes(`href="${slug}/"`)) fail(`guides hub does not link to ${slug}`); }

if (errors) { console.error(`SEO tests failed with ${errors} error(s).`); process.exit(1); }
console.log(`SEO checks passed on ${pages.length} pages (titles, descriptions, canonicals, breadcrumbs, links, sitemap).`);
