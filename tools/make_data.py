#!/usr/bin/env python3
"""Generate the synthetic practice-project datasets and their answer key.

Run from the repository root:  python3 tools/make_data.py
Outputs go to projects/data/. The data is entirely synthetic (seeded random numbers, generic product
names, customer IDs only): it describes no real company, person or sale. Every expected answer in
answers.json is computed here from the generated rows, never typed by hand.
"""
import csv
import json
import os
import random
import sqlite3
from datetime import date, timedelta
from decimal import Decimal, ROUND_HALF_UP

SEED = 20261122
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "projects", "data")
os.makedirs(OUT, exist_ok=True)
rng = random.Random(SEED)

PRODUCTS = [
    ("P01", "Notebook A5", "Stationery", "4.50"),
    ("P02", "Gel Pen Set", "Stationery", "6.20"),
    ("P03", "Desk Organiser", "Office", "18.90"),
    ("P04", "Ergonomic Mouse", "Electronics", "24.00"),
    ("P05", "USB-C Cable", "Electronics", "9.75"),
    ("P06", "Wireless Keyboard", "Electronics", "39.90"),
    ("P07", "Desk Lamp", "Office", "27.50"),
    ("P08", "Whiteboard Marker Pack", "Stationery", "7.80"),
    ("P09", "Laptop Stand", "Office", "34.00"),
    ("P10", "HD Webcam", "Electronics", "49.00"),
    ("P11", "Sticky Notes Bundle", "Stationery", "5.40"),
    ("P12", "Filing Box", "Office", "12.60"),
]
PROD_WEIGHTS = [10, 9, 6, 8, 12, 5, 5, 8, 4, 3, 10, 6]
REGIONS = ["North", "South", "East", "West"]
SEGMENTS = ["Consumer", "Corporate", "Small Business"]
DISCOUNTS = ["0", "0", "0", "0", "0.05", "0.10", "0.15"]

# customers: 80 IDs, 5 of them never order (used by the LEFT JOIN exercise)
CUSTOMERS = [("C%03d" % i, rng.choice(REGIONS), rng.choice(SEGMENTS)) for i in range(1, 81)]
NO_ORDER = set(rng.sample([c[0] for c in CUSTOMERS], 5))
ACTIVE = [c for c in CUSTOMERS if c[0] not in NO_ORDER]
CUST = {c[0]: c for c in CUSTOMERS}
PROD = {p[0]: p for p in PRODUCTS}

# orders: 1000 across 2024-2025, with a little growth in 2025
start, end = date(2024, 1, 1), date(2025, 12, 31)
days = (end - start).days + 1
day_weights = [1.0 if (start + timedelta(d)).year == 2024 else 1.25 for d in range(days)]
order_dates = sorted(start + timedelta(d) for d in rng.choices(range(days), weights=day_weights, k=1000))
ORDERS = []
for i, d in enumerate(order_dates, 1):
    cust = rng.choice(ACTIVE)[0]
    prod = rng.choices(PRODUCTS, weights=PROD_WEIGHTS)[0][0]
    qty = rng.choices(range(1, 11), weights=[18, 16, 14, 12, 10, 8, 7, 6, 5, 4])[0]
    ORDERS.append(("O%04d" % i, d.isoformat(), cust, prod, qty, rng.choice(DISCOUNTS)))


def revenue(o):
    return Decimal(PROD[o[3]][3]) * o[4] * (Decimal(1) - Decimal(o[5]))


def q2(x):
    return x.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def write_csv(name, header, rows):
    with open(os.path.join(OUT, name), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(header)
        w.writerows(rows)


write_csv("products.csv", ["ProductID", "Product", "Category", "UnitPrice"], PRODUCTS)
write_csv("customers.csv", ["CustomerID", "Region", "Segment"], CUSTOMERS)
write_csv("orders.csv", ["OrderID", "OrderDate", "CustomerID", "ProductID", "Quantity", "Discount"], ORDERS)

# date table for the Power BI project (every day, no gaps)
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
dim_date = []
for d in range(days):
    x = start + timedelta(d)
    dim_date.append((x.isoformat(), x.year, "Q%d" % ((x.month - 1) // 3 + 1), x.month, MONTHS[x.month - 1], x.strftime("%A")))
write_csv("dim_date.csv", ["Date", "Year", "Quarter", "MonthNumber", "Month", "Weekday"], dim_date)

# ---- Project 1: one flat, deliberately messy file for 2025 (the SQL/Power BI data, flattened) ----
orders_2025 = [o for o in ORDERS if o[1].startswith("2025")]
flat = []
for o in orders_2025:
    flat.append([o[0], o[1], CUST[o[2]][1], PROD[o[3]][1], PROD[o[3]][2], str(o[4]), PROD[o[3]][3], o[5]])
n_clean = len(flat)
messy_idx = rng.sample(range(n_clean), 20)
for k, i in enumerate(messy_idx):
    r = flat[i][2]
    flat[i][2] = [" " + r.lower(), r.upper() + " ", r.lower(), "  " + r + "  "][k % 4]
dups = [list(flat[i]) for i in rng.sample(range(n_clean), 10)]
junk = []
for k in range(6):
    base = list(flat[rng.randrange(n_clean)])
    base[0] = "O%04d" % (9001 + k)
    base[5] = "N/A"
    junk.append(base)
raw = flat + dups + junk
rng.shuffle(raw)
write_csv("sales_raw.csv", ["OrderID", "OrderDate", "Region", "Product", "Category", "Quantity", "UnitPrice", "Discount"], raw)

# ---- shop.sql (SQLite-friendly, plain INSERTs) ----
with open(os.path.join(OUT, "shop.sql"), "w", encoding="utf-8", newline="\n") as f:
    f.write("-- SkillPrep practice data (synthetic). Load with:  sqlite3 shop.db < shop.sql\n")
    f.write("CREATE TABLE customers (CustomerID TEXT PRIMARY KEY, Region TEXT, Segment TEXT);\n")
    f.write("CREATE TABLE products (ProductID TEXT PRIMARY KEY, Product TEXT, Category TEXT, UnitPrice REAL);\n")
    f.write("CREATE TABLE orders (OrderID TEXT PRIMARY KEY, OrderDate TEXT, CustomerID TEXT REFERENCES customers(CustomerID), "
            "ProductID TEXT REFERENCES products(ProductID), Quantity INTEGER, Discount REAL);\n")
    for c in CUSTOMERS:
        f.write("INSERT INTO customers VALUES ('%s','%s','%s');\n" % c)
    for p in PRODUCTS:
        f.write("INSERT INTO products VALUES ('%s','%s','%s',%s);\n" % p)
    for o in ORDERS:
        f.write("INSERT INTO orders VALUES ('%s','%s','%s','%s',%d,%s);\n" % o)

# ---- answers ----
ans = {"seed": SEED, "generated_with": "tools/make_data.py", "sqlite_version": sqlite3.sqlite_version}

rev_2025 = [(o, revenue(o)) for o in orders_2025]
by_region, by_cat, by_prod = {}, {}, {}
for o, r in rev_2025:
    by_region[CUST[o[2]][1]] = by_region.get(CUST[o[2]][1], Decimal(0)) + r
    by_cat[PROD[o[3]][2]] = by_cat.get(PROD[o[3]][2], Decimal(0)) + r
    by_prod[PROD[o[3]][1]] = by_prod.get(PROD[o[3]][1], Decimal(0)) + r
monthly = {}
for o, r in rev_2025:
    monthly[o[1][:7]] = monthly.get(o[1][:7], Decimal(0)) + r
top_prod = max(by_prod.items(), key=lambda kv: kv[1])
ans["project1"] = {
    "raw_rows": len(raw), "clean_rows": n_clean, "duplicate_rows": len(dups), "junk_rows": len(junk), "messy_region_cells": len(messy_idx),
    "total_revenue": str(q2(sum(r for _, r in rev_2025))),
    "revenue_by_region": {k: str(q2(by_region[k])) for k in REGIONS},
    "revenue_by_category": {k: str(q2(v)) for k, v in sorted(by_cat.items(), key=lambda kv: -kv[1])},
    "top_product": {"name": top_prod[0], "revenue": str(q2(top_prod[1]))},
    "revenue_by_month": {k: str(q2(v)) for k, v in sorted(monthly.items())},
    "discounted_orders": sum(1 for o in orders_2025 if o[5] != "0"),
}

# SQL answers: run the exact query text in SQLite
con = sqlite3.connect(":memory:")
con.executescript(open(os.path.join(OUT, "shop.sql"), encoding="utf-8").read())
REV = "o.Quantity * p.UnitPrice * (1 - o.Discount)"
cat_rev = sorted((sum(revenue(o) for o in ORDERS if PROD[o[3]][2] == c), c) for c in {p[2] for p in PRODUCTS})
thresh = int((cat_rev[1][0] // 1000) * 1000)  # a round number between the lowest and the middle category
QUERIES = [
    ("Orders per region", "Count the orders placed by customers in each region, largest first.",
     "SELECT c.Region, COUNT(*) AS orders\nFROM orders o\nJOIN customers c ON c.CustomerID = o.CustomerID\nGROUP BY c.Region\nORDER BY orders DESC, c.Region;"),
    ("Revenue by category", "Total revenue (quantity x unit price x (1 - discount)) per product category, rounded to 2 decimals.",
     "SELECT p.Category, ROUND(SUM(%s), 2) AS revenue\nFROM orders o\nJOIN products p ON p.ProductID = o.ProductID\nGROUP BY p.Category\nORDER BY revenue DESC;" % REV),
    ("Top 5 customers", "The five customers with the highest total revenue.",
     "SELECT o.CustomerID, ROUND(SUM(%s), 2) AS revenue\nFROM orders o\nJOIN products p ON p.ProductID = o.ProductID\nGROUP BY o.CustomerID\nORDER BY revenue DESC, o.CustomerID\nLIMIT 5;" % REV),
    ("Customers with no orders", "List customers who have never ordered.",
     "SELECT c.CustomerID, c.Region, c.Segment\nFROM customers c\nLEFT JOIN orders o ON o.CustomerID = c.CustomerID\nWHERE o.OrderID IS NULL\nORDER BY c.CustomerID;"),
    ("Monthly revenue, 2025", "Revenue for each month of 2025. strftime is SQLite's date function; other databases use their own.",
     "SELECT strftime('%%Y-%%m', o.OrderDate) AS month, ROUND(SUM(%s), 2) AS revenue\nFROM orders o\nJOIN products p ON p.ProductID = o.ProductID\nWHERE o.OrderDate >= '2025-01-01' AND o.OrderDate < '2026-01-01'\nGROUP BY month\nORDER BY month;" % REV),
    ("Average order value by segment", "Average revenue per order for each customer segment, rounded to 2 decimals.",
     "SELECT c.Segment, ROUND(SUM(%s) / COUNT(*), 2) AS avg_order_value\nFROM orders o\nJOIN customers c ON c.CustomerID = o.CustomerID\nJOIN products p ON p.ProductID = o.ProductID\nGROUP BY c.Segment\nORDER BY avg_order_value DESC;" % REV),
    ("Running total by month, 2025", "Monthly revenue for 2025 with a cumulative running total (a window function; needs SQLite 3.25 or later).",
     "WITH monthly AS (\n  SELECT strftime('%%Y-%%m', o.OrderDate) AS month, SUM(%s) AS revenue\n  FROM orders o\n  JOIN products p ON p.ProductID = o.ProductID\n  WHERE o.OrderDate >= '2025-01-01' AND o.OrderDate < '2026-01-01'\n  GROUP BY month\n)\nSELECT month, ROUND(revenue, 2) AS revenue, ROUND(SUM(revenue) OVER (ORDER BY month), 2) AS running_total\nFROM monthly\nORDER BY month;" % REV),
    ("Categories above a revenue threshold", "Categories whose total revenue is more than %s." % format(thresh, ","),
     "SELECT p.Category, ROUND(SUM(%s), 2) AS revenue\nFROM orders o\nJOIN products p ON p.ProductID = o.ProductID\nGROUP BY p.Category\nHAVING SUM(%s) > %d\nORDER BY revenue DESC;" % (REV, REV, thresh)),
]
qa = []
for title, task, sql in QUERIES:
    cur = con.execute(sql)
    cols = [d[0] for d in cur.description]
    rows = cur.fetchall()
    qa.append({"title": title, "task": task, "sql": sql, "columns": cols, "row_count": len(rows),
               "rows": [[("%.2f" % v if isinstance(v, float) else v) for v in r] for r in rows]})
ans["project2"] = {"tables": {"customers": len(CUSTOMERS), "products": len(PRODUCTS), "orders": len(ORDERS)},
                   "customers_without_orders": sorted(NO_ORDER), "queries": qa}

# Power BI answers
def total(pred):
    return sum((revenue(o) for o in ORDERS if pred(o)), Decimal(0))

s24, s25 = total(lambda o: o[1].startswith("2024")), total(lambda o: o[1].startswith("2025"))
elec25 = total(lambda o: o[1].startswith("2025") and PROD[o[3]][2] == "Electronics")
q25 = {q: total(lambda o, q=q: o[1].startswith("2025") and "Q%d" % ((int(o[1][5:7]) - 1) // 3 + 1) == q) for q in ["Q1", "Q2", "Q3", "Q4"]}
yoy = ((s25 - s24) / s24 * 100).quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)
ans["project3"] = {
    "fact_rows": len(ORDERS), "date_rows": len(dim_date), "product_rows": len(PRODUCTS), "customer_rows": len(CUSTOMERS),
    "total_sales_all": str(q2(s24 + s25)), "sales_2024": str(q2(s24)), "sales_2025": str(q2(s25)),
    "yoy_percent_2025": str(yoy), "sales_electronics_2025": str(q2(elec25)),
    "sales_by_quarter_2025": {k: str(q2(v)) for k, v in q25.items()},
}
with open(os.path.join(OUT, "answers.json"), "w", encoding="utf-8", newline="\n") as f:
    json.dump(ans, f, indent=2)
    f.write("\n")
print("wrote", sorted(os.listdir(OUT)))
