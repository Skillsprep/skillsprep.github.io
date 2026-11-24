// Independent check of the practice-project data. Recomputes every expected value from the CSV files in
// integer cents (a different language and method from tools/make_data.py) and compares with answers.json.
// Also checks the built pages. Exit code 1 on any failure.
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.resolve(__dirname, "..");
const D = (f) => path.join(ROOT, "projects", "data", f);
let errors = 0;
const fail = (m) => { console.error("[Error] projects: " + m); errors++; };
const eq = (a, b, m) => { if (a !== b) fail(`${m}: expected ${b}, got ${a}`); };

const csv = (f) => fs.readFileSync(D(f), "utf8").replace(/\r?\n$/, "").split(/\r?\n/).map((l) => l.split(","));
const table = (f) => { const [h, ...r] = csv(f); return r.map((x) => Object.fromEntries(h.map((k, i) => [k, x[i]]))); };
const cents = (s) => { const [i, d = ""] = s.split("."); return parseInt(i, 10) * 100 + parseInt((d + "00").slice(0, 2), 10); };
const pct = (s) => Math.round(parseFloat(s) * 100); // discount as whole percent
const fmt = (c) => (c / 100).toFixed(2);
// revenue in hundredths of a cent: cents * qty * (100 - disc%) ; 1 unit = 1/10000 currency
const revU = (price, qty, disc) => cents(price) * parseInt(qty, 10) * (100 - pct(disc));
const unitsToStr = (u) => { const c = Math.floor((u + 50) / 100); return fmt(c); }; // round half up to cents

const A = JSON.parse(fs.readFileSync(D("answers.json"), "utf8"));
const products = table("products.csv"), customers = table("customers.csv"), orders = table("orders.csv"), dates = table("dim_date.csv"), raw = table("sales_raw.csv");
const price = Object.fromEntries(products.map((p) => [p.ProductID, p.UnitPrice]));
const prodRow = Object.fromEntries(products.map((p) => [p.ProductID, p]));
const custRow = Object.fromEntries(customers.map((c) => [c.CustomerID, c]));

// integrity
eq(orders.length, A.project3.fact_rows, "orders rows");
eq(dates.length, A.project3.date_rows, "date rows");
eq(products.length, 12, "product rows"); eq(customers.length, 80, "customer rows");
if (new Set(orders.map((o) => o.OrderID)).size !== orders.length) fail("duplicate OrderIDs in orders.csv");
for (const o of orders) {
  if (!price[o.ProductID]) fail(`orders ${o.OrderID}: unknown ProductID`);
  if (!custRow[o.CustomerID]) fail(`orders ${o.OrderID}: unknown CustomerID`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(o.OrderDate)) fail(`orders ${o.OrderID}: bad date`);
  if (!(parseInt(o.Quantity, 10) >= 1)) fail(`orders ${o.OrderID}: bad quantity`);
}
// date table: contiguous, unique, covers all order dates
for (let i = 1; i < dates.length; i++) {
  const prev = Date.parse(dates[i - 1].Date + "T00:00:00Z"), cur = Date.parse(dates[i].Date + "T00:00:00Z");
  if (cur - prev !== 86400000) { fail(`dim_date gap or disorder at row ${i + 2}`); break; }
}
const dset = new Set(dates.map((d) => d.Date));
for (const o of orders) if (!dset.has(o.OrderDate)) { fail(`order date ${o.OrderDate} missing from dim_date`); break; }

// project 3 values
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const rev = (o) => revU(price[o.ProductID], o.Quantity, o.Discount);
const y = (yr) => sum(orders.filter((o) => o.OrderDate.startsWith(yr)).map(rev));
eq(unitsToStr(y("2024") + y("2025")), A.project3.total_sales_all, "total sales");
eq(unitsToStr(y("2024")), A.project3.sales_2024, "sales 2024");
eq(unitsToStr(y("2025")), A.project3.sales_2025, "sales 2025");
eq((((y("2025") - y("2024")) / y("2024")) * 100).toFixed(1), A.project3.yoy_percent_2025, "yoy %");
eq(unitsToStr(sum(orders.filter((o) => o.OrderDate.startsWith("2025") && prodRow[o.ProductID].Category === "Electronics").map(rev))), A.project3.sales_electronics_2025, "electronics 2025");
for (const q of [1, 2, 3, 4]) {
  const v = sum(orders.filter((o) => o.OrderDate.startsWith("2025") && Math.ceil(parseInt(o.OrderDate.slice(5, 7), 10) / 3) === q).map(rev));
  eq(unitsToStr(v), A.project3.sales_by_quarter_2025["Q" + q], "2025 Q" + q);
}

// project 1: rebuild the clean set from sales_raw.csv using only the stated cleaning rules
const norm = (r) => { const t = r.trim().toLowerCase(); return t[0].toUpperCase() + t.slice(1); };
eq(raw.length, A.project1.raw_rows, "raw rows");
const seen = new Set(); let dups = 0, junk = 0, messy = 0; const clean = [];
for (const r of raw) {
  if (r.Quantity === "N/A") { junk++; continue; }
  if (norm(r.Region) !== r.Region) messy++;
  if (seen.has(r.OrderID)) { dups++; continue; }
  seen.add(r.OrderID);
  clean.push({ ...r, Region: norm(r.Region) });
}
eq(dups, A.project1.duplicate_rows, "duplicates"); eq(junk, A.project1.junk_rows, "junk rows");
eq(clean.length, A.project1.clean_rows, "clean rows");
// messy region cells are counted over all raw rows that are not junk (duplicates of messy rows are copies of the same row)
if (messy < A.project1.messy_region_cells) fail(`messy region cells: found only ${messy}, answer key says ${A.project1.messy_region_cells}`);
const r1 = (r) => revU(r.UnitPrice, r.Quantity, r.Discount);
eq(unitsToStr(sum(clean.map(r1))), A.project1.total_revenue, "project1 total revenue");
for (const [reg, v] of Object.entries(A.project1.revenue_by_region)) eq(unitsToStr(sum(clean.filter((r) => r.Region === reg).map(r1))), v, "region " + reg);
for (const [cat, v] of Object.entries(A.project1.revenue_by_category)) eq(unitsToStr(sum(clean.filter((r) => r.Category === cat).map(r1))), v, "category " + cat);
for (const [m, v] of Object.entries(A.project1.revenue_by_month)) eq(unitsToStr(sum(clean.filter((r) => r.OrderDate.startsWith(m)).map(r1))), v, "month " + m);
const byProd = {}; clean.forEach((r) => (byProd[r.Product] = (byProd[r.Product] || 0) + r1(r)));
const top = Object.entries(byProd).sort((a, b) => b[1] - a[1])[0];
eq(top[0], A.project1.top_product.name, "top product"); eq(unitsToStr(top[1]), A.project1.top_product.revenue, "top product revenue");
eq(clean.filter((r) => r.Discount !== "0").length, A.project1.discounted_orders, "discounted orders");
// cross-check: cleaned project 1 == the 2025 orders in the fact table
eq(unitsToStr(sum(clean.map(r1))), A.project3.sales_2025, "project 1 total equals 2025 sales from orders.csv");
eq(clean.length, orders.filter((o) => o.OrderDate.startsWith("2025")).length, "clean rows equal 2025 order count");

// SQL: run the exact queries stored in answers.json (the same text shown on the page) against shop.sql
const py = cp.spawnSync("python3", ["-I", path.join(__dirname, "test_projects_sql.py")], { encoding: "utf8" });
process.stdout.write(py.stdout || "");
if (py.status !== 0) { process.stderr.write(py.stderr || ""); fail("SQL check failed"); }

// built pages
const pages = ["projects/index.html", ...fs.readdirSync(path.join(ROOT, "projects")).filter((e) => e !== "data" && e !== "index.html").map((e) => `projects/${e}/index.html`)];
if (pages.length !== 4) fail("expected 4 project pages, found " + pages.length);
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
for (const p of pages) {
  const h = fs.readFileSync(path.join(ROOT, p), "utf8");
  if (!h.includes("ca-pub-9455217122501464")) fail(p + ": AdSense missing");
  if (!/<title>[^<]+<\/title>/.test(h) || !/rel="canonical"/.test(h)) fail(p + ": title or canonical missing");
  if (/hello@skillsprep/i.test(h)) fail(p + ": removed email present");
  for (const m of h.matchAll(/href="(\.\.?\/[^"#]*)"/g)) {
    const target = path.normalize(path.join(path.dirname(path.join(ROOT, p)), m[1]));
    if (!fs.existsSync(target)) fail(`${p}: broken link ${m[1]}`);
  }
}
for (const q of A.project2.queries) {
  const h = fs.readFileSync(path.join(ROOT, "projects/shop-sql-queries/index.html"), "utf8");
  if (!h.includes(esc(q.sql))) fail("page is missing the exact SQL for: " + q.title);
}
const p1 = fs.readFileSync(path.join(ROOT, "projects/sales-cleanup-excel-sheets/index.html"), "utf8");
if (!p1.includes(A.project1.total_revenue.replace(/\B(?=(\d{3})+(?!\d))/g, ","))) fail("project 1 page does not show the total revenue");

if (errors) { console.error(`Project tests failed with ${errors} error(s).`); process.exit(1); }
console.log("Project data, answer keys and pages verified.");
