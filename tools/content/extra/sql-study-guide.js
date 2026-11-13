module.exports = [
  { h: "How a query is really evaluated", body: `
<p>You write <code>SELECT</code> first, but the database logically handles it nearly last. Knowing the logical order explains most "why can't I use that here?" errors. The order is: <b>FROM</b> (and JOINs) builds the working rows, <b>WHERE</b> filters rows, <b>GROUP BY</b> forms groups, <b>HAVING</b> filters groups, <b>SELECT</b> computes the output columns, <b>ORDER BY</b> sorts, and finally the row limit is applied. Optimisers may physically execute things differently, but the result must behave as if this order were followed.</p>
<p>Three practical consequences follow:</p>
<ul>
<li>A column alias defined in <code>SELECT</code> usually cannot be used in <code>WHERE</code>, because WHERE ran earlier. It can be used in <code>ORDER BY</code>, which runs afterwards. Some dialects are more lenient in GROUP BY or HAVING, so do not rely on that when writing portable SQL.</li>
<li>Aggregates cannot appear in WHERE, since groups do not exist yet.</li>
<li>Every non-aggregated column in SELECT must appear in GROUP BY (or be functionally dependent on it, which only some databases accept).</li>
</ul>
<p>Limiting rows is where dialects differ most:</p>
<table>
<tr><th>Syntax</th><th>Where you will meet it</th></tr>
<tr><td><code>LIMIT 5</code></td><td>PostgreSQL, MySQL, SQLite</td></tr>
<tr><td><code>SELECT TOP 5 ...</code></td><td>SQL Server</td></tr>
<tr><td><code>FETCH FIRST 5 ROWS ONLY</code></td><td>The SQL standard; Oracle (12c onwards), PostgreSQL, Db2</td></tr>
</table>
<pre><code>-- Three highest-paid employees, standard form
SELECT name, salary
FROM employees
ORDER BY salary DESC
FETCH FIRST 3 ROWS ONLY;</code></pre>
<div class="callout"><b>Always pair a limit with ORDER BY</b> Without it, "the first 3 rows" is whatever the engine happens to return, and the answer can change between runs.</div>` },

  { h: "NULL and three-valued logic", body: `
<p>NULL means "unknown", not zero and not an empty string. Comparisons with an unknown value give an unknown result, so SQL has three truth values: TRUE, FALSE and UNKNOWN. A WHERE clause keeps only rows where the condition is TRUE, so UNKNOWN rows are dropped just like FALSE ones.</p>
<table>
<tr><th>Expression</th><th>Result</th></tr>
<tr><td><code>NULL = NULL</code></td><td>UNKNOWN (not TRUE)</td></tr>
<tr><td><code>5 &lt;&gt; NULL</code></td><td>UNKNOWN</td></tr>
<tr><td><code>NULL IS NULL</code></td><td>TRUE</td></tr>
<tr><td><code>TRUE AND UNKNOWN</code></td><td>UNKNOWN</td></tr>
<tr><td><code>TRUE OR UNKNOWN</code></td><td>TRUE</td></tr>
<tr><td><code>NOT UNKNOWN</code></td><td>UNKNOWN</td></tr>
</table>
<p>That last row is why <code>NOT IN</code> is dangerous. Suppose you want customers who have never ordered:</p>
<pre><code>-- Looks right, but returns NOTHING if any orders.customer_id is NULL
SELECT name FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);

-- Safe version
SELECT c.name FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);</code></pre>
<p>Why does the first fail? <code>id NOT IN (1, 3, NULL)</code> expands to <code>id &lt;&gt; 1 AND id &lt;&gt; 3 AND id &lt;&gt; NULL</code>. For id = 2 the last test is UNKNOWN, so the whole expression is UNKNOWN and the row is discarded. One NULL in the list empties the result. <code>NOT EXISTS</code>, or a LEFT JOIN with <code>WHERE o.id IS NULL</code>, avoids the problem.</p>
<p>Other NULL habits worth having: aggregates such as <code>SUM</code>, <code>AVG</code> and <code>COUNT(column)</code> ignore NULLs; <code>COALESCE(x, 0)</code> returns the first non-NULL argument; and <code>GROUP BY</code> treats all NULLs as one group even though they are not "equal".</p>` },

  { h: "Joins by hand, and the mistakes that follow", body: `
<p>The fastest way to understand joins is to run them on paper. Take two tiny tables.</p>
<table>
<tr><th>customers.id</th><th>name</th></tr>
<tr><td>1</td><td>Asha</td></tr>
<tr><td>2</td><td>Ben</td></tr>
<tr><td>3</td><td>Chen</td></tr>
</table>
<table>
<tr><th>orders.id</th><th>customer_id</th><th>amount</th></tr>
<tr><td>101</td><td>1</td><td>50</td></tr>
<tr><td>102</td><td>1</td><td>30</td></tr>
<tr><td>103</td><td>3</td><td>20</td></tr>
</table>
<p>An <b>INNER JOIN</b> on <code>customers.id = orders.customer_id</code> yields three rows: Asha twice, Chen once. Ben vanishes because he has no match. A <b>LEFT JOIN</b> yields four rows: the same three plus Ben with NULL in every orders column. A customer with two orders appears twice, because a join produces one output row per matching pair.</p>
<p><b>COUNT(*) versus COUNT(column).</b> Using the LEFT JOIN result, count orders per customer:</p>
<pre><code>SELECT c.name, COUNT(*) AS wrong, COUNT(o.id) AS right
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.name;</code></pre>
<table>
<tr><th>name</th><th>wrong</th><th>right</th></tr>
<tr><td>Asha</td><td>2</td><td>2</td></tr>
<tr><td>Ben</td><td>1</td><td>0</td></tr>
<tr><td>Chen</td><td>1</td><td>1</td></tr>
</table>
<p><code>COUNT(*)</code> counts rows, and Ben's NULL-padded row is still a row. <code>COUNT(o.id)</code> counts only non-NULL values, so Ben correctly gets 0.</p>
<p><b>Join fan-out.</b> If each order also has several rows in an <code>order_items</code> table and you join all three tables, each order row is repeated once per item. Then <code>SUM(o.amount)</code> counts the same amount several times. Fix it by aggregating the many-side first in a subquery or CTE, then joining the already-summarised result, or by summing at the item level.</p>
<p><b>Filtering a LEFT JOIN.</b> Putting a condition on the right table in WHERE (for example <code>WHERE o.amount &gt; 25</code>) removes the NULL-padded rows and silently turns the query into an inner join. If you want to keep unmatched left rows, put the condition in the <code>ON</code> clause instead.</p>` },

  { h: "Window functions and CTEs", body: `
<p>A window function computes a value for each row using a related set of rows, without collapsing them the way GROUP BY does. The shape is <code>function() OVER (PARTITION BY ... ORDER BY ...)</code>. PARTITION BY splits rows into independent groups; ORDER BY defines the sequence inside each one.</p>
<p>The three ranking functions differ only in how they treat ties. With salaries 90, 90, 80:</p>
<table>
<tr><th>salary</th><th>ROW_NUMBER</th><th>RANK</th><th>DENSE_RANK</th></tr>
<tr><td>90</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>90</td><td>2</td><td>1</td><td>1</td></tr>
<tr><td>80</td><td>3</td><td>3</td><td>2</td></tr>
</table>
<p><code>ROW_NUMBER</code> never repeats (tied rows are ordered arbitrarily unless you add a tie-breaker), <code>RANK</code> repeats and then skips, and <code>DENSE_RANK</code> repeats without skipping. Pick based on whether "second highest" should mean the second row or the second distinct value.</p>
<p>A running total uses an aggregate as a window function:</p>
<pre><code>SELECT order_date, amount,
       SUM(amount) OVER (
         ORDER BY order_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM orders;</code></pre>
<p>Spelling out the <code>ROWS</code> frame matters. When a frame is omitted, the default usually treats rows with equal ORDER BY values as peers, so two orders on the same date would show the same running total.</p>
<p>Window functions cannot be used directly in WHERE, because they are evaluated after it. The standard workaround is a <b>CTE</b> (common table expression), a named temporary result defined with <code>WITH</code>:</p>
<pre><code>WITH ranked AS (
  SELECT name, department, salary,
         ROW_NUMBER() OVER (
           PARTITION BY department ORDER BY salary DESC
         ) AS rn
  FROM employees
)
SELECT name, department, salary
FROM ranked
WHERE rn &lt;= 2;   -- top 2 per department</code></pre>
<p>CTEs make long queries readable by naming each step, and several can be chained with commas. Treat them mainly as a readability tool; whether a CTE is cached or inlined depends on the database.</p>` },

  { h: "Indexes, practice plan and glossary", body: `
<p><b>Indexes, conceptually.</b> An index is a separate sorted structure (commonly a B-tree) that lets the database find rows by a column's value without reading the whole table, like a book's index versus reading every page. It helps with <code>WHERE</code> equality and range filters, join columns, and sometimes ORDER BY. The costs are extra storage and slower INSERT, UPDATE and DELETE, since each index must be maintained. Indexes help less when a query needs most of the table anyway, and a function wrapped around the column (such as <code>WHERE UPPER(name) = 'ASHA'</code>) can stop a plain index being used. In a composite index on (a, b), a query filtering only on b generally cannot use it efficiently, because the sort is by a first.</p>
<p><b>Interview-style reasoning.</b> When asked to "find the second-highest salary", state your assumptions out loud: do ties count once (DENSE_RANK) or separately (ROW_NUMBER)? What should happen if there is no second value? Explaining the choice earns more than a memorised snippet.</p>
<p><b>How to practise.</b></p>
<ol>
<li>Create the customers and orders tables above in any free engine (SQLite is enough) and predict each result on paper before running it.</li>
<li>Rewrite one NOT IN query three ways: NOT EXISTS, LEFT JOIN with IS NULL, and NOT IN. Then insert a NULL and compare.</li>
<li>Take any GROUP BY query and recompute it with a window function, noting which rows survive.</li>
<li>Run your engine's explain command (EXPLAIN, or its equivalent) before and after adding an index and read how the plan changes.</li>
</ol>
<table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td>Predicate</td><td>A condition that evaluates to TRUE, FALSE or UNKNOWN</td></tr>
<tr><td>Cardinality</td><td>How many rows a table or result has; also how many distinct values a column holds</td></tr>
<tr><td>Fan-out</td><td>Row multiplication caused by joining to the "many" side of a relationship</td></tr>
<tr><td>Partition</td><td>An independent group of rows inside a window function</td></tr>
<tr><td>CTE</td><td>A named, query-scoped result introduced by WITH</td></tr>
</table>` }
];
