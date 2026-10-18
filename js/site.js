/* SkillPrep — progressive enhancement for the prerendered pages.
   Everything important (content, links, questions) is already in the HTML; this adds interactivity. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function store(key, val) {
    try { if (val === undefined) return window.localStorage.getItem(key); window.localStorage.setItem(key, val); } catch (e) { /* storage unavailable */ }
    return null;
  }

  /* ---------- mobile menu ---------- */
  var burger = $("#burger"), nav = $("#mainNav");
  if (burger && nav) {
    var setMenu = function (open) { nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", String(open)); };
    burger.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); burger.focus(); } });
  }

  /* ---------- back-to-top + reading progress (single scroll listener) ---------- */
  var backTop = $("#backTop"), bar = $("#progress"), ticking = false;
  function onScroll() {
    ticking = false;
    if (backTop) backTop.classList.toggle("show", window.scrollY > 500);
    if (bar) {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0) + "%";
    }
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (backTop) backTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- table of contents highlighting ---------- */
  var tocLinks = $$("[data-toc]");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (l) { byId[l.getAttribute("data-toc")] = l; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (l) { l.classList.remove("active"); l.removeAttribute("aria-current"); });
        var link = byId[en.target.id];
        if (link) { link.classList.add("active"); link.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-80px 0px -65% 0px" });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) obs.observe(el); });
  }

  /* ---------- inline practice questions ---------- */
  function resetQuiz(quiz) {
    $$(".opt", quiz).forEach(function (o) { o.classList.remove("correct", "wrong"); });
    $$("input", quiz).forEach(function (i) { i.checked = false; i.disabled = false; });
    $(".q-explain", quiz).classList.remove("show");
    $(".q-result", quiz).textContent = "";
    var b = $(".check-btn", quiz); b.textContent = "Check answer"; quiz.removeAttribute("data-checked");
  }
  $$("[data-quiz]").forEach(function (quiz) {
    var btn = $(".check-btn", quiz), out = $(".q-result", quiz);
    btn.addEventListener("click", function () {
      if (quiz.getAttribute("data-checked")) { resetQuiz(quiz); return; }
      var picked = $("input:checked", quiz);
      if (!picked) { out.textContent = "Pick an answer first."; return; }
      var label = picked.closest(".opt"), ok = label.hasAttribute("data-correct");
      $$(".opt", quiz).forEach(function (o) { if (o.hasAttribute("data-correct")) o.classList.add("correct"); });
      if (!ok) label.classList.add("wrong");
      $$("input", quiz).forEach(function (i) { i.disabled = true; });
      $(".q-explain", quiz).classList.add("show");
      out.textContent = ok ? "✓ Correct!" : "✗ Not quite — read the explanation below.";
      btn.textContent = "Try again";
      quiz.setAttribute("data-checked", "1");
    });
  });

  /* ---------- full practice tests ---------- */
  $$("[data-mock]").forEach(function (box) {
    var total = Number(box.getAttribute("data-total")), key = "skillprep:best:" + box.getAttribute("data-key");
    var qs = $$("[data-q]", box), countEl = $(".mock-count", box), result = $(".mock-result", box);
    var finishBtn = $(".mock-finish", box), actions = $(".mock-actions", box), finished = false;
    var best = store(key);
    if (best !== null && best !== "") $(".mock-hint", box).textContent = "Untimed · scored at the end · your best: " + best + "%";

    function answered() { return $$("input:checked", box).length; }
    box.addEventListener("change", function () { if (!finished) countEl.textContent = "Answered " + answered() + " / " + total; });

    function reset() {
      finished = false;
      qs.forEach(function (q) {
        $$(".opt", q).forEach(function (o) { o.classList.remove("correct", "wrong"); });
        $$("input", q).forEach(function (i) { i.checked = false; i.disabled = false; });
        $(".q-explain", q).classList.remove("show");
      });
      result.innerHTML = ""; countEl.textContent = "Answered 0 / " + total;
      finishBtn.disabled = false; finishBtn.textContent = "Finish & score";
      var rb = $(".mock-retake", actions); if (rb) rb.remove();
      box.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    finishBtn.addEventListener("click", function () {
      if (finished) return;
      finished = true;
      var score = 0, done = 0, parts = {}, order = [], missed = [];
      qs.forEach(function (q, n) {
        var ans = Number(q.getAttribute("data-answer")), part = q.getAttribute("data-part");
        if (!parts[part]) { parts[part] = { ok: 0, n: 0 }; order.push(part); }
        parts[part].n++;
        var picked = $("input:checked", q);
        $$(".opt", q).forEach(function (o, j) { if (j === ans) o.classList.add("correct"); });
        $$("input", q).forEach(function (i) { i.disabled = true; });
        $(".q-explain", q).classList.add("show");
        if (picked) {
          done++;
          if (Number(picked.value) === ans) { score++; parts[part].ok++; }
          else { picked.closest(".opt").classList.add("wrong"); missed.push({ n: n + 1, id: q.id, skipped: false }); }
        } else { missed.push({ n: n + 1, id: q.id, skipped: true }); }
      });
      var pct = Math.round((score / total) * 100);
      var verdict = pct >= 85 ? "Excellent — you're well prepared." : pct >= 70 ? "Pass — solid grounding." : "Below 70% — review the weaker topics below and retake.";
      var tone = pct >= 70 ? "good" : "low";
      var prevBest = store(key);
      var isBest = prevBest === null || prevBest === "" || pct > Number(prevBest);
      if (isBest) store(key, String(pct));
      var rows = order.map(function (p) {
        var s = parts[p], pp = Math.round((s.ok / s.n) * 100);
        return '<tr><th scope="row">' + esc(p) + "</th><td>" + s.ok + " / " + s.n + '</td><td><span class="pbar"><i style="width:' + pp + '%" class="' + (pp >= 70 ? "ok" : "weak") + '"></i></span> ' + pp + "%" + (pp < 70 ? ' <b class="flag">revisit</b>' : "") + "</td></tr>";
      }).join("");
      var review = missed.length
        ? '<p class="review"><b>Review:</b> ' + missed.map(function (m) { return '<a href="#' + m.id + '">Q' + m.n + (m.skipped ? " (skipped)" : "") + "</a>"; }).join(" · ") + "</p>"
        : '<p class="review"><b>Perfect score!</b></p>';
      result.innerHTML =
        '<div class="score ' + tone + '"><div class="big">' + score + " / " + total + " (" + pct + "%)</div>" +
        '<div class="verdict">' + verdict + "</div>" +
        '<div class="sub">Answered ' + done + " of " + total + (isBest ? " · new personal best" : " · your best: " + prevBest + "%") + "</div>" +
        '<table class="breakdown"><thead><tr><th scope="col">Topic</th><th scope="col">Score</th><th scope="col">Result</th></tr></thead><tbody>' + rows + "</tbody></table>" +
        review + "</div>";
      countEl.textContent = "Scored " + score + " / " + total;
      finishBtn.disabled = true; finishBtn.textContent = "Scored ✓";
      var rb = document.createElement("button"); rb.type = "button"; rb.className = "btn mock-retake"; rb.textContent = "Retake";
      rb.addEventListener("click", reset); actions.appendChild(rb);
      result.focus({ preventScroll: true });
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ---------- home page: search + category filter ---------- */
  var grid = $("#grid");
  if (grid) {
    var cards = $$(".post-card", grid), chips = $$(".chip"), input = $("#searchInput"), form = $("#searchForm");
    var title = $("#gridTitle"), sub = $("#gridSub"), empty = $("#emptyState");
    var params = new URLSearchParams(window.location.search);
    var state = { cat: params.get("cat") || "All", q: (params.get("q") || "").trim() };
    if (!chips.some(function (c) { return c.getAttribute("data-cat") === state.cat; })) state.cat = "All";
    input.value = state.q;
    var apply = function (updateUrl) {
      var q = state.q.toLowerCase(), shown = 0;
      cards.forEach(function (c) {
        var ok = (state.cat === "All" || c.getAttribute("data-cat") === state.cat) && (!q || c.getAttribute("data-search").indexOf(q) !== -1);
        c.hidden = !ok; if (ok) shown++;
      });
      chips.forEach(function (c) { var on = c.getAttribute("data-cat") === state.cat; c.classList.toggle("active", on); c.setAttribute("aria-pressed", String(on)); });
      title.textContent = state.cat === "All" ? "All guides" : state.cat + " guides";
      sub.textContent = q ? "Results for “" + state.q + "” — " + shown + (shown === 1 ? " guide" : " guides") : "Hand-written study notes with interactive practice quizzes.";
      empty.hidden = shown !== 0;
      if (updateUrl) {
        var p = new URLSearchParams();
        if (state.q) p.set("q", state.q);
        if (state.cat !== "All") p.set("cat", state.cat);
        try { window.history.replaceState(null, "", window.location.pathname + (p.toString() ? "?" + p.toString() : "") + window.location.hash); } catch (e) { /* ignore */ }
      }
    };
    chips.forEach(function (c) { c.addEventListener("click", function () { state.cat = c.getAttribute("data-cat"); apply(true); }); });
    input.addEventListener("input", function () { state.q = input.value.trim(); apply(true); });
    form.addEventListener("submit", function (e) { e.preventDefault(); state.q = input.value.trim(); apply(true); $("#guides").scrollIntoView({ behavior: "smooth" }); });
    apply(false);
    if (state.q || state.cat !== "All") { var g = $("#guides"); if (g && !window.location.hash) setTimeout(function () { g.scrollIntoView(); }, 0); }
  }

  /* ---------- contact form: honest mailto composer ---------- */
  var cf = $("#contactForm");
  if (cf) {
    cf.addEventListener("submit", function (e) {
      e.preventDefault();
      var addr = cf.getAttribute("data-email");
      var f = function (id) { return $(id, cf).value.trim(); };
      var subject = "[SkillPrep] " + f("#cTopic");
      var body = "Name: " + f("#cName") + "\nEmail: " + f("#cEmail") + "\n\n" + f("#cMsg");
      var url = "mailto:" + addr + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var status = $("#formStatus");
      status.textContent = "";
      var msg = document.createElement("span");
      msg.textContent = "Your email app should now open with the message ready. Nothing has been sent yet — press Send there. If nothing opened, email us directly at ";
      var a = document.createElement("a"); a.href = "mailto:" + addr; a.textContent = addr;
      status.appendChild(msg); status.appendChild(a); status.appendChild(document.createTextNode("."));
      window.location.href = url;
    });
  }
})();
