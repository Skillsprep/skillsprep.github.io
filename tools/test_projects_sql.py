"""Run every SQL query stored in answers.json against projects/data/shop.sql and compare with the stored result.
Also recompute the expected revenue numbers independently with Decimal and compare to within 0.01."""
import json, os, sqlite3, sys
from decimal import Decimal
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "projects", "data")
A = json.load(open(os.path.join(root, "answers.json"), encoding="utf-8"))
con = sqlite3.connect(":memory:")
con.executescript(open(os.path.join(root, "shop.sql"), encoding="utf-8").read())
bad = 0
for t, n in A["project2"]["tables"].items():
    got = con.execute("select count(*) from " + t).fetchone()[0]
    if got != n: print("table", t, got, "!=", n); bad += 1
for q in A["project2"]["queries"]:
    cur = con.execute(q["sql"]); rows = cur.fetchall()
    shown = [[("%.2f" % v if isinstance(v, float) else v) for v in r] for r in rows]
    if [d[0] for d in cur.description] != q["columns"] or shown != q["rows"] or len(rows) != q["row_count"]:
        print("MISMATCH:", q["title"]); bad += 1
# independent decimal cross-checks of the revenue-by-category query
import csv
price = {r["ProductID"]: (Decimal(r["UnitPrice"]), r["Category"]) for r in csv.DictReader(open(os.path.join(root, "products.csv"), encoding="utf-8"))}
cat = {}
for o in csv.DictReader(open(os.path.join(root, "orders.csv"), encoding="utf-8")):
    p, c = price[o["ProductID"]]
    cat[c] = cat.get(c, Decimal(0)) + p * int(o["Quantity"]) * (1 - Decimal(o["Discount"]))
q2 = next(q for q in A["project2"]["queries"] if q["title"] == "Revenue by category")
for name, val in q2["rows"]:
    if abs(Decimal(val) - cat[name]) > Decimal("0.01"): print("decimal mismatch", name, val, cat[name]); bad += 1
# negative test: the checker must notice a changed query result
con.execute("update orders set Quantity = Quantity + 1 where OrderID = 'O0001'")
changed = con.execute(q2["sql"]).fetchall()
if [[("%.2f" % v if isinstance(v, float) else v) for v in r] for r in changed] == q2["rows"]:
    print("negative test failed: change not detected"); bad += 1
print("SQL answers verified (%d queries, SQLite %s)%s" % (len(A["project2"]["queries"]), sqlite3.sqlite_version, "" if not bad else " WITH ERRORS"))
sys.exit(1 if bad else 0)
