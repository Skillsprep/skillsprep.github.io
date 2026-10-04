/* ===== SkillPrep Blog — hash-routed SPA ===== */
(function () {
  const app = document.getElementById("app");
  const CATS = ["All", ...new Set(POSTS.map(p => p.category))];

  /* ---------- helpers ---------- */
  const esc = s => s.replace(/"/g, "&quot;");
  const bySlug = slug => POSTS.find(p => p.slug === slug);
  function gradientFor(cat) {
    const map = {
      "Excel": "linear-gradient(135deg,#1D6F42,#31a05f)",
      "Python": "linear-gradient(135deg,#2b6cb0,#3182ce)",
      "JavaScript": "linear-gradient(135deg,#b7791f,#ecc94b)",
      "Project Management": "linear-gradient(135deg,#6b46c1,#9f7aea)",
      "SQL": "linear-gradient(135deg,#2c5282,#4299e1)",
      "Marketing": "linear-gradient(135deg,#c53030,#f56565)",
      "Git": "linear-gradient(135deg,#c05621,#ed8936)",
      "PowerPoint": "linear-gradient(135deg,#b03a2e,#e07b39)",
      "Getting Started": "linear-gradient(135deg,#0A66C2,#4a90d9)"
    };
    return map[cat] || map["Getting Started"];
  }
  function cardHTML(p) {
    return `
      <a class="post-card" href="#/post/${p.slug}">
        <div class="thumb" style="background:${p.gradient}">${p.icon}</div>
        <div class="body">
          <div class="cat">${p.category}</div>
          <h3>${esc(p.title)}</h3>
          <p class="excerpt">${p.excerpt}</p>
          <div class="meta"><span>${p.date} · ${p.readTime}</span><span class="read">Read →</span></div>
        </div>
      </a>`;
  }

  /* ---------- views ---------- */
  let activeCat = "All";
  let query = "";

  function renderHome() {
    const filtered = POSTS.filter(p => {
      const catOK = activeCat === "All" || p.category === activeCat;
      const q = query.toLowerCase();
      const qOK = !q || (p.title + " " + p.excerpt + " " + p.category).toLowerCase().includes(q);
      return catOK && qOK;
    });

    app.innerHTML = `
      <section class="hero">
        <div class="container">
          <h1>Pass your <span>LinkedIn Skill Assessments</span> with confidence</h1>
          <p>Study guides, practice questions with explanations, and proven strategies for LinkedIn Learning skill assessments — Excel, Python, SQL, Marketing and more.</p>
          <form class="search-bar" id="searchForm">
            <input type="text" id="searchInput" placeholder="Search guides… e.g. pivot tables, JOINs, closures" value="${esc(query)}">
            <button type="submit">Search</button>
          </form>
          <div class="stats">
            <div class="stat"><b>${POSTS.length}</b><small>Study guides</small></div>
            <div class="stat"><b>${CATS.length - 1}</b><small>Skill categories</small></div>
            <div class="stat"><b>20+</b><small>Practice questions</small></div>
            <div class="stat"><b>100%</b><small>Free forever</small></div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2 class="section-title">Browse by category</h2>
          <p class="section-sub">Pick a skill area to filter the guides.</p>
          <div class="chip-row" id="chips">
            ${CATS.map(c => `<button class="chip ${c === activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`).join("")}
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="container">
          <h2 class="section-title">${activeCat === "All" ? "Latest guides" : activeCat + " guides"}</h2>
          <p class="section-sub">${query ? `Results for “${esc(query)}” — ${filtered.length} guide(s)` : "Hand-written study notes with interactive practice quizzes."}</p>
          <div class="post-grid" id="grid">
            ${filtered.length ? filtered.map(cardHTML).join("") :
              `<div class="empty-state" style="grid-column:1/-1">
                 <div class="big">🔍</div>
                 <h3>No guides found</h3>
                 <p>Try a different keyword or category.</p>
               </div>`}
          </div>
        </div>
      </section>`;

    document.getElementById("chips").addEventListener("click", e => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      activeCat = btn.dataset.cat;
      renderHome();
      window.scrollTo({ top: 0 });
    });
    document.getElementById("searchForm").addEventListener("submit", e => {
      e.preventDefault();
      query = document.getElementById("searchInput").value.trim();
      renderHome();
      document.querySelector(".section:last-of-type").scrollIntoView({ behavior: "smooth" });
    });
  }

  function renderPost(slug) {
    const p = bySlug(slug);
    if (!p) { location.hash = "#/"; return; }
    const related = POSTS.filter(x => x.category === p.category && x.slug !== slug).slice(0, 3);
    const relatedAny = (related.length ? related : POSTS.filter(x => x.slug !== slug)).slice(0, 3);

    app.innerHTML = `
      <div id="progress"></div>
      <section class="article-hero">
        <div class="container">
          <div class="cat">${p.category}</div>
          <h1>${esc(p.title)}</h1>
          <div class="meta"><span>📅 ${p.date}</span><span>⏱ ${p.readTime}</span><span>✍️ SkillPrep Team</span></div>
        </div>
      </section>
      <div class="container article-wrap">
        <article class="article-body">
          <p style="font-size:1.06rem">${p.intro}</p>
          ${p.sections.map((s, i) => `<h2 id="sec-${i}">${esc(s.h)}</h2>${s.body}`).join("")}
          <hr style="border:none;border-top:1px solid var(--line);margin:34px 0">
          <a href="#/" class="btn" style="display:inline-block;text-decoration:none">← Back to all guides</a>
        </article>
        <aside class="sidebar">
          <div class="box">
            <h4>On this page</h4>
            <div class="toc">
              ${p.sections.map((s, i) => `<a href="#sec-${i}" data-toc="${i}">${esc(s.h)}</a>`).join("")}
            </div>
          </div>
          <div class="box rel">
            <h4>Related guides</h4>
            ${relatedAny.map(r => `<a href="#/post/${r.slug}">${esc(r.title)}</a>`).join("")}
          </div>
          <div class="box">
            <h4>📬 New guides weekly</h4>
            <p style="font-size:.88rem;color:var(--muted);margin-bottom:12px">Get notified when we publish a new assessment study guide.</p>
            <form id="sideSubscribe" style="display:flex;flex-direction:column;gap:8px">
              <input type="email" required placeholder="you@email.com" style="padding:10px 12px;border:1.5px solid var(--line);border-radius:9px">
              <button class="btn" type="submit">Subscribe</button>
            </form>
          </div>
        </aside>
      </div>`;

    initQuizzes();
    initReadingProgress();
    initTOC();
    initMockTest();

    document.getElementById("sideSubscribe").addEventListener("submit", e => {
      e.preventDefault();
      e.target.innerHTML = `<p style="color:var(--green);font-weight:600">✓ You're subscribed!</p>`;
    });
  }

  function renderAbout() {
    app.innerHTML = `
      <section class="page-hero"><div class="container">
        <h1>About SkillPrep</h1>
        <p>We write honest, concept-first study guides for LinkedIn Skill Assessments — because understanding beats memorizing.</p>
      </div></section>
      <div class="container two-col">
        <div class="card">
          <h2 style="color:var(--navy);margin-bottom:12px">Why we exist</h2>
          <p style="margin:10px 0">LinkedIn Skill Assessments are a fast, free way to verify your skills and stand out to recruiters. But preparation material online is either thin marketing content or sketchy answer dumps that change every few months — and can get your badge revoked.</p>
          <p style="margin:10px 0">SkillPrep takes a different approach: <b>teach the actual concepts</b> behind the questions. Every guide on this site explains the "why" — with interactive practice quizzes that check your reasoning, not just your memory.</p>
          <h3 style="color:var(--navy);margin:20px 0 8px">What we cover</h3>
          <ul style="margin-left:20px">
            <li>Topic breakdowns ranked by how often they appear in assessments</li>
            <li>Interactive practice questions with detailed explanations</li>
            <li>Exam strategy, retake rules, and profile-visibility tips</li>
            <li>New guides published every week</li>
          </ul>
          <p style="margin:10px 0;color:var(--muted);font-size:.9rem"><i>Disclaimer: SkillPrep is an independent educational blog and is not affiliated with, or endorsed by, LinkedIn Corporation. "LinkedIn" is a trademark of LinkedIn Corporation.</i></p>
        </div>
        <div>
          <div class="card" style="margin-bottom:22px">
            <h3 style="color:var(--navy);margin-bottom:12px">Site stats</h3>
            <p>📚 <b>${POSTS.length}</b> study guides</p>
            <p>🧩 <b>20+</b> explained practice questions</p>
            <p>🏷 <b>${CATS.length - 1}</b> skill categories</p>
          </div>
          <div class="card">
            <h3 style="color:var(--navy);margin-bottom:12px">Categories</h3>
            ${CATS.filter(c => c !== "All").map(c => `<a href="#/" style="display:block;padding:5px 0;font-weight:600">${c}</a>`).join("")}
          </div>
        </div>
      </div>`;
  }

  function renderContact() {
    app.innerHTML = `
      <section class="page-hero"><div class="container">
        <h1>Contact us</h1>
        <p>Request a guide for a specific assessment, report an issue, or just say hello.</p>
      </div></section>
      <div class="container two-col">
        <div class="card">
          <h2 style="color:var(--navy);margin-bottom:16px">Send a message</h2>
          <form id="contactForm">
            <div class="form-group"><label>Your name</label><input required placeholder="Jane Doe"></div>
            <div class="form-group"><label>Email</label><input type="email" required placeholder="you@email.com"></div>
            <div class="form-group"><label>Topic</label>
              <select>
                <option>Request a new guide</option>
                <option>Correction / feedback</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-group"><label>Message</label><textarea rows="5" required placeholder="Which assessment should we cover next?"></textarea></div>
            <button class="btn" type="submit">Send message</button>
          </form>
        </div>
        <div>
          <div class="card" style="margin-bottom:22px">
            <h3 style="color:var(--navy);margin-bottom:10px">📮 Email</h3>
            <p>hello@skillprep.blog</p>
          </div>
          <div class="card" style="margin-bottom:22px">
            <h3 style="color:var(--navy);margin-bottom:10px">⏱ Response time</h3>
            <p>We usually reply within 2 business days.</p>
          </div>
          <div class="callout tip"><b>Guide requests welcome!</b> The most-requested assessment each month gets a full study guide.</div>
        </div>
      </div>`;
    document.getElementById("contactForm").addEventListener("submit", e => {
      e.preventDefault();
      e.target.innerHTML = `<div style="text-align:center;padding:30px 10px">
        <div style="font-size:2.6rem;margin-bottom:10px">✅</div>
        <h3 style="color:var(--navy)">Message sent!</h3>
        <p style="color:var(--muted)">Thanks for reaching out — we'll get back to you soon.</p></div>`;
    });
  }

  /* ---------- interactive features ---------- */
  function initQuizzes() {
    document.querySelectorAll("[data-quiz]").forEach(quiz => {
      const btn = quiz.querySelector(".check-btn");
      btn.addEventListener("click", () => {
        const opts = [...quiz.querySelectorAll(".opt")];
        const picked = quiz.querySelector(".opt input:checked");
        quiz.querySelector(".q-explain").classList.add("show");
        opts.forEach(o => {
          o.classList.remove("correct", "wrong");
          if (o.hasAttribute("data-correct")) o.classList.add("correct");
        });
        if (picked) {
          const label = picked.closest(".opt");
          if (!label.hasAttribute("data-correct")) label.classList.add("wrong");
          btn.textContent = label.hasAttribute("data-correct") ? "✓ Correct!" : "✗ Not quite — read the explanation";
        } else {
          btn.textContent = "Pick an answer first";
        }
        btn.disabled = true;
        setTimeout(() => { btn.disabled = false; }, 1500);
      });
    });
  }

  function initReadingProgress() {
    const bar = document.getElementById("progress");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initTOC() {
    const links = [...document.querySelectorAll("[data-toc]")];
    if (!links.length) return;
    const secs = links.map(l => document.getElementById("sec-" + l.dataset.toc));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.toggle("active", l.dataset.toc === en.target.id.split("-")[1]));
        }
      });
    }, { rootMargin: "-80px 0px -60% 0px" });
    secs.forEach(s => s && obs.observe(s));
  }

  /* ---------- full mock tests (any post with a [data-bank] container) ---------- */
  function initMockTest() {
    document.querySelectorAll("[data-bank]").forEach(box => {
      const bank = window[box.dataset.bank];
      if (!bank || !bank.length) return;
      const total = bank.length;
      let finished = false;

      box.innerHTML = `
        <div class="mockbar" style="position:sticky;top:64px;z-index:50;background:var(--navy);color:#fff;border-radius:12px;padding:12px 18px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;box-shadow:0 4px 14px rgba(0,0,0,.18);margin-bottom:22px">
          <span class="mockCount" style="font-weight:600">Answered 0 / ${total}</span>
          <span style="font-size:.85rem;opacity:.85">No time limit · Score at the end</span>
          <button class="btn mockFinish" style="background:#fff;color:var(--navy)">Finish &amp; score</button>
        </div>
        <div class="mockResult"></div>
        ${bank.map((it, i) => `
          <div class="quiz" data-mock="${i}">
            <div class="q-head"><span>Question ${i + 1} of ${total}</span><span>${it.p}</span></div>
            <div class="q-body">
              <p class="q-text">${it.q}</p>
              ${it.o.map((o, j) => `<label class="opt"><input type="radio" name="${box.dataset.bank}-${i}" value="${j}"> ${o}</label>`).join("")}
            </div>
            <div class="q-explain"><b>Answer: ${"ABCD"[it.a]} —</b> ${it.o[it.a]}<br><span style="color:var(--muted);font-size:.92em">${it.w || ""}</span></div>
          </div>`).join("")}`;

      const countEl = box.querySelector(".mockCount");
      const updateCount = () => {
        const n = box.querySelectorAll("input[type=radio]:checked").length;
        countEl.textContent = `Answered ${n} / ${total}`;
      };
      box.addEventListener("change", updateCount);

      box.querySelector(".mockFinish").addEventListener("click", () => {
        if (finished) return;
        finished = true;
        let score = 0, answered = 0;
        box.querySelectorAll("[data-mock]").forEach((quiz, i) => {
          const it = bank[i];
          const picked = quiz.querySelector("input[type=radio]:checked");
          quiz.querySelector(".q-explain").classList.add("show");
          quiz.querySelectorAll(".opt").forEach((o, j) => {
            if (j === it.a) o.classList.add("correct");
          });
          if (picked) {
            answered++;
            const j = Number(picked.value);
            if (j === it.a) { score++; }
            else picked.closest(".opt").classList.add("wrong");
          }
        });
        const pct = Math.round(score / total * 100);
        const verdict = pct >= 70 ? (pct >= 85 ? "Excellent — you're exam-ready!" : "Pass — solid preparation.") : "Below 70% — revisit the weak parts and retake.";
        const color = pct >= 70 ? "var(--green)" : "#c53030";
        box.querySelector(".mockResult").innerHTML = `
          <div style="background:#fff;border:2px solid ${color};border-radius:14px;padding:22px 26px;margin-bottom:24px;text-align:center">
            <div style="font-size:2.4rem;font-weight:800;color:${color}">${score} / ${total} (${pct}%)</div>
            <div style="font-weight:600;color:var(--navy);margin-top:6px">${verdict}</div>
            <div style="color:var(--muted);font-size:.9rem;margin-top:4px">Answered ${answered} of ${total} · Correct answers highlighted below</div>
          </div>`;
        const btn = box.querySelector(".mockFinish");
        btn.disabled = true;
        btn.textContent = "Scored ✓";
        window.scrollTo({ top: box.offsetTop - 80, behavior: "smooth" });
      });
    });
  }

  /* ---------- router ---------- */
  function route() {
    const hash = location.hash || "#/";
    const navLinks = document.querySelectorAll("nav.main-nav a");
    navLinks.forEach(a => a.classList.remove("active"));
    if (hash.startsWith("#/post/")) {
      renderPost(hash.split("/")[2]);
    } else if (hash.startsWith("#/about")) {
      document.querySelector('a[data-nav="about"]').classList.add("active");
      renderAbout();
    } else if (hash.startsWith("#/contact")) {
      document.querySelector('a[data-nav="contact"]').classList.add("active");
      renderContact();
    } else {
      document.querySelector('a[data-nav="home"]').classList.add("active");
      renderHome();
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  document.getElementById("burger").addEventListener("click", () => {
    document.getElementById("mainNav").classList.toggle("open");
  });
  document.getElementById("mainNav").addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("open");
  });

  // back-to-top button
  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  route();
})();
