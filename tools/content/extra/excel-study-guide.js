module.exports = [
  { h: "Exact versus approximate matching: what a lookup really does", body: `
<p>Most lookup bugs come from not knowing which of two algorithms is running. An <b>exact</b> lookup scans for a value equal to yours and returns the first hit. An <b>approximate</b> lookup assumes the keys are sorted ascending and finds the largest key that is less than or equal to your value. That second behaviour is exactly what you want for banded data such as grades, tax slabs or commission tiers, and exactly what you do not want for employee IDs.</p>
<p>In <code>VLOOKUP</code> the fourth argument chooses the mode. <code>FALSE</code> means exact. <code>TRUE</code>, or leaving the argument out, means approximate. Forgetting it is the classic mistake: on unsorted IDs the formula quietly returns a wrong row instead of an error. Always type the argument explicitly.</p>
<p>Worked example with a tier table in E2:F5:</p>
<table>
<tr><th>Min score (E)</th><th>Grade (F)</th></tr>
<tr><td>0</td><td>F</td></tr>
<tr><td>50</td><td>C</td></tr>
<tr><td>65</td><td>B</td></tr>
<tr><td>80</td><td>A</td></tr>
</table>
<pre><code>=VLOOKUP(B2, $E$2:$F$5, 2, TRUE)</code></pre>
<p>A score of 72 returns B, because 65 is the largest threshold not above 72. A score of 80 returns A, since an equal key counts. The table must stay sorted ascending, and it must start at 0 or every low score returns #N/A.</p>
<p><code>XLOOKUP</code> (Excel 2021 and Microsoft 365) defaults to <i>exact</i>, which makes the safe choice the lazy choice. Its fifth argument, <code>match_mode</code>, takes 0 for exact, -1 for exact or the next smaller item, 1 for exact or the next larger item, and 2 for wildcard matching. The same grade lookup becomes:</p>
<pre><code>=XLOOKUP(B2, E2:E5, F2:F5, , -1)</code></pre>
<p>The empty fourth argument skips the custom not-found message; the fifth is the match mode.</p>
<div class="callout tip"><b>Interview reasoning</b> If asked why a lookup returned the wrong value rather than an error, check the match mode first, then check for numbers stored as text and stray spaces.</div>` },
  { h: "Dynamic array functions and LET, step by step", body: `
<p>Before Excel 2021 a formula returned one value per cell. Dynamic array functions return a whole block that <b>spills</b> into neighbouring cells from the cell where you typed the formula. <code>FILTER</code>, <code>UNIQUE</code>, <code>SORT</code>, <code>SORTBY</code>, <code>SEQUENCE</code> and <code>LET</code> all need Excel 2021 or Microsoft 365, so do not build a shared workbook on them if colleagues use Excel 2019 or earlier.</p>
<p>Suppose A2:C9 holds Region, Rep and Amount. To list orders over 5,000 for the East region:</p>
<pre><code>=FILTER(A2:C9, (A2:A9="East")*(C2:C9&gt;5000), "None")</code></pre>
<p>Multiplying the two tests acts as AND, because a row survives only when both give 1. Adding them acts as OR. The third argument is shown when nothing matches; leave it out and you get #CALC!. To get a sorted list of distinct regions:</p>
<pre><code>=SORT(UNIQUE(A2:A9))</code></pre>
<p>The result occupies as many cells as it needs. If something non-empty blocks that area you see #SPILL!, and clearing the obstruction fixes it. To refer to the entire spilled result from another formula, add a hash after the anchor cell, for example <code>E2#</code>.</p>
<p><code>LET</code> assigns names to intermediate results inside one formula. It makes long formulas readable and avoids repeating an expensive calculation:</p>
<pre><code>=LET(
  sales, FILTER(C2:C9, A2:A9="East", 0),
  total, SUM(sales),
  total / ROWS(sales)
)</code></pre>
<p>Each name is followed by its value; the last argument is the result. Here the East average is computed from a filtered list that is evaluated once.</p>
<div class="callout"><b>Compatibility rule</b> Anything that must open cleanly in older versions should use <code>INDEX</code>/<code>MATCH</code>, <code>SUMIFS</code> and <code>COUNTIFS</code> instead of the functions above.</div>` },
  { h: "Pivot tables: how they work and why they go stale", body: `
<p>A pivot table is a summary built from a <b>snapshot</b> of your source data called the pivot cache. This explains the most common complaint: you edit the source, and the pivot does not change. Right-click the pivot and choose Refresh. Better, make the source an Excel Table (Ctrl+T) before building the pivot, so new rows are included automatically and you avoid a fixed range like A1:F500 that silently misses row 501.</p>
<p>Source data must be tidy: one header row, one record per row, no merged cells, no blank rows, and no subtotal rows mixed in. A blank header gives an error when you create the pivot, and a column mixing text and numbers can make a value field default to Count instead of Sum. When a field you expected to Sum shows Count, look for text-formatted numbers or blanks in that column.</p>
<p>Worked example. Source rows: East/Jan/100, East/Feb/150, West/Jan/80, West/Feb/60. Put Region in Rows, Month in Columns and Amount in Values (Sum). You get East 250, West 140 and a grand total of 390. Now change the value setting to <i>Show Values As, % of Grand Total</i>: East is about 64%, West about 36%. The numbers did not change, only their presentation, which is a distinction worth stating out loud in an interview.</p>
<ul>
<li><b>Calculated field</b> works on the sum of source fields, so a ratio such as Profit/Revenue is computed from totals, not averaged row by row.</li>
<li><b>Grouping</b> dates into months, quarters or years is done from the right-click menu on a date field.</li>
<li><b>Slicers and timelines</b> are visual filters that can drive several pivots at once when connected to them.</li>
<li><b>GETPIVOTDATA</b> is what Excel inserts when you click a pivot cell from a formula; it keeps the reference valid if the layout changes.</li>
</ul>` },
  { h: "Mistakes that cost marks and how to avoid them", body: `
<p>These errors appear again and again in real workbooks and in skills tests.</p>
<table>
<tr><th>Symptom</th><th>Likely cause</th><th>Fix</th></tr>
<tr><td>Lookup returns #N/A though the value is visible</td><td>Trailing space, or number stored as text on one side</td><td><code>TRIM</code>, or convert with <code>VALUE</code> or multiply by 1</td></tr>
<tr><td>Formula copied down gives shifting results</td><td>Lookup range not anchored</td><td>Use <code>$E$2:$F$5</code></td></tr>
<tr><td>Totals differ from the pivot</td><td>Hidden rows, text numbers, or stale pivot cache</td><td>Refresh, check data types</td></tr>
<tr><td>Wrong value, no error</td><td>Approximate match on unsorted data</td><td>Use exact mode</td></tr>
<tr><td>#REF! after deleting a column</td><td>Formula pointed at removed cells</td><td>Use Tables or named ranges</td></tr>
</table>
<p>For maintainability, prefer <b>Tables with structured references</b> such as <code>Sales[Amount]</code> over raw ranges, because they grow with the data and read like English. Put assumptions like tax rate in one labelled cell and refer to it, rather than burying 0.18 inside twenty formulas. Whole-column references like <code>B:B</code> are convenient and fine in lookups, but many of them across thousands of formulas can slow a workbook; a Table column is both tighter and clearer.</p>
<p>Know when <code>SUMIFS</code> beats a pivot: if you need one number that updates live inside a formula, <code>SUMIFS(Amount, Region, "East", Month, "Jan")</code> is simpler. If you need to explore the data several ways, a pivot is faster.</p>` },
  { h: "How to practise and quick glossary", body: `
<p>Reading about formulas teaches little; breaking them teaches a lot. A routine that works: take a small dataset of about twenty rows, write each answer two ways (for example <code>XLOOKUP</code> and <code>INDEX</code>/<code>MATCH</code>), then deliberately corrupt the data with a trailing space, a text number and a duplicate key, and predict the result before pressing Enter. Use Formulas, then Evaluate Formula, to watch a nested formula resolve step by step.</p>
<p>Spend time explaining answers aloud. If you can say why approximate match needs sorted data, you understand it; if you can only recite the syntax, you do not yet.</p>
<table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td>Spill</td><td>A formula result that fills several cells automatically</td></tr>
<tr><td>Structured reference</td><td>Table-based name such as <code>Table1[Col]</code></td></tr>
<tr><td>Absolute reference</td><td>A reference with <code>$</code> that does not move when copied</td></tr>
<tr><td>Pivot cache</td><td>Stored copy of source data a pivot reads from</td></tr>
<tr><td>Volatile function</td><td>One that recalculates on every change, such as <code>TODAY</code> or <code>RAND</code></td></tr>
<tr><td>Named range</td><td>A label assigned to a cell or range for use in formulas</td></tr>
</table>` }
];
