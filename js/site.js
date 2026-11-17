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

  /* ---------- dark mode toggle ---------- */
  var themeToggle = $("#themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        store("skillprep:theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        store("skillprep:theme", "dark");
      }
    });
  }

  /* ---------- mobile menu ---------- */
  var burger = $("#burger"), nav = $("#mainNav");
  if (burger && nav) {
    var setMenu = function (open) { nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", String(open)); };
    burger.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); burger.focus(); } });
  }

  /* ---------- share button ---------- */
  var shareBtn = $("#shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var url = shareBtn.getAttribute("data-url");
      var title = shareBtn.getAttribute("data-title");
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () {});
      } else {
        navigator.clipboard.writeText(url).then(function () {
          var oldText = shareBtn.textContent;
          shareBtn.textContent = "Copied!";
          setTimeout(function () { shareBtn.textContent = oldText; }, 2000);
        });
      }
    });
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
    var timedOn = false, deadline = 0, tick = null, expired = false, timerEl = null;
    var active = qs, mode = "all", modeLabel = "";   // "all" = full test; otherwise a practice subset (never saved)
    var best = store(key);
    var bmKey = "skillprep:bm:" + box.getAttribute("data-key"), bmSel = null;
    function bmList() { var v = store(bmKey); return v ? v.split(",").filter(Boolean) : []; }
    function bmSave(list) { try { if (list.length) localStorage.setItem(bmKey, list.join(",")); else localStorage.removeItem(bmKey); } catch (e) {} }
    function bmRefreshOption() {
      if (!bmSel) return;
      var o = bmSel.querySelector('option[value="__bm"]'); if (!o) return;
      var n = bmList().length; o.textContent = "Bookmarked questions (" + n + ")"; o.disabled = n === 0;
    }
    qs.forEach(function (q) {
      var b = $(".bm-btn", q); if (!b) return; b.hidden = false;
      var id = q.getAttribute("data-qid");
      function paint() { var on = bmList().indexOf(id) !== -1; b.setAttribute("aria-pressed", on ? "true" : "false"); b.textContent = on ? "★ Bookmarked" : "☆ Bookmark"; }
      paint();
      b.addEventListener("click", function () {
        var l = bmList(), i = l.indexOf(id);
        if (i === -1) l.push(id); else l.splice(i, 1);
        bmSave(l); paint(); bmRefreshOption();
      });
    });
    if (best !== null && best !== "") $(".mock-hint", box).textContent = "Untimed · scored at the end · your best: " + best + "%";

    function answered() { return $$("input:checked", box).length; }
    function updateProgress() {
      if (finished) return;
      var ans = answered();
      countEl.textContent = "Answered " + ans + " / " + active.length;
      var pct = Math.round((ans / active.length) * 100);
      var progPct = $(".progress-pct", box);
      var progFill = $(".progress-fill", box);
      if (progPct) progPct.textContent = pct + "%";
      if (progFill) progFill.style.width = pct + "%";
    }
    box.addEventListener("change", updateProgress);

    function secsFor(n) { return n * 45; }   // 45 s per question, same basis as the "About N min test" label
    function fmt(ms) { var t = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), x = t % 60;
      return (h ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (x < 10 ? "0" : "") + x; }
    function stopTimer() { if (tick) { clearInterval(tick); tick = null; } }
    function timerTick() {
      var left = deadline - Date.now();
      if (timerEl) timerEl.textContent = "Time left: " + fmt(left);
      if (left <= 0 && !finished) { stopTimer(); expired = true; finishBtn.click(); }
    }
    function startTimer() {
      stopTimer(); expired = false;
      if (!timedOn || finished || !timerEl) return;
      deadline = Date.now() + secsFor(active.length) * 1000;
      timerEl.hidden = false; timerTick(); tick = setInterval(timerTick, 500);
    }
    function setHint() {
      var hint = $(".mock-hint", box), t = timedOn ? "Timed · " + Math.ceil(secsFor(active.length) / 60) + " min" : "Untimed";
      if (mode === "all") hint.textContent = t + " · scored at the end" + (best !== null && best !== "" ? " · your best: " + best + "%" : "");
      else hint.textContent = "Practice set: " + modeLabel + " · " + t.toLowerCase() + " · not saved to your best score or progress";
    }

    function reset() {
      stopTimer();
      finished = false;
      qs.forEach(function (q) {
        $$(".opt", q).forEach(function (o) { o.classList.remove("correct", "wrong"); });
        $$("input", q).forEach(function (i) { i.checked = false; i.disabled = false; });
        $(".q-explain", q).classList.remove("show");
      });
      result.innerHTML = ""; countEl.textContent = "Answered 0 / " + active.length;
      finishBtn.disabled = false; finishBtn.textContent = "Finish & score";
      var rb = $(".mock-retake", actions); if (rb) rb.remove();
      var rm0 = $(".mock-retry-missed", actions); if (rm0) rm0.remove();
      if (timerEl && !timedOn) timerEl.hidden = true;
      startTimer();
      box.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function startSet(list, label) {
      active = list; mode = list.length === qs.length ? "all" : "set"; modeLabel = label;
      qs.forEach(function (q) { q.style.display = list.indexOf(q) === -1 ? "none" : ""; });
      $$(".mock-part", box).forEach(function (h) {
        var el = h.nextElementSibling, any = false;
        while (el && !el.classList.contains("mock-part") && !el.classList.contains("mock-tools")) {
          if (el.hasAttribute("data-q") && el.style.display !== "none") any = true;
          el = el.nextElementSibling;
        }
        h.style.display = any ? "" : "none";
      });
      reset();
      setHint();
    }
    // Topic practice: pick one topic to drill without touching saved progress.
    var topics = []; qs.forEach(function (q) { var t = q.getAttribute("data-part"); if (topics.indexOf(t) === -1) topics.push(t); });
    if (topics.length > 1) {
      var tools = document.createElement("div"); tools.className = "mock-tools";
      var lbl = document.createElement("label"); lbl.textContent = "Practise one topic: ";
      var sel = document.createElement("select"); sel.className = "mock-topic";
      var all = document.createElement("option"); all.value = ""; all.textContent = "All topics (full test)"; sel.appendChild(all);
      topics.forEach(function (t) { var o = document.createElement("option"); o.value = t; o.textContent = t; sel.appendChild(o); });
      var bmo = document.createElement("option"); bmo.value = "__bm"; sel.appendChild(bmo); bmSel = sel; bmRefreshOption();
      lbl.appendChild(sel); tools.appendChild(lbl);
      var tl = document.createElement("label"); tl.className = "mock-timed";
      var tcb = document.createElement("input"); tcb.type = "checkbox"; tl.appendChild(tcb);
      tl.appendChild(document.createTextNode(" Timed mode (45 s per question)")); tools.appendChild(tl);
      timerEl = document.createElement("div"); timerEl.className = "mock-timer"; timerEl.setAttribute("role", "timer"); timerEl.hidden = true;
      result.parentNode.insertBefore(tools, result);
      result.parentNode.insertBefore(timerEl, result);
      tcb.addEventListener("change", function () {
        timedOn = tcb.checked; setHint();
        if (!timedOn) { stopTimer(); timerEl.hidden = true; } else startTimer();
      });
      sel.addEventListener("change", function () {
        if (!finished && answered() > 0 && !confirm("Switching topic clears your current answers. Continue?")) { sel.value = mode === "set" ? (modeLabel === "bookmarked questions" ? "__bm" : (topics.indexOf(modeLabel) !== -1 ? modeLabel : "")) : ""; return; }
        if (sel.value === "") startSet(qs, "all");
        else if (sel.value === "__bm") {
          var ids = bmList(), picked = qs.filter(function (q) { return ids.indexOf(q.getAttribute("data-qid")) !== -1; });
          if (!picked.length) { sel.value = ""; return; }
          startSet(picked, "bookmarked questions");
        } else startSet(qs.filter(function (q) { return q.getAttribute("data-part") === sel.value; }), sel.value);
      });
    }

    finishBtn.addEventListener("click", function () {
      if (finished) return;
      finished = true; stopTimer();
      var timeNote = expired ? " · time expired" : "";
      var score = 0, done = 0, parts = {}, order = [], missed = [], total = active.length;
      active.forEach(function (q, n) {
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
          else { picked.closest(".opt").classList.add("wrong"); missed.push({ n: qs.indexOf(q) + 1, id: q.id, el: q, skipped: false }); }
        } else { missed.push({ n: qs.indexOf(q) + 1, id: q.id, el: q, skipped: true }); }
      });
      var pct = Math.round((score / total) * 100);
      var verdict = pct >= 85 ? "Excellent — you're well prepared." : pct >= 70 ? "Pass — solid grounding." : "Below 70% — review the weaker topics below and retake.";
      var tone = pct >= 70 ? "good" : "low";
      var prevBest = store(key);
      var isBest = mode === "all" && (prevBest === null || prevBest === "" || pct > Number(prevBest));
      if (isBest) store(key, String(pct));
      
      // Update global dashboard progress tracking 
      // format: skillprep:progress:pathname = "answeredCount,correctCount,totalCount"
      var path = window.location.pathname.replace(/^\/|\/$/g, "") + "/";
      if (!path || path === "/") path = box.getAttribute("data-key");
      if (mode === "all") localStorage.setItem("skillprep:progress:" + path, done + "," + score + "," + total);
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
        '<div class="sub">Answered ' + done + " of " + total + (mode !== "all" ? " · practice set (" + modeLabel + ") — not saved" : isBest ? " · new personal best" : " · your best: " + prevBest + "%") + timeNote + "</div>" +
        '<table class="breakdown"><thead><tr><th scope="col">Topic</th><th scope="col">Score</th><th scope="col">Result</th></tr></thead><tbody>' + rows + "</tbody></table>" +
        review + "</div>";
      countEl.textContent = "Scored " + score + " / " + total;
      finishBtn.disabled = true; finishBtn.textContent = "Scored ✓";
      var rb = document.createElement("button"); rb.type = "button"; rb.className = "btn mock-retake"; rb.textContent = "Retake";
      rb.addEventListener("click", reset); actions.appendChild(rb);
      if (missed.length) {
        var rm = document.createElement("button"); rm.type = "button"; rm.className = "btn btn-alt mock-retry-missed";
        rm.textContent = "Retry " + missed.length + " missed";
        rm.addEventListener("click", function () { startSet(missed.map(function (m) { return m.el; }), "missed questions"); });
        actions.appendChild(rm);
      }
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
        c.hidden = !ok; 
        if (ok) {
          shown++;
          // Trigger animation reflow
          c.style.animation = 'none';
          c.offsetHeight; /* trigger reflow */
          c.style.animation = null; 
        }
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

  /* contact form: submitted through Formspree (see handler below); the old mailto composer was removed because it also fired and opened "mailto:null" */
})();

  // Formspree AJAX Submission for Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm && contactForm.action.includes("formspree.io")) {
    contactForm.addEventListener("submit", function(ev) {
      ev.preventDefault();
      
      // Honeypot check
      const hp = document.getElementById("honeypot");
      if (hp && hp.value) {
          // Silent rejection for bots
          return;
      }
      
      var data = new FormData(contactForm);
      fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          contactForm.reset();
          let msg = document.createElement("p");
          msg.textContent = "Thanks for your message! We'll get back to you soon.";
          msg.style.color = "green";
          msg.style.fontWeight = "bold";
          contactForm.appendChild(msg);
          setTimeout(() => msg.remove(), 5000);
        } else {
          response.json().then(data => {
            let errorMsg = document.createElement("p");
            if (Object.hasOwn(data, 'errors')) {
              errorMsg.textContent = data["errors"].map(error => error["message"]).join(", ");
            } else {
              errorMsg.textContent = "Oops! There was a problem submitting your form";
            }
            errorMsg.style.color = "red";
            contactForm.appendChild(errorMsg);
            setTimeout(() => errorMsg.remove(), 5000);
          })
        }
      }).catch(error => {
        let errorMsg = document.createElement("p");
        errorMsg.textContent = "Oops! There was a problem submitting your form";
        errorMsg.style.color = "red";
        contactForm.appendChild(errorMsg);
        setTimeout(() => errorMsg.remove(), 5000);
      });
    });
  }

// Progress Export/Import (JSON)
const progressContainer = document.createElement("div");
progressContainer.className = "progress-sync-ui";
progressContainer.style.margin = "1rem 0";
progressContainer.style.display = "flex";
progressContainer.style.gap = "10px";

const exportBtn = document.createElement("button");
exportBtn.className = "btn";
exportBtn.textContent = "Export Progress (JSON)";
exportBtn.onclick = function() {
    let progressData = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("skillprep:")) {
            progressData[key] = localStorage.getItem(key);
        }
    }
    if (Object.keys(progressData).length === 0) {
        alert("No progress to export.");
        return;
    }
    const blob = new Blob([JSON.stringify(progressData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skillprep_progress.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const importLabel = document.createElement("label");
importLabel.className = "btn btn-alt";
importLabel.textContent = "Import Progress (JSON)";
importLabel.style.cursor = "pointer";

const importInput = document.createElement("input");
importInput.type = "file";
importInput.accept = ".json";
importInput.style.display = "none";
importInput.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        var input = e.target;
        function done() { input.value = ""; }
        // Accept only the key formats SkillPrep itself writes, with strictly validated values.
        function validEntry(key, val) {
            if (typeof key !== "string" || typeof val !== "string" || key.length > 200 || val.length > 100) return false;
            if (key === "skillprep:theme") return val === "light" || val === "dark";
            if (key === "skillprep:cookie_consent") return val === "accepted" || val === "declined";
            if (key.indexOf("skillprep:best:") === 0) { var n = Number(val); return val !== "" && isFinite(n) && n >= 0 && n <= 100; }
            if (key.indexOf("skillprep:bm:") === 0) return /^[0-9a-f]{8}(,[0-9a-f]{8}){0,499}$/.test(val);
            if (key.indexOf("skillprep:progress:") === 0) {
                var m = /^(\d{1,5}),(\d{1,5}),(\d{1,5})$/.exec(val);
                return !!m && +m[2] <= +m[1] && +m[1] <= +m[3];
            }
            return false;
        }
        try {
            var data = JSON.parse(evt.target.result);
            if (!data || typeof data !== "object" || Array.isArray(data)) {
                alert("This file is not a SkillPrep progress export. Nothing was imported.");
                return done();
            }
            var valid = [], skipped = 0;
            Object.keys(data).forEach(function (key) {
                if (key.indexOf("skillprep:") !== 0) return;
                if (validEntry(key, data[key])) valid.push(key); else skipped++;
            });
            if (valid.length === 0) {
                alert("No valid SkillPrep progress found in this file. Nothing was imported.");
                return done();
            }
            var conflicts = valid.filter(function (k) {
                var cur = null; try { cur = localStorage.getItem(k); } catch (x) {}
                return cur !== null && cur !== data[k];
            });
            var overwrite = true;
            if (conflicts.length > 0) {
                overwrite = confirm(conflicts.length + " saved item(s) on this device differ from the file.\n\nOK = replace them with the imported values.\nCancel = keep your current progress and import only new items.");
            }
            var imported = 0;
            valid.forEach(function (k) {
                var cur = null; try { cur = localStorage.getItem(k); } catch (x) {}
                if (cur !== null && cur !== data[k] && !overwrite) return;
                try { localStorage.setItem(k, data[k]); imported++; } catch (x) {}
            });
            alert("Imported " + imported + " item(s)." + (skipped ? " Skipped " + skipped + " invalid item(s)." : ""));
            done();
            if (imported > 0) window.location.reload();
        } catch (err) {
            alert("This file could not be read as JSON. Nothing was imported.");
            done();
        }
    };
    reader.readAsText(file);
};
importLabel.appendChild(importInput);

progressContainer.appendChild(exportBtn);
progressContainer.appendChild(importLabel);



// Since cloneNode doesn't clone events, a better way is to instantiate it per element.
document.querySelectorAll(".mock-hint").forEach(hint => {
    const pContainer = document.createElement("div");
    pContainer.className = "progress-sync-ui";
    pContainer.style.margin = "1rem 0";
    pContainer.style.display = "flex";
    pContainer.style.gap = "10px";
    
    const eBtn = document.createElement("button");
    eBtn.className = "btn";
    eBtn.textContent = "Export Progress";
    eBtn.onclick = exportBtn.onclick;
    
    const iLabel = document.createElement("label");
    iLabel.className = "btn btn-alt";
    iLabel.textContent = "Import Progress";
    iLabel.style.cursor = "pointer";
    
    const iInput = document.createElement("input");
    iInput.type = "file";
    iInput.accept = ".json";
    iInput.style.display = "none";
    iInput.onchange = importInput.onchange;
    
    iLabel.appendChild(iInput);
    pContainer.appendChild(eBtn);
    pContainer.appendChild(iLabel);
    
    hint.parentElement.insertBefore(pContainer, hint);
});

// Cookie Consent Logic
(function() {
  var consent = document.getElementById("cookieConsent");
  var btnAccept = document.getElementById("cookieAccept");
  // Informational notice only: it does not control ads. Dismissal is remembered in localStorage.
  if (consent && btnAccept) {
    var seen = null;
    try { seen = localStorage.getItem("skillprep:cookie_consent"); } catch (e) {}
    if (!seen) {
      consent.hidden = false;
    }
    btnAccept.addEventListener("click", function() {
      try { localStorage.setItem("skillprep:cookie_consent", "accepted"); } catch (e) {}
      consent.hidden = true;
    });
  }
})();

(function() {
  const dash = document.getElementById("dashboard");
  if (!dash) return;
  const cards = document.querySelectorAll("#grid .post-card");
  const dashGrid = document.getElementById("dashGrid");
  const dashTotalQs = document.getElementById("dashTotalQs");
  const dashAccuracy = document.getElementById("dashAccuracy");
  const dashCompleted = document.getElementById("dashCompleted");
  const clearDashBtn = document.getElementById("clearDashBtn");

  let totalAttempts = 0;
  let correctAttempts = 0;
  let modulesStarted = 0;
  let hasData = false;

  cards.forEach(card => {
    const link = card.getAttribute("href").replace("./", "").replace("../../", "");
    if (!link) return;
    const progressKey = "skillprep:progress:" + link;
    const stored = localStorage.getItem(progressKey);
    if (stored) {
      hasData = true;
      modulesStarted++;
      const [answeredCount, correctCount, totalCount] = stored.split(",").map(Number);
      totalAttempts += answeredCount;
      correctAttempts += correctCount;

      const cardClone = card.cloneNode(true);
      // update action button text
      const btn = cardClone.querySelector(".btn");
      if (btn) btn.textContent = "Resume Learning";
      dashGrid.appendChild(cardClone);
    }
  });

  if (hasData) {
    dash.style.display = "block";
    dashTotalQs.textContent = totalAttempts;
    dashAccuracy.textContent = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) + "%" : "0%";
    dashCompleted.textContent = modulesStarted;
  }

  if (clearDashBtn) {
    clearDashBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset your learning progress? This cannot be undone.")) {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith("skillprep:progress:")) {
            localStorage.removeItem(key);
          }
        });
        window.location.reload();
      }
    });
  }
})();

