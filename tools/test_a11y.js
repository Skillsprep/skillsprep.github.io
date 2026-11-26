// Accessibility guard tests: colour contrast of the design tokens in BOTH themes, plus structural checks
// on the BUILT pages. Includes negative tests so the guards are proven to fire. Exit 1 on failure.
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
let errors = 0;
const fail = (m) => { console.error("[Error] a11y: " + m); errors++; };

const lum = (hex) => {
  const h = hex.replace("#", ""); const v = (h.length === 3 ? h.replace(/./g, "$&$&") : h).match(/../g).map((x) => parseInt(x, 16) / 255);
  const [r, g, b] = v.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const css = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
function tokens(blockStart) {
  const i = css.indexOf(blockStart); const j = css.indexOf("}", i);
  const out = {}; for (const m of css.slice(i, j).matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,6})/g)) out[m[1]] = m[2];
  return out;
}
const light = tokens(":root {"); const dark = Object.assign({}, light, tokens('[data-theme="dark"] {'));

// [foreground, background, label]; a name is a token, a #hex is literal
const PAIRS = [
  ["btn-fg", "btn-bg", "button text"], ["btn-fg", "btn-hover", "button hover text"],
  ["teal-text", "card", "teal text on card"], ["teal-text", "bg", "teal text on page"],
  ["body", "card", "article body text"], ["ink", "bg", "primary text"], ["muted", "card", "muted text on card"], ["muted", "bg", "muted text on page"],
  ["navy", "card", "headings on card"], ["blue", "bg", "link on page"], ["blue", "card", "link on card"],
  ["#ffffff", "panel", "white on dark panel"], ["#a9c3e3", "panel", "light-blue text on panel"], ["#A0AEC0", "panel", "grey text on panel"],
  ["teal", "panel", "teal on panel"], ["#d7e4f5", "panel", "code text on panel"], ["#4FD1C5", "panel", "bookmark pressed on panel"],
];
const val = (t, k) => (k.startsWith("#") ? k : t[k]);
function check(t, name) {
  const bad = [];
  for (const [f, b, label] of PAIRS) { const r = ratio(val(t, f), val(t, b)); if (!(r >= 4.5)) bad.push(`${name}: ${label} ${val(t, f)} on ${val(t, b)} = ${r.toFixed(2)}:1`); }
  return bad;
}
for (const m of [...check(light, "light"), ...check(dark, "dark")]) fail(m);

// Negative tests: the checker must flag known-bad combinations
if (ratio("#ffffff", "#00A699") >= 4.5) fail("negative test: white on #00A699 should be flagged");
if (ratio("#ffffff", "#E2E8F0") >= 4.5) fail("negative test: white on #E2E8F0 should be flagged");
if (check(Object.assign({}, dark, { panel: "#E2E8F0" }), "neg").length === 0) fail("negative test: light panel in dark theme should be flagged");

// CSS regressions
if (/background:\s*var\(--navy\)/.test(css)) fail("css: background: var(--navy) turns light in dark mode; use var(--panel)");
if (!/prefers-reduced-motion:\s*reduce/.test(css)) fail("css: missing prefers-reduced-motion rule");
if (!/\.article-body pre:focus-visible/.test(css)) fail("css: scrollable code blocks need a focus style");

// Built pages
const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if ([".git", "tools", "node_modules", "css", "js", "assets", "data"].includes(e.name)) continue;
    const p = path.join(d, e.name); e.isDirectory() ? walk(p) : e.name.endsWith(".html") && pages.push(p);
  }
})(ROOT);
const pageIssues = (html) => {
  const o = [];
  if (/<pre(?![^>]*tabindex)/.test(html)) o.push("<pre> without tabindex");
  if (/<th[^>]*>\s*<\/th>/.test(html)) o.push("empty <th>");
  if (/<link[^>]+fonts\.googleapis[^>]+rel="stylesheet"(?![^>]*onload)/.test(html) && !/rel="preload"/.test(html)) o.push("render-blocking font stylesheet");
  if (!/<html[^>]*\blang=/.test(html)) o.push("missing lang");
  return o;
};
for (const f of pages) for (const i of pageIssues(fs.readFileSync(f, "utf8"))) fail(`${path.relative(ROOT, f)}: ${i}`);
// Negative tests for the page checks
if (!pageIssues('<html lang="en"><pre><code>x</code></pre>').includes("<pre> without tabindex")) fail("negative test: pre guard");
if (!pageIssues('<html lang="en"><table><tr><th></th></tr></table>').includes("empty <th>")) fail("negative test: empty th guard");
if (!pageIssues('<html lang="en"><link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet">').includes("render-blocking font stylesheet")) fail("negative test: font guard");

if (errors) { console.error(`Accessibility tests failed with ${errors} error(s).`); process.exit(1); }
console.log(`Accessibility checks passed on ${pages.length} pages (token contrast in light+dark, code/table semantics, font loading, motion).`);
