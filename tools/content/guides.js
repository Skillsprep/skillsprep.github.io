module.exports = [
  {
    slug: "excel-study-guide",
    title: "Excel Study Guide: Lookups, Pivot Tables & Core Functions",
    category: "Excel",
    icon: "XL",
    gradient: "linear-gradient(135deg,#1D6F42,#31a05f)",
    date: "Sep 5, 2026",
    readTime: "9 min read",
    excerpt: "Core Excel skills for work, interviews and skills tests: lookup formulas, text and logical functions, pivot tables, and 3 practice questions with full explanations.",
    intro: "Excel is one of the most requested skills in office, finance and analyst roles. This guide covers the everyday core — lookups, logical and text functions, and pivot tables — and finishes with practice questions so you can test yourself before an interview or skills test.",
    sections: [
      { h: "Core topics to know", body: `
        <p>Practical, everyday spreadsheet work rests on these areas:</p>
        <ul>
          <li><b>Lookup functions</b> — <code>VLOOKUP</code>, <code>XLOOKUP</code>, <code>INDEX</code> + <code>MATCH</code></li>
          <li><b>Logical functions</b> — <code>IF</code>, <code>IFS</code>, <code>AND</code>, <code>OR</code>, <code>SWITCH</code></li>
          <li><b>Text functions</b> — <code>LEFT</code>, <code>RIGHT</code>, <code>MID</code>, <code>CONCAT</code>, <code>TRIM</code>, <code>TEXTSPLIT</code> (Microsoft 365)</li>
          <li><b>Pivot tables</b> — grouping, calculated fields, slicers, and value field settings</li>
          <li><b>Conditional formatting</b> — highlight cells rules, color scales, and icon sets</li>
          <li><b>Data tools</b> — remove duplicates, text to columns, data validation</li>
        </ul>` },
      { h: "VLOOKUP vs XLOOKUP", body: `
        <p>A classic interview and test question. <code>VLOOKUP</code> only searches the <b>first column</b> of a range and can only return columns to the <b>right</b>. <code>XLOOKUP</code> (Excel 365/2021) searches anywhere and returns from any column:</p>
        <pre><code>=XLOOKUP(A2, Sheet2!B:B, Sheet2!C:C, "Not found")</code></pre>
        <div class="callout"><b>Quick rule</b> If the lookup value may not exist and you want a friendly message instead of #N/A, reach for a function with a built-in <i>if not found</i> argument — that's <code>XLOOKUP</code> (or <code>IFERROR</code> wrapped around <code>VLOOKUP</code>).</div>` },
      { h: "Pivot table essentials", body: `
        <p>A typical scenario: "You have 10,000 rows of sales data and need the total per region per quarter." The right tool is a <b>pivot table</b>, with Region in Rows, Quarter in Columns, and Sum of Amount in Values.</p>
        <p>Know the difference between:</p>
        <ul>
          <li><b>Sum</b> — default for numeric data</li>
          <li><b>Count</b> — counts non-empty cells</li>
          <li><b>Distinct Count</b> — requires adding the data to the <i>Data Model</i></li>
        </ul>` },
            { h: "Practical learning exercises", body: `
        <ul>
          <li><b>Exercise 1 (Lookups):</b> Download a sample dataset of employees and departments. Write an XLOOKUP formula to pull department names into the employee table, handling missing IDs gracefully with a "Not Found" message.</li>
          <li><b>Exercise 2 (Pivot Tables):</b> Use a sales dataset with Dates, Regions, and Amounts. Create a Pivot Table to show total sales per Region, then add a timeline slicer to filter by Q1.</li>
          <li><b>Exercise 3 (Logical Functions):</b> Create a grading sheet. Use the IFS function to assign letter grades (A, B, C, F) based on numerical scores, and apply Conditional Formatting to highlight failing grades in red.</li>
        </ul>` },
{ h: "Practice questions", body: `
        <p>Test yourself. Select an answer, then check the explanation.</p>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 20</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">Cell A2 contains "New York, NY". Which formula extracts just "NY"?</p>
            <label class="opt" data-correct><input type="radio" name="q1"> =RIGHT(A2, 2)</label>
            <label class="opt"><input type="radio" name="q1"> =LEFT(A2, 2)</label>
            <label class="opt"><input type="radio" name="q1"> =MID(A2, 2)</label>
            <label class="opt"><input type="radio" name="q1"> =TRIM(A2, 2)</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>RIGHT(text, 2)</code> returns the last 2 characters. The state code "NY" sits at the end of the string. <code>MID</code> requires a start position and length; <code>TRIM</code> only removes extra spaces.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 2 of 20</span><span>Lookups</span></div>
          <div class="q-body">
            <p class="q-text">Your lookup table has the ID in column D and the name in column C (to its LEFT). Which is the best formula to return the name for ID in A2?</p>
            <label class="opt"><input type="radio" name="q2"> =VLOOKUP(A2, C:D, 2, FALSE)</label>
            <label class="opt" data-correct><input type="radio" name="q2"> =XLOOKUP(A2, D:D, C:C, "Not found")</label>
            <label class="opt"><input type="radio" name="q2"> =HLOOKUP(A2, D:D, 1, FALSE)</label>
            <label class="opt"><input type="radio" name="q2"> =LOOKUP(A2, C:C)</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>XLOOKUP</code> returns values from a column <i>to the left</i> of the lookup column — VLOOKUP cannot. The <code>"Not found"</code> argument also handles missing IDs gracefully.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 3 of 20</span><span>Pivot Tables</span></div>
          <div class="q-body">
            <p class="q-text">In a pivot table, you want the number of unique customers per product, not the number of orders. What do you need?</p>
            <label class="opt"><input type="radio" name="q3"> Change the value field to Count of Customer</label>
            <label class="opt"><input type="radio" name="q3"> Use Sum of Customer instead</label>
            <label class="opt" data-correct><input type="radio" name="q3"> Add the data to the Data Model and use Distinct Count</label>
            <label class="opt"><input type="radio" name="q3"> Group the Customer field</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Plain "Count" counts rows, so repeat customers are counted multiple times. <b>Distinct Count</b> is only available when the pivot table is based on the Data Model (check "Add this data to the Data Model" when inserting).</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 4 of 20</span><span>Logical Functions</span></div>
          <div class="q-body">
            <p class="q-text">You need to categorize sales: under $50 is "Low", $50-$100 is "Medium", and over $100 is "High". Which function is best suited to avoid complex nested IFs?</p>
            <label class="opt" data-correct><input type="radio" name="q4"> =IFS()</label>
            <label class="opt"><input type="radio" name="q4"> =SWITCH()</label>
            <label class="opt"><input type="radio" name="q4"> =CHOOSE()</label>
            <label class="opt"><input type="radio" name="q4"> =VLOOKUP() with exact match</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>IFS</code> evaluates multiple conditions sequentially without nesting. <code>SWITCH</code> requires an exact match on a single expression, not ranges like &gt;100.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 5 of 20</span><span>Conditional Formatting</span></div>
          <div class="q-body">
            <p class="q-text">How can you highlight an entire row based on the value in column B?</p>
            <label class="opt"><input type="radio" name="q5"> Apply a Color Scale to the whole table</label>
            <label class="opt"><input type="radio" name="q5"> Use a Highlight Cells Rule on column B</label>
            <label class="opt" data-correct><input type="radio" name="q5"> Use a custom formula starting with =$B2 in Conditional Formatting</label>
            <label class="opt"><input type="radio" name="q5"> Format as Table and check 'Highlight Rows'</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> To highlight a whole row, you must use a custom formula with a mixed reference (like <code>=$B2&gt;100</code>). The absolute column (<code>$B</code>) ensures all cells in the row look at column B, while the relative row (<code>2</code>) adjusts for each row.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 6 of 20</span><span>Lookups</span></div>
          <div class="q-body">
            <p class="q-text">Which function is best for a two-way lookup (finding a value at the intersection of a specific row and column)?</p>
            <label class="opt"><input type="radio" name="q6"> VLOOKUP with HLOOKUP</label>
            <label class="opt" data-correct><input type="radio" name="q6"> INDEX and MATCH</label>
            <label class="opt"><input type="radio" name="q6"> XLOOKUP only</label>
            <label class="opt"><input type="radio" name="q6"> FILTER</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> INDEX and MATCH used together can perform two-way lookups efficiently.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 7 of 20</span><span>Data Cleaning</span></div>
          <div class="q-body">
            <p class="q-text">You have a list of names with inconsistent spacing (e.g., '  John   Doe '). Which function fixes this?</p>
            <label class="opt"><input type="radio" name="q7"> CLEAN</label>
            <label class="opt" data-correct><input type="radio" name="q7"> TRIM</label>
            <label class="opt"><input type="radio" name="q7"> SUBSTITUTE</label>
            <label class="opt"><input type="radio" name="q7"> REPLACE</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> TRIM removes all spaces from text except for single spaces between words.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 8 of 20</span><span>Logical Functions</span></div>
          <div class="q-body">
            <p class="q-text">Which formula checks if a value in A2 is between 50 and 100?</p>
            <label class="opt"><input type="radio" name="q8"> =IF(50&lt;A2&lt;100)</label>
            <label class="opt" data-correct><input type="radio" name="q8"> =AND(A2&gt;50, A2&lt;100)</label>
            <label class="opt"><input type="radio" name="q8"> =OR(A2&gt;50, A2&lt;100)</label>
            <label class="opt"><input type="radio" name="q8"> =IF(A2&gt;50 AND A2&lt;100)</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> AND evaluates multiple conditions and returns TRUE only if all are true.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 9 of 20</span><span>Pivot Tables</span></div>
          <div class="q-body">
            <p class="q-text">How do you refresh a Pivot Table when the source data changes?</p>
            <label class="opt"><input type="radio" name="q9"> It refreshes automatically</label>
            <label class="opt" data-correct><input type="radio" name="q9"> Right-click and select Refresh</label>
            <label class="opt"><input type="radio" name="q9"> Press F5</label>
            <label class="opt"><input type="radio" name="q9"> Recreate the Pivot Table</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Pivot Tables do not update automatically; you must manually refresh them.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 10 of 20</span><span>Conditional Formatting</span></div>
          <div class="q-body">
            <p class="q-text">You want to highlight cells in A1:A10 that contain the word 'Urgent'. Which rule type should you use?</p>
            <label class="opt" data-correct><input type="radio" name="q10"> Highlight Cells Rules &gt; Text that Contains</label>
            <label class="opt"><input type="radio" name="q10"> Top/Bottom Rules</label>
            <label class="opt"><input type="radio" name="q10"> Data Bars</label>
            <label class="opt"><input type="radio" name="q10"> Color Scales</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The 'Text that Contains' rule is specifically designed for highlighting based on substrings.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 11 of 20</span><span>Formulas</span></div>
          <div class="q-body">
            <p class="q-text">What does the $ symbol do in a formula like =$A$1?</p>
            <label class="opt"><input type="radio" name="q11"> Formats the cell as currency</label>
            <label class="opt" data-correct><input type="radio" name="q11"> Creates an absolute reference that won't change when copied</label>
            <label class="opt"><input type="radio" name="q11"> Multiplies the value by 100</label>
            <label class="opt"><input type="radio" name="q11"> Indicates a text string</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The $ symbol locks the row and/or column reference.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 12 of 20</span><span>Text Functions</span></div>
          <div class="q-body">
            <p class="q-text">If A2 contains 'John Smith', which formula returns 'John'?</p>
            <label class="opt" data-correct><input type="radio" name="q12"> =LEFT(A2, FIND(" ", A2)-1)</label>
            <label class="opt"><input type="radio" name="q12"> =RIGHT(A2, 4)</label>
            <label class="opt"><input type="radio" name="q12"> =MID(A2, 1, 5)</label>
            <label class="opt"><input type="radio" name="q12"> =SPLIT(A2, " ")</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> FIND locates the space, and LEFT extracts the characters before it.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 13 of 20</span><span>Error Handling</span></div>
          <div class="q-body">
            <p class="q-text">Which function replaces a #DIV/0! error with a custom message like 'Error'?</p>
            <label class="opt"><input type="radio" name="q13"> ISERROR</label>
            <label class="opt"><input type="radio" name="q13"> IFNA</label>
            <label class="opt" data-correct><input type="radio" name="q13"> IFERROR</label>
            <label class="opt"><input type="radio" name="q13"> ERROR.TYPE</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> IFERROR allows you to specify a fallback value if a formula evaluates to an error.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 14 of 20</span><span>Data Validation</span></div>
          <div class="q-body">
            <p class="q-text">How can you restrict users to entering only dates in a specific cell?</p>
            <label class="opt"><input type="radio" name="q14"> Use Conditional Formatting</label>
            <label class="opt" data-correct><input type="radio" name="q14"> Use Data Validation &gt; Allow: Date</label>
            <label class="opt"><input type="radio" name="q14"> Format the cell as Date</label>
            <label class="opt"><input type="radio" name="q14"> Protect the worksheet</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Data Validation controls what users can type into a cell.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 15 of 20</span><span>Shortcuts</span></div>
          <div class="q-body">
            <p class="q-text">What is the keyboard shortcut to quickly Autosum a column of numbers?</p>
            <label class="opt"><input type="radio" name="q15"> Ctrl + S</label>
            <label class="opt" data-correct><input type="radio" name="q15"> Alt + =</label>
            <label class="opt"><input type="radio" name="q15"> Ctrl + Shift + +</label>
            <label class="opt"><input type="radio" name="q15"> F4</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Alt + = automatically inserts the SUM function for adjacent cells.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 16 of 20</span><span>Charts</span></div>
          <div class="q-body">
            <p class="q-text">Which chart type is best for showing the trend of sales over 12 months?</p>
            <label class="opt"><input type="radio" name="q16"> Pie Chart</label>
            <label class="opt" data-correct><input type="radio" name="q16"> Line Chart</label>
            <label class="opt"><input type="radio" name="q16"> Scatter Plot</label>
            <label class="opt"><input type="radio" name="q16"> Radar Chart</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Line charts are ideal for displaying continuous data over time.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 17 of 20</span><span>Lookups</span></div>
          <div class="q-body">
            <p class="q-text">What is the default match mode for VLOOKUP if the 4th argument is omitted?</p>
            <label class="opt"><input type="radio" name="q17"> Exact match</label>
            <label class="opt" data-correct><input type="radio" name="q17"> Approximate match</label>
            <label class="opt"><input type="radio" name="q17"> Wildcard match</label>
            <label class="opt"><input type="radio" name="q17"> Fuzzy match</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Omitting the range_lookup argument defaults to TRUE (approximate match), which requires sorted data.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 18 of 20</span><span>Protection</span></div>
          <div class="q-body">
            <p class="q-text">If you want users to edit cells A1:A5 but lock the rest of the sheet, what is the sequence of steps?</p>
            <label class="opt"><input type="radio" name="q18"> Protect Sheet, then Unlock A1:A5</label>
            <label class="opt" data-correct><input type="radio" name="q18"> Unlock A1:A5, then Protect Sheet</label>
            <label class="opt"><input type="radio" name="q18"> Hide A1:A5, then Protect Workbook</label>
            <label class="opt"><input type="radio" name="q18"> It is not possible</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Cells are locked by default, but locking only takes effect when the sheet is protected.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 19 of 20</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">Which function counts cells that meet multiple criteria?</p>
            <label class="opt"><input type="radio" name="q19"> COUNTIF</label>
            <label class="opt" data-correct><input type="radio" name="q19"> COUNTIFS</label>
            <label class="opt"><input type="radio" name="q19"> DCOUNT</label>
            <label class="opt"><input type="radio" name="q19"> SUMPRODUCT</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> COUNTIFS applies criteria to cells across multiple ranges and counts the number of times all criteria are met.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 20 of 20</span><span>Power Query</span></div>
          <div class="q-body">
            <p class="q-text">What is Power Query primarily used for?</p>
            <label class="opt"><input type="radio" name="q20"> Creating 3D charts</label>
            <label class="opt" data-correct><input type="radio" name="q20"> Connecting, combining, and refining data sources</label>
            <label class="opt"><input type="radio" name="q20"> Writing VBA macros</label>
            <label class="opt"><input type="radio" name="q20"> Collaborating in real-time</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Power Query is Excel's data transformation and preparation engine.</div>
        </div>` },
      { h: "Final preparation checklist", body: `
        <ul>
          <li>Practice the functions above hands-on — real tasks are scenario-based, not definition-based</li>
          <li>Rebuild one real spreadsheet from scratch (a budget or a sales report) using a lookup and a pivot table</li>
          <li>Time yourself: try each practice question in under a minute before reading the options</li>
          <li>Revisit Microsoft's official Excel help (linked under Sources) for any topic that still feels rusty</li>
        </ul>` }
    ]
  },
  {
    slug: "python-study-guide",
    title: "Python Fundamentals: Study Guide + Practice Quiz",
    category: "Python",
    icon: "PY",
    gradient: "linear-gradient(135deg,#2b6cb0,#3182ce)",
    date: "Sep 3, 2026",
    readTime: "8 min read",
    excerpt: "Data structures, comprehensions, exceptions, and functions — the Python fundamentals that interviews and skills tests keep returning to, with explained practice questions.",
    intro: "Python interviews and skills tests usually probe core language knowledge rather than frameworks. A solid grip on built-in data types, iteration, error handling, and a few intermediate features like comprehensions and decorators covers most of it.",
    sections: [
      { h: "Topics to know cold", body: `
        <p>These are the areas worth being able to explain from memory:</p>
        <ul>
          <li><b>Lists, dicts, tuples, sets</b> — mutability, methods (<code>append</code>, <code>get</code>, <code>set</code> operations)</li>
          <li><b>List &amp; dict comprehensions</b> — reading and writing them</li>
          <li><b>String methods</b> — <code>split</code>, <code>join</code>, <code>strip</code>, <code>replace</code>, slicing</li>
          <li><b>Exceptions</b> — <code>try/except/else/finally</code> flow</li>
          <li><b>Functions</b> — <code>*args</code>/<code>**kwargs</code>, default arguments, lambda, scope (<code>global</code>)</li>
          <li><b>Decorators</b> — basic understanding of <code>@wrapper</code> syntax</li>
          <li><b>OOP basics</b> — <code>__init__</code>, <code>self</code>, inheritance, <code>super()</code></li>
        </ul>` },
      { h: "The classic mutable default argument trap", body: `
        <p>This pattern is a favourite in interviews and tests. What does this print?</p>
        <pre><code>def add(item, basket=[]):
    basket.append(item)
    return basket

print(add("apple"))
print(add("banana"))</code></pre>
        <p>Answer: <code>['apple']</code> then <code>['apple', 'banana']</code>. The default list is created <b>once</b> when the function is defined and shared across calls. The safe pattern is <code>def add(item, basket=None):</code> with a fresh list inside.</p>
        <div class="callout tip"><b>Remember</b> Default argument values are evaluated once at function definition time — not on each call. This applies to any mutable default.</div>` },
      { h: "Comprehension patterns", body: `
        <p>Learn to read comprehensions left-to-right: <code>[expression for item in iterable if condition]</code></p>
        <pre><code># squares of even numbers 0-9
[x**2 for x in range(10) if x % 2 == 0]
# swap keys/values
{v: k for k, v in prices.items()}</code></pre>` },
            { h: "Practical learning exercises", body: `
        <ul>
          <li><b>Exercise 1 (Data Structures):</b> Write a script that takes a list of dictionaries (representing users) and uses a list comprehension to extract just the email addresses of active users.</li>
          <li><b>Exercise 2 (Functions & Error Handling):</b> Create a function that reads a JSON file and parses it. Implement a try/except block to catch FileNotFoundError and json.JSONDecodeError, logging a helpful message instead of crashing.</li>
          <li><b>Exercise 3 (OOP):</b> Design a simple BankAccount class with methods for deposit, withdraw, and get_balance. Ensure withdraw raises a ValueError if the amount exceeds the balance.</li>
        </ul>` },
{ h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 20</span><span>Data Types</span></div>
          <div class="q-body">
            <p class="q-text">Which of these is immutable?</p>
            <label class="opt"><input type="radio" name="q1"> list</label>
            <label class="opt"><input type="radio" name="q1"> dict</label>
            <label class="opt" data-correct><input type="radio" name="q1"> tuple</label>
            <label class="opt"><input type="radio" name="q1"> set</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Tuples cannot be modified after creation. Note that they can be used as dictionary keys and set members <b>only if</b> all their elements are hashable (e.g. a tuple containing a list cannot be a dictionary key). Lists, dicts, and sets are all mutable.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 2 of 20</span><span>Exceptions</span></div>
          <div class="q-body">
            <p class="q-text">In a try/except/else/finally block, which part runs only when no exception is raised?</p>
            <label class="opt"><input type="radio" name="q2"> finally</label>
            <label class="opt" data-correct><input type="radio" name="q2"> else</label>
            <label class="opt"><input type="radio" name="q2"> except</label>
            <label class="opt"><input type="radio" name="q2"> try</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>else</code> executes only if the try block completes without raising. <code>finally</code> always runs (exception or not), and <code>except</code> runs only when an exception occurs.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 3 of 20</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">What does <code>*args</code> allow in a function definition?</p>
            <label class="opt" data-correct><input type="radio" name="q3"> Accept any number of positional arguments as a tuple</label>
            <label class="opt"><input type="radio" name="q3"> Accept any number of keyword arguments as a dict</label>
            <label class="opt"><input type="radio" name="q3"> Unpack a list into separate arguments</label>
            <label class="opt"><input type="radio" name="q3"> Make the argument optional</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>*args</code> collects extra positional arguments into a tuple. Collecting keyword arguments into a dict is <code>**kwargs</code> — the two are frequently confused in questions.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 4 of 20</span><span>Data Structures</span></div>
          <div class="q-body">
            <p class="q-text">Which of the following is true about sets in Python?</p>
            <label class="opt"><input type="radio" name="q4"> They maintain insertion order</label>
            <label class="opt" data-correct><input type="radio" name="q4"> They contain only unique elements</label>
            <label class="opt"><input type="radio" name="q4"> They can be accessed using indexing</label>
            <label class="opt"><input type="radio" name="q4"> They allow duplicate items</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Sets in Python are unordered collections of unique elements. They do not allow duplicates and do not support indexing.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 5 of 20</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">What is the purpose of *args in a function definition?</p>
            <label class="opt" data-correct><input type="radio" name="q5"> To accept an arbitrary number of positional arguments</label>
            <label class="opt"><input type="radio" name="q5"> To accept keyword arguments</label>
            <label class="opt"><input type="radio" name="q5"> To pass a dictionary to the function</label>
            <label class="opt"><input type="radio" name="q5"> To unpack a list</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>*args</code> allows a function to accept a variable number of positional arguments, which are packed into a tuple.</div>
        </div>

        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 6 of 20</span><span>Lists</span></div>
          <div class="q-body">
            <p class="q-text">What is the output of &#96;[1, 2, 3] * 2&#96;?</p>
            <label class="opt"><input type="radio" name="q6"> &#96;[2, 4, 6]&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q6"> &#96;[1, 2, 3, 1, 2, 3]&#96;</label>
            <label class="opt"><input type="radio" name="q6"> TypeError</label>
            <label class="opt"><input type="radio" name="q6"> &#96;[1, 1, 2, 2, 3, 3]&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Multiplying a list by an integer repeats the elements.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 7 of 20</span><span>Dictionaries</span></div>
          <div class="q-body">
            <p class="q-text">How do you safely get a value from a dictionary without risking a KeyError?</p>
            <label class="opt"><input type="radio" name="q7"> &#96;my_dict['key']&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q7"> &#96;my_dict.get('key')&#96;</label>
            <label class="opt"><input type="radio" name="q7"> &#96;my_dict.fetch('key')&#96;</label>
            <label class="opt"><input type="radio" name="q7"> &#96;my_dict.has_key('key')&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;dict.get()&#96; returns None (or a specified default) if the key is missing.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 8 of 20</span><span>Strings</span></div>
          <div class="q-body">
            <p class="q-text">Which method is used to remove whitespace from both ends of a string?</p>
            <label class="opt"><input type="radio" name="q8"> &#96;trim()&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q8"> &#96;strip()&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;clean()&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;remove_space()&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;strip()&#96; removes leading and trailing characters (spaces by default).</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 9 of 20</span><span>Control Flow</span></div>
          <div class="q-body">
            <p class="q-text">What does the &#96;pass&#96; statement do?</p>
            <label class="opt"><input type="radio" name="q9"> Exits the current loop</label>
            <label class="opt"><input type="radio" name="q9"> Skips to the next iteration</label>
            <label class="opt" data-correct><input type="radio" name="q9"> Does nothing; it's a null operation</label>
            <label class="opt"><input type="radio" name="q9"> Returns None from a function</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;pass&#96; is a placeholder when a statement is syntactically required but no code needs to execute.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 10 of 20</span><span>List Comprehensions</span></div>
          <div class="q-body">
            <p class="q-text">Which comprehension creates a list of even numbers from 0 to 9?</p>
            <label class="opt" data-correct><input type="radio" name="q10"> &#96;[x for x in range(10) if x % 2 == 0]&#96;</label>
            <label class="opt"><input type="radio" name="q10"> &#96;[x if x % 2 == 0 for x in range(10)]&#96;</label>
            <label class="opt"><input type="radio" name="q10"> &#96;[even x in range(10)]&#96;</label>
            <label class="opt"><input type="radio" name="q10"> &#96;list(even for range(10))&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The &#96;if&#96; condition filters the elements produced by the &#96;for&#96; loop.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 11 of 20</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">What does &#96;**kwargs&#96; do in a function definition?</p>
            <label class="opt"><input type="radio" name="q11"> Accepts arbitrary positional arguments</label>
            <label class="opt" data-correct><input type="radio" name="q11"> Accepts arbitrary keyword arguments as a dictionary</label>
            <label class="opt"><input type="radio" name="q11"> Unpacks a tuple</label>
            <label class="opt"><input type="radio" name="q11"> Defines default arguments</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;**kwargs&#96; collects extra keyword arguments into a dictionary.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 12 of 20</span><span>Modules</span></div>
          <div class="q-body">
            <p class="q-text">How do you import only the &#96;pi&#96; constant from the &#96;math&#96; module?</p>
            <label class="opt"><input type="radio" name="q12"> &#96;import math.pi&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q12"> &#96;from math import pi&#96;</label>
            <label class="opt"><input type="radio" name="q12"> &#96;include pi from math&#96;</label>
            <label class="opt"><input type="radio" name="q12"> &#96;import pi&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The &#96;from module import name&#96; syntax imports a specific attribute.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 13 of 20</span><span>File I/O</span></div>
          <div class="q-body">
            <p class="q-text">What is the best practice for opening a file to ensure it gets closed automatically?</p>
            <label class="opt"><input type="radio" name="q13"> &#96;file = open('data.txt')&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q13"> &#96;with open('data.txt') as f:&#96;</label>
            <label class="opt"><input type="radio" name="q13"> &#96;open_and_close('data.txt')&#96;</label>
            <label class="opt"><input type="radio" name="q13"> &#96;file.read('data.txt')&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The &#96;with&#96; statement acts as a context manager, automatically closing the file even if exceptions occur.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 14 of 20</span><span>OOP</span></div>
          <div class="q-body">
            <p class="q-text">What is the purpose of the &#96;__init__&#96; method in a class?</p>
            <label class="opt"><input type="radio" name="q14"> To destroy an object</label>
            <label class="opt" data-correct><input type="radio" name="q14"> To initialize the object's state upon creation</label>
            <label class="opt"><input type="radio" name="q14"> To define static methods</label>
            <label class="opt"><input type="radio" name="q14"> To return a string representation of the object</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;__init__&#96; is the constructor method called when a new instance is created.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 15 of 20</span><span>Exceptions</span></div>
          <div class="q-body">
            <p class="q-text">Which block is executed regardless of whether an exception occurred?</p>
            <label class="opt"><input type="radio" name="q15"> &#96;except&#96;</label>
            <label class="opt"><input type="radio" name="q15"> &#96;else&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q15"> &#96;finally&#96;</label>
            <label class="opt"><input type="radio" name="q15"> &#96;catch&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The &#96;finally&#96; block is always executed, making it useful for cleanup tasks.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 16 of 20</span><span>Data Types</span></div>
          <div class="q-body">
            <p class="q-text">Which of the following is mutable?</p>
            <label class="opt"><input type="radio" name="q16"> Tuple</label>
            <label class="opt"><input type="radio" name="q16"> String</label>
            <label class="opt" data-correct><input type="radio" name="q16"> Set</label>
            <label class="opt"><input type="radio" name="q16"> Integer</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Sets are mutable collections, while tuples, strings, and integers are immutable.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 17 of 20</span><span>Iteration</span></div>
          <div class="q-body">
            <p class="q-text">What function is used to iterate over a sequence alongside an index?</p>
            <label class="opt"><input type="radio" name="q17"> &#96;zip()&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q17"> &#96;enumerate()&#96;</label>
            <label class="opt"><input type="radio" name="q17"> &#96;index_iter()&#96;</label>
            <label class="opt"><input type="radio" name="q17"> &#96;range()&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;enumerate()&#96; yields pairs containing a count (from zero) and a value yielded by the iterable argument.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 18 of 20</span><span>Scope</span></div>
          <div class="q-body">
            <p class="q-text">If a variable is defined inside a function, its scope is:</p>
            <label class="opt"><input type="radio" name="q18"> Global</label>
            <label class="opt" data-correct><input type="radio" name="q18"> Local</label>
            <label class="opt"><input type="radio" name="q18"> Nonlocal</label>
            <label class="opt"><input type="radio" name="q18"> Built-in</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Variables assigned within a function are local to that function unless declared otherwise.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 19 of 20</span><span>Virtual Environments</span></div>
          <div class="q-body">
            <p class="q-text">Why use a virtual environment?</p>
            <label class="opt"><input type="radio" name="q19"> To make Python run faster</label>
            <label class="opt" data-correct><input type="radio" name="q19"> To isolate project dependencies and avoid version conflicts</label>
            <label class="opt"><input type="radio" name="q19"> To compile Python to machine code</label>
            <label class="opt"><input type="radio" name="q19"> To run Python in a web browser</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Virtual environments keep packages separate for different projects.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 20 of 20</span><span>Formatting</span></div>
          <div class="q-body">
            <p class="q-text">What does the 'f' signify in &#96;f'Hello {name}'&#96;?</p>
            <label class="opt"><input type="radio" name="q20"> Float</label>
            <label class="opt" data-correct><input type="radio" name="q20"> Format (f-string)</label>
            <label class="opt"><input type="radio" name="q20"> Function</label>
            <label class="opt"><input type="radio" name="q20"> File</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> F-strings provide a concise, readable way to embed expressions inside string literals.</div>
        </div>` },
      { h: "Preparation tips", body: `
        <ul>
          <li>Run code snippets mentally — "what is the output?" is the classic question format</li>
          <li>Review the official Python tutorial's sections on data structures and exceptions</li>
          <li>Know the difference between <code>==</code> and <code>is</code> (<code>is</code> compares identity)</li>
          <li>Learn decorators well enough to read the <code>@wrapper</code> syntax and explain what it does</li>
        </ul>` }
    ]
  },
  {
    slug: "javascript-study-guide",
    title: "JavaScript Fundamentals: Key Concepts Explained",
    category: "JavaScript",
    icon: "JS",
    gradient: "linear-gradient(135deg,#8a5a0b,#c98a12)",
    date: "Aug 28, 2026",
    readTime: "8 min read",
    excerpt: "Hoisting, closures, == vs ===, arrow functions, and promises — the JavaScript fundamentals behind most interview and skills-test questions.",
    intro: "JavaScript interviews and skills tests lean heavily on language fundamentals. Questions about output, scope, and type coercion are common — framework knowledge matters far less.",
    sections: [
      { h: "Core topics to know", body: `
        <ul>
          <li><b>var vs let vs const</b> — scoping, hoisting, and the temporal dead zone</li>
          <li><b>Type coercion</b> — <code>==</code> vs <code>===</code>, truthy/falsy values</li>
          <li><b>Closures</b> — what they are and how they capture variables</li>
          <li><b>Arrow functions</b> — lexical <code>this</code> (no own <code>this</code> binding)</li>
          <li><b>Promises &amp; async/await</b> — order of execution, <code>.then()</code> chaining</li>
          <li><b>Array methods</b> — <code>map</code>, <code>filter</code>, <code>reduce</code>, <code>find</code>, and what each returns</li>
          <li><b>Objects</b> — destructuring, spread, <code>this</code> in methods</li>
        </ul>` },
      { h: "Truthy and falsy values", body: `
        <p>Memorize the falsy values — everything else is truthy:</p>
        <pre><code>false, 0, -0, 0n, "", null, undefined, NaN</code></pre>
        <p>Tricky truthy values: <code>"0"</code>, <code>"false"</code> (non-empty strings), <code>[]</code> and <code>{}</code> (empty objects are truthy!).</p>
        <div class="callout"><b>Classic trap</b> <code>[] == false</code> is <b>true</b> (array coerces to empty string, which coerces to 0), but <code>[] ? "yes" : "no"</code> is <b>"yes"</b> because <code>[]</code> is truthy in a boolean context.</div>` },
      { h: "Async execution order", body: `
        <p>Expect questions like "what order do these logs appear?" Remember: synchronous code first, then microtasks (promises), then macrotasks (<code>setTimeout</code>):</p>
        <pre><code>console.log("1");
setTimeout(() => console.log("2"));
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2</code></pre>` },
            { h: "Practical learning exercises", body: `
        <ul>
          <li><b>Exercise 1 (DOM & Events):</b> Create a simple HTML page with a button and a list. Write a JS script that adds a new list item with the current timestamp every time the button is clicked.</li>
          <li><b>Exercise 2 (Async/Await):</b> Use the fetch API to retrieve data from a public API (like JSONPlaceholder). Parse the JSON and render the titles of the first 5 posts onto the page, handling network errors with try/catch.</li>
          <li><b>Exercise 3 (Array Methods):</b> Take an array of product objects (with name, price, and category). Chain .filter() to get only 'electronics', then .map() to extract their names, then .join() to create a comma-separated string.</li>
        </ul>` },
{ h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 20</span><span>Types</span></div>
          <div class="q-body">
            <p class="q-text">What is the result of <code>typeof null</code>?</p>
            <label class="opt"><input type="radio" name="q1"> "null"</label>
            <label class="opt" data-correct><input type="radio" name="q1"> "object"</label>
            <label class="opt"><input type="radio" name="q1"> "undefined"</label>
            <label class="opt"><input type="radio" name="q1"> Throws a TypeError</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A bug preserved since JavaScript's first version — <code>typeof null</code> returns <code>"object"</code>. To check for null, use <code>value === null</code>.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 2 of 20</span><span>Array Methods</span></div>
          <div class="q-body">
            <p class="q-text">Which method returns a new array containing only elements for which a callback returns true?</p>
            <label class="opt"><input type="radio" name="q2"> map</label>
            <label class="opt"><input type="radio" name="q2"> forEach</label>
            <label class="opt"><input type="radio" name="q2"> find</label>
            <label class="opt" data-correct><input type="radio" name="q2"> filter</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>filter</code> returns a new array of all matching elements. <code>find</code> returns only the first match (a single value), <code>map</code> transforms every element, and <code>forEach</code> returns undefined.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 3 of 20</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">What makes arrow functions different from regular functions regarding <code>this</code>?</p>
            <label class="opt"><input type="radio" name="q3"> They bind this to the window object</label>
            <label class="opt" data-correct><input type="radio" name="q3"> They inherit this from the surrounding (lexical) scope</label>
            <label class="opt"><input type="radio" name="q3"> They create a new this like regular functions</label>
            <label class="opt"><input type="radio" name="q3"> They cannot use this at all</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Arrow functions have no own <code>this</code> — they capture it lexically from the enclosing context, which is exactly why they're preferred for callbacks and event handlers inside classes and methods.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 4 of 20</span><span>Arrays</span></div>
          <div class="q-body">
            <p class="q-text">Which array method creates a new array with the results of calling a function on every element?</p>
            <label class="opt"><input type="radio" name="q4"> filter()</label>
            <label class="opt"><input type="radio" name="q4"> forEach()</label>
            <label class="opt" data-correct><input type="radio" name="q4"> map()</label>
            <label class="opt"><input type="radio" name="q4"> reduce()</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>map()</code> creates a new array populated with the results of calling a provided function on every element in the calling array.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 5 of 20</span><span>Promises</span></div>
          <div class="q-body">
            <p class="q-text">What does Promise.all() do?</p>
            <label class="opt"><input type="radio" name="q5"> Resolves when the first promise resolves</label>
            <label class="opt" data-correct><input type="radio" name="q5"> Resolves when all promises resolve, or rejects if any promise rejects</label>
            <label class="opt"><input type="radio" name="q5"> Rejects only if all promises reject</label>
            <label class="opt"><input type="radio" name="q5"> Resolves arrays immediately</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>Promise.all()</code> takes an iterable of promises and returns a single Promise that resolves when all of the promises resolve, or rejects with the reason of the first promise that rejects.</div>
        </div>

        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 6 of 20</span><span>DOM</span></div>
          <div class="q-body">
            <p class="q-text">Which method is best for selecting a single element by its class name?</p>
            <label class="opt"><input type="radio" name="q6"> &#96;document.getElementsByClassName()&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q6"> &#96;document.querySelector()&#96;</label>
            <label class="opt"><input type="radio" name="q6"> &#96;document.querySelectorAll()&#96;</label>
            <label class="opt"><input type="radio" name="q6"> &#96;document.getElementById()&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;querySelector&#96; returns the first element that matches the CSS selector.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 7 of 20</span><span>Events</span></div>
          <div class="q-body">
            <p class="q-text">What is event delegation?</p>
            <label class="opt"><input type="radio" name="q7"> Removing event listeners to save memory</label>
            <label class="opt" data-correct><input type="radio" name="q7"> Attaching a single event listener to a parent element to manage events for its children</label>
            <label class="opt"><input type="radio" name="q7"> Preventing the default action of an event</label>
            <label class="opt"><input type="radio" name="q7"> Dispatching custom events</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Delegation takes advantage of event bubbling to handle events on dynamic child elements efficiently.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 8 of 20</span><span>Promises</span></div>
          <div class="q-body">
            <p class="q-text">What is an executing equivalent of &#96;Promise.resolve(5)&#96; using an immediately invoked async function expression (IIFE)?</p>
            <label class="opt" data-correct><input type="radio" name="q8"> &#96;(async () =&gt; 5)()&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;async function() { return 5; }&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;await 5&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;function() { await 5; }()&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> An executing &#96;async&#96; function implicitly wraps its return value in a Promise, immediately producing a resolved Promise of 5. Simply defining the function (without calling it) only creates a function reference. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve" target="_blank" rel="noopener">MDN Web Docs</a></div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 9 of 20</span><span>Scope</span></div>
          <div class="q-body">
            <p class="q-text">What is the difference between &#96;let&#96; and &#96;var&#96;?</p>
            <label class="opt"><input type="radio" name="q9"> &#96;var&#96; is block-scoped, &#96;let&#96; is function-scoped</label>
            <label class="opt" data-correct><input type="radio" name="q9"> &#96;let&#96; is block-scoped, &#96;var&#96; is function-scoped</label>
            <label class="opt"><input type="radio" name="q9"> They are identical</label>
            <label class="opt"><input type="radio" name="q9"> &#96;let&#96; cannot be reassigned</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;let&#96; respects block scope (like inside an if statement), while &#96;var&#96; is hoisted to the function scope.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 10 of 20</span><span>Arrays</span></div>
          <div class="q-body">
            <p class="q-text">Which array method adds an element to the beginning of an array?</p>
            <label class="opt"><input type="radio" name="q10"> &#96;push()&#96;</label>
            <label class="opt"><input type="radio" name="q10"> &#96;pop()&#96;</label>
            <label class="opt"><input type="radio" name="q10"> &#96;shift()&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q10"> &#96;unshift()&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;unshift()&#96; adds to the front, &#96;push()&#96; adds to the end.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 11 of 20</span><span>Types</span></div>
          <div class="q-body">
            <p class="q-text">What does &#96;typeof null&#96; evaluate to?</p>
            <label class="opt"><input type="radio" name="q11"> &#96;"null"&#96;</label>
            <label class="opt"><input type="radio" name="q11"> &#96;"undefined"&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q11"> &#96;"object"&#96;</label>
            <label class="opt"><input type="radio" name="q11"> &#96;"number"&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Due to a historical bug in JavaScript, &#96;typeof null&#96; returns &#96;"object"&#96;.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 12 of 20</span><span>Equality</span></div>
          <div class="q-body">
            <p class="q-text">Why is &#96;==&#96; generally avoided in favor of &#96;===&#96;?</p>
            <label class="opt"><input type="radio" name="q12"> &#96;===&#96; is faster</label>
            <label class="opt" data-correct><input type="radio" name="q12"> &#96;==&#96; performs type coercion, which can lead to unexpected results</label>
            <label class="opt"><input type="radio" name="q12"> &#96;===&#96; works with objects</label>
            <label class="opt"><input type="radio" name="q12"> &#96;==&#96; is deprecated</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;===&#96; checks both value and type, preventing confusing coercions like &#96;0 == false&#96; (which is true).</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 13 of 20</span><span>Objects</span></div>
          <div class="q-body">
            <p class="q-text">How do you extract the 'name' property from an object &#96;user&#96; into a variable?</p>
            <label class="opt" data-correct><input type="radio" name="q13"> &#96;let { name } = user;&#96;</label>
            <label class="opt"><input type="radio" name="q13"> &#96;let name = user[name];&#96;</label>
            <label class="opt"><input type="radio" name="q13"> &#96;let { user.name };&#96;</label>
            <label class="opt"><input type="radio" name="q13"> &#96;const name = destructure(user);&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> This is object destructuring syntax.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 14 of 20</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">How does the &#96;this&#96; keyword behave in an arrow function?</p>
            <label class="opt"><input type="radio" name="q14"> It refers to the window object</label>
            <label class="opt"><input type="radio" name="q14"> It binds to the element that fired the event</label>
            <label class="opt" data-correct><input type="radio" name="q14"> It inherits &#96;this&#96; from the enclosing lexical context</label>
            <label class="opt"><input type="radio" name="q14"> It is undefined</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Arrow functions do not have their own &#96;this&#96; context; they capture it from the surrounding scope.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 15 of 20</span><span>Async</span></div>
          <div class="q-body">
            <p class="q-text">What happens if a &#96;fetch()&#96; request encounters an HTTP 404 error?</p>
            <label class="opt"><input type="radio" name="q15"> The promise rejects immediately</label>
            <label class="opt" data-correct><input type="radio" name="q15"> The promise resolves normally, but &#96;response.ok&#96; is false</label>
            <label class="opt"><input type="radio" name="q15"> An exception is thrown</label>
            <label class="opt"><input type="radio" name="q15"> It automatically retries</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;fetch&#96; only rejects on network failure. HTTP errors (404, 500) resolve normally, so you must check &#96;response.ok&#96;.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 16 of 20</span><span>Modules</span></div>
          <div class="q-body">
            <p class="q-text">How do you export a function as the default export of a module?</p>
            <label class="opt" data-correct><input type="radio" name="q16"> &#96;export default function myFunc() {}&#96;</label>
            <label class="opt"><input type="radio" name="q16"> &#96;module.exports = myFunc;&#96;</label>
            <label class="opt"><input type="radio" name="q16"> &#96;export myFunc;&#96;</label>
            <label class="opt"><input type="radio" name="q16"> &#96;default export myFunc;&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> ES6 modules use the &#96;export default&#96; syntax.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 17 of 20</span><span>Storage</span></div>
          <div class="q-body">
            <p class="q-text">Which storage mechanism is cleared when the page session ends?</p>
            <label class="opt"><input type="radio" name="q17"> localStorage</label>
            <label class="opt" data-correct><input type="radio" name="q17"> sessionStorage</label>
            <label class="opt"><input type="radio" name="q17"> Cookies</label>
            <label class="opt"><input type="radio" name="q17"> IndexedDB</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> sessionStorage data is available only for the duration of the page session.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 18 of 20</span><span>JSON</span></div>
          <div class="q-body">
            <p class="q-text">Which method converts a JS object into a JSON string?</p>
            <label class="opt"><input type="radio" name="q18"> &#96;JSON.parse()&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q18"> &#96;JSON.stringify()&#96;</label>
            <label class="opt"><input type="radio" name="q18"> &#96;Object.toString()&#96;</label>
            <label class="opt"><input type="radio" name="q18"> &#96;JSON.serialize()&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;JSON.stringify()&#96; serializes objects to JSON.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 19 of 20</span><span>Classes</span></div>
          <div class="q-body">
            <p class="q-text">How do you call the constructor of a parent class from a subclass?</p>
            <label class="opt" data-correct><input type="radio" name="q19"> &#96;super()&#96;</label>
            <label class="opt"><input type="radio" name="q19"> &#96;parent()&#96;</label>
            <label class="opt"><input type="radio" name="q19"> &#96;this.super()&#96;</label>
            <label class="opt"><input type="radio" name="q19"> &#96;Base()&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The &#96;super()&#96; function calls the parent class constructor.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 20 of 20</span><span>Events</span></div>
          <div class="q-body">
            <p class="q-text">What does &#96;event.preventDefault()&#96; do?</p>
            <label class="opt"><input type="radio" name="q20"> Stops event bubbling</label>
            <label class="opt" data-correct><input type="radio" name="q20"> Prevents the browser's default behavior for that event (e.g., submitting a form)</label>
            <label class="opt"><input type="radio" name="q20"> Removes the event listener</label>
            <label class="opt"><input type="radio" name="q20"> Refreshes the page</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> It stops the default action, like preventing a link from navigating or a form from submitting.</div>
        </div>` },
      { h: "Last-minute tips", body: `
        <ul>
          <li>Practice reading short code snippets and predicting output — that is most of the exam</li>
          <li>Review <code>map</code> vs <code>forEach</code> vs <code>reduce</code> until you can say what each returns without looking</li>
          <li>Understand closure examples like a counter function</li>
          <li>Run every snippet in your browser console to check your prediction</li>
        </ul>` }
    ]
  },
  {
    slug: "project-management-study-guide",
    title: "Project Management Study Guide: Concepts That Matter",
    category: "Project Management",
    icon: "PM",
    gradient: "linear-gradient(135deg,#6b46c1,#9f7aea)",
    date: "Aug 22, 2026",
    readTime: "7 min read",
    excerpt: "Agile vs Waterfall, the Iron Triangle, RACI matrices, and risk management — the core project management concepts, with practice questions.",
    intro: "Project management interviews and skills tests mix methodology knowledge with scenario judgment. Unlike coding topics, many answers hinge on choosing the best-practice response rather than a strictly right one.",
    sections: [
      { h: "Methodology knowledge", body: `
        <p>Be crystal clear on the differences:</p>
        <table>
          <tr><th>Aspect</th><th>Agile/Scrum</th><th>Waterfall</th></tr>
          <tr><td>Planning</td><td>Incremental, per sprint</td><td>Upfront, comprehensive</td></tr>
          <tr><td>Requirements</td><td>Expected to evolve</td><td>Fixed at start</td></tr>
          <tr><td>Delivery</td><td>Working increments early</td><td>Final product at end</td></tr>
          <tr><td>Best for</td><td>Uncertain/changing scope</td><td>Stable, regulated scope</td></tr>
        </table>
        <p>Know Scrum roles: <b>Product Owner</b> (prioritizes backlog), <b>Scrum Master</b> (removes impediments, facilitates), and the <b>Developers</b> (self-managing; older editions of the Scrum Guide called them the Development Team).</p>` },
      { h: "Key frameworks to recognize", body: `
        <ul>
          <li><b>Iron Triangle</b> — Scope, Time, Cost (with Quality in the center). Changing one affects the others.</li>
          <li><b>RACI matrix</b> — Responsible, Accountable, Consulted, Informed. Exactly one A per task.</li>
          <li><b>Critical Path</b> — the longest sequence of dependent tasks; it determines the project's minimum duration.</li>
          <li><b>Risk matrix</b> — Probability × Impact. High/high risks get mitigation plans.</li>
          <li><b>Triple constraint trade-offs</b> — scenario: deadline moved up → cut scope or add resources.</li>
        </ul>` },
      { h: "Scenario question strategy", body: `
        <p>Many scenario questions describe a project problem and ask what the PM should do first. Best-practice answers usually follow this order:</p>
        <ol>
          <li><b>Analyze/assess</b> the situation (gather facts, check impact)</li>
          <li><b>Communicate</b> with stakeholders</li>
          <li><b>Then</b> act (escalate, change plan, add resources)</li>
        </ol>
        <div class="callout"><b>Pattern</b> Answers that immediately escalate to management or blame team members are rarely the best first step. Answers starting with analysis or communication are usually the better choice.</div>` },
            { h: "Practical learning exercises", body: `
        <ul>
          <li><b>Exercise 1 (Agile Planning):</b> Write a user story for a login feature using the format: "As a [type of user], I want [an action] so that [a benefit/value]." Define 3 acceptance criteria for it.</li>
          <li><b>Exercise 2 (Risk Management):</b> Create a basic Risk Register for a hypothetical website launch. Identify 3 risks, assign them probability and impact scores (1-5), and propose a mitigation strategy for the highest-scoring risk.</li>
          <li><b>Exercise 3 (Scheduling):</b> Draw a simple network diagram for a 5-task project. Identify the critical path (the longest path through the network).</li>
        </ul>` },
{ h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 20</span><span>Frameworks</span></div>
          <div class="q-body">
            <p class="q-text">In a RACI matrix, how many people should be Accountable for a single task?</p>
            <label class="opt"><input type="radio" name="q1"> As many as needed</label>
            <label class="opt" data-correct><input type="radio" name="q1"> Exactly one</label>
            <label class="opt"><input type="radio" name="q1"> At least two for backup</label>
            <label class="opt"><input type="radio" name="q1"> One per department involved</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> "Accountable" means owns the outcome. With multiple A's, responsibility diffuses — the core principle of RACI is single accountability per task.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 2 of 20</span><span>Agile</span></div>
          <div class="q-body">
            <p class="q-text">Who is responsible for prioritizing the product backlog in Scrum?</p>
            <label class="opt"><input type="radio" name="q2"> Scrum Master</label>
            <label class="opt" data-correct><input type="radio" name="q2"> Product Owner</label>
            <label class="opt"><input type="radio" name="q2"> Developers</label>
            <label class="opt"><input type="radio" name="q2"> Project Sponsor</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The Product Owner owns the backlog and its ordering by business value. The Scrum Master facilitates the process but doesn't prioritize, and the Developers decide how much work to pull into a sprint.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 3 of 20</span><span>Scheduling</span></div>
          <div class="q-body">
            <p class="q-text">What does the critical path of a project determine?</p>
            <label class="opt"><input type="radio" name="q3"> The tasks with the highest cost</label>
            <label class="opt"><input type="radio" name="q3"> The tasks assigned to senior staff</label>
            <label class="opt" data-correct><input type="radio" name="q3"> The shortest possible project duration</label>
            <label class="opt"><input type="radio" name="q3"> The order of stakeholder reviews</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The critical path is the longest chain of dependent tasks with zero slack. Any delay on it delays the whole project — hence it sets the minimum timeline.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 4 of 20</span><span>Agile</span></div>
          <div class="q-body">
            <p class="q-text">In Scrum, what is the purpose of the Daily Standup?</p>
            <label class="opt"><input type="radio" name="q4"> To assign tasks to team members</label>
            <label class="opt" data-correct><input type="radio" name="q4"> To synchronize activities and plan for the next 24 hours</label>
            <label class="opt"><input type="radio" name="q4"> To update the product backlog</label>
            <label class="opt"><input type="radio" name="q4"> To demonstrate the product to stakeholders</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The Daily Scrum is a 15-minute event to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary, adjusting the upcoming planned work.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 5 of 20</span><span>Risk Management</span></div>
          <div class="q-body">
            <p class="q-text">What is a risk register?</p>
            <label class="opt"><input type="radio" name="q5"> A list of project stakeholders</label>
            <label class="opt"><input type="radio" name="q5"> The project budget document</label>
            <label class="opt" data-correct><input type="radio" name="q5"> A document containing the results of qualitative and quantitative risk analysis and risk response planning</label>
            <label class="opt"><input type="radio" name="q5"> A list of completed tasks</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A risk register is a repository in which outputs of risk management processes are recorded, detailing all identified risks, their probability, impact, and planned responses.</div>
        </div>

        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 6 of 20</span><span>Agile</span></div>
          <div class="q-body">
            <p class="q-text">In Scrum, who is responsible for maximizing the value of the product?</p>
            <label class="opt"><input type="radio" name="q6"> The Scrum Master</label>
            <label class="opt"><input type="radio" name="q6"> The Development Team</label>
            <label class="opt" data-correct><input type="radio" name="q6"> The Product Owner</label>
            <label class="opt"><input type="radio" name="q6"> The Project Sponsor</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The Product Owner manages the backlog to ensure the team builds the most valuable features.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 7 of 20</span><span>Scope</span></div>
          <div class="q-body">
            <p class="q-text">What is scope creep?</p>
            <label class="opt"><input type="radio" name="q7"> A progressive reduction in project budget</label>
            <label class="opt" data-correct><input type="radio" name="q7"> The uncontrolled expansion of product or project scope without adjustments to time, cost, and resources</label>
            <label class="opt"><input type="radio" name="q7"> A technique for gradual project delivery</label>
            <label class="opt"><input type="radio" name="q7"> A pest control issue on site</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Scope creep happens when features are added without formal approval or adjustments to the plan.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 8 of 20</span><span>Scheduling</span></div>
          <div class="q-body">
            <p class="q-text">What does the Critical Path represent?</p>
            <label class="opt"><input type="radio" name="q8"> The path with the highest risk</label>
            <label class="opt"><input type="radio" name="q8"> The shortest path through the project</label>
            <label class="opt" data-correct><input type="radio" name="q8"> The longest sequence of dependent activities, determining the shortest possible project duration</label>
            <label class="opt"><input type="radio" name="q8"> The path requiring the most budget</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A delay in any task on the critical path delays the entire project.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 9 of 20</span><span>Risk</span></div>
          <div class="q-body">
            <p class="q-text">Which risk response strategy involves shifting the impact of a threat to a third party?</p>
            <label class="opt"><input type="radio" name="q9"> Avoid</label>
            <label class="opt"><input type="radio" name="q9"> Mitigate</label>
            <label class="opt" data-correct><input type="radio" name="q9"> Transfer</label>
            <label class="opt"><input type="radio" name="q9"> Accept</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Transferring risk often involves insurance, warranties, or outsourcing to a third party.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 10 of 20</span><span>Stakeholders</span></div>
          <div class="q-body">
            <p class="q-text">Why is a stakeholder register important?</p>
            <label class="opt"><input type="radio" name="q10"> To track team member vacation days</label>
            <label class="opt" data-correct><input type="radio" name="q10"> To identify and analyze individuals who can affect or are affected by the project</label>
            <label class="opt"><input type="radio" name="q10"> To calculate project ROI</label>
            <label class="opt"><input type="radio" name="q10"> To schedule server maintenance</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> It helps in understanding stakeholder interests and developing communication strategies.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 11 of 20</span><span>Communication</span></div>
          <div class="q-body">
            <p class="q-text">If a project has 5 stakeholders, how many communication channels exist?</p>
            <label class="opt"><input type="radio" name="q11"> 5</label>
            <label class="opt" data-correct><input type="radio" name="q11"> 10</label>
            <label class="opt"><input type="radio" name="q11"> 15</label>
            <label class="opt"><input type="radio" name="q11"> 25</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> 5 * (5 - 1) / 2 = 10 channels. Complexity grows rapidly with more people.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 12 of 20</span><span>Agile</span></div>
          <div class="q-body">
            <p class="q-text">What is the purpose of the Daily Scrum (Stand-up)?</p>
            <label class="opt"><input type="radio" name="q12"> To provide status updates to management</label>
            <label class="opt"><input type="radio" name="q12"> To plan the entire sprint</label>
            <label class="opt" data-correct><input type="radio" name="q12"> To inspect progress toward the Sprint Goal and adapt the backlog</label>
            <label class="opt"><input type="radio" name="q12"> To assign tasks for the week</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> It's a quick daily sync for the developers to align and plan the next 24 hours.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 13 of 20</span><span>Cost</span></div>
          <div class="q-body">
            <p class="q-text">What does a Cost Performance Index (CPI) of 0.8 indicate?</p>
            <label class="opt"><input type="radio" name="q13"> The project is 20% under budget</label>
            <label class="opt" data-correct><input type="radio" name="q13"> The project is over budget (getting 80 cents of value for every dollar spent)</label>
            <label class="opt"><input type="radio" name="q13"> The project is ahead of schedule</label>
            <label class="opt"><input type="radio" name="q13"> The project budget is perfectly balanced</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A CPI less than 1.0 indicates a cost overrun for work completed.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 14 of 20</span><span>Quality</span></div>
          <div class="q-body">
            <p class="q-text">What is the difference between Quality Assurance (QA) and Quality Control (QC)?</p>
            <label class="opt" data-correct><input type="radio" name="q14"> QA is process-focused (preventing defects), QC is product-focused (finding defects)</label>
            <label class="opt"><input type="radio" name="q14"> They are identical terms</label>
            <label class="opt"><input type="radio" name="q14"> QA happens after the project, QC happens before</label>
            <label class="opt"><input type="radio" name="q14"> QA is for software, QC is for manufacturing</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> QA ensures the right processes are followed; QC inspects the final output.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 15 of 20</span><span>Integration</span></div>
          <div class="q-body">
            <p class="q-text">What document formally authorizes the existence of a project?</p>
            <label class="opt"><input type="radio" name="q15"> Project Management Plan</label>
            <label class="opt" data-correct><input type="radio" name="q15"> Project Charter</label>
            <label class="opt"><input type="radio" name="q15"> Business Case</label>
            <label class="opt"><input type="radio" name="q15"> Statement of Work</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The Project Charter is signed by the sponsor and gives the PM authority.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 16 of 20</span><span>Agile</span></div>
          <div class="q-body">
            <p class="q-text">In Kanban, what is the primary purpose of WIP (Work in Progress) limits?</p>
            <label class="opt"><input type="radio" name="q16"> To prevent developers from working too fast</label>
            <label class="opt" data-correct><input type="radio" name="q16"> To identify bottlenecks and improve flow by not overloading the system</label>
            <label class="opt"><input type="radio" name="q16"> To track how much budget is left</label>
            <label class="opt"><input type="radio" name="q16"> To ensure every column has the same number of tasks</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> WIP limits force the team to finish existing work before starting new work, smoothing flow.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 17 of 20</span><span>Procurement</span></div>
          <div class="q-body">
            <p class="q-text">Which contract type carries the most financial risk for the buyer?</p>
            <label class="opt"><input type="radio" name="q17"> Fixed Price (FP)</label>
            <label class="opt"><input type="radio" name="q17"> Time and Materials (T&M)</label>
            <label class="opt" data-correct><input type="radio" name="q17"> Cost Reimbursable (CR)</label>
            <label class="opt"><input type="radio" name="q17"> Purchase Order</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> In Cost Reimbursable, the buyer pays all actual costs plus a fee, bearing the risk of overruns.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 18 of 20</span><span>Closing</span></div>
          <div class="q-body">
            <p class="q-text">What is a key activity during the closing phase of a project?</p>
            <label class="opt"><input type="radio" name="q18"> Writing the Project Charter</label>
            <label class="opt" data-correct><input type="radio" name="q18"> Gathering Lessons Learned</label>
            <label class="opt"><input type="radio" name="q18"> Developing the schedule</label>
            <label class="opt"><input type="radio" name="q18"> Executing risk responses</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Capturing lessons learned ensures future projects benefit from past experiences.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 19 of 20</span><span>Estimation</span></div>
          <div class="q-body">
            <p class="q-text">What is Three-Point Estimating?</p>
            <label class="opt"><input type="radio" name="q19"> Averaging the estimates of three different people</label>
            <label class="opt" data-correct><input type="radio" name="q19"> Using Optimistic, Pessimistic, and Most Likely estimates to calculate an average</label>
            <label class="opt"><input type="radio" name="q19"> Estimating cost, time, and scope simultaneously</label>
            <label class="opt"><input type="radio" name="q19"> A technique used only in Agile</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> It accounts for uncertainty by looking at best, worst, and most probable scenarios.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 20 of 20</span><span>Agile</span></div>
          <div class="q-body">
            <p class="q-text">What is a Sprint Retrospective?</p>
            <label class="opt"><input type="radio" name="q20"> A review of the product with the customer</label>
            <label class="opt"><input type="radio" name="q20"> A meeting to plan the next sprint</label>
            <label class="opt" data-correct><input type="radio" name="q20"> A meeting for the Scrum Team to inspect itself and plan improvements for the next sprint</label>
            <label class="opt"><input type="radio" name="q20"> A demonstration of working software</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The retro focuses on process improvement, not product demonstration.</div>
        </div>` },
      { h: "Final tips", body: `
        <ul>
          <li>If you have studied for PMP or CAPM, much of this will feel familiar — it covers similar ground</li>
          <li>Focus on "what should the PM do FIRST" patterns</li>
          <li>Brush up on the Scrum events: Sprint Planning, Daily Scrum (the standup), Sprint Review and Sprint Retrospective</li>
        </ul>` }
    ]
  },
  {
    slug: "sql-study-guide",
    title: "SQL Study Guide: Queries You Should Master",
    category: "SQL",
    icon: "SQ",
    gradient: "linear-gradient(135deg,#2c5282,#4299e1)",
    date: "Aug 15, 2026",
    readTime: "8 min read",
    excerpt: "JOINs, GROUP BY, window functions, and subqueries — the SQL patterns behind most interview and skills-test questions, explained with examples.",
    intro: "SQL interviews and skills tests often ask you to read and reason about queries more than to write them from scratch. JOIN types, aggregation, and the difference between WHERE and HAVING come up constantly.",
    sections: [
      { h: "Must-know query patterns", body: `
        <ul>
          <li><b>JOIN types</b> — INNER, LEFT, RIGHT, FULL OUTER, and CROSS — and which rows survive each</li>
          <li><b>Aggregation</b> — <code>GROUP BY</code> with <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MAX</code>, <code>MIN</code></li>
          <li><b>WHERE vs HAVING</b> — filter rows before grouping vs filter groups after</li>
          <li><b>Subqueries</b> — in <code>WHERE</code>, <code>FROM</code>, and <code>SELECT</code></li>
          <li><b>Window functions</b> — <code>ROW_NUMBER()</code>, <code>RANK()</code>, <code>OVER (PARTITION BY ...)</code></li>
          <li><b>Indexes</b> — what they speed up and their cost on writes</li>
        </ul>` },
      { h: "WHERE vs HAVING — the classic trap", body: `
        <pre><code>SELECT department, AVG(salary)
FROM employees
WHERE status = 'active'      -- filters ROWS first
GROUP BY department
HAVING AVG(salary) > 50000;  -- filters GROUPS after</code></pre>
        <p>You cannot use an aggregate in <code>WHERE</code> — the aggregate doesn't exist yet when WHERE runs. Interviewers love testing this.</p>
        <div class="callout"><b>Memory trick</b> WHERE = filter rows → then GROUP → then HAVING = filter groups.</div>` },
      { h: "JOIN types at a glance", body: `
        <p>Given tables <code>customers</code> and <code>orders</code>:</p>
        <ul>
          <li><b>INNER JOIN</b> — only customers who have orders</li>
          <li><b>LEFT JOIN</b> — all customers, with NULLs where no order exists (find customers who never ordered: <code>WHERE o.id IS NULL</code>)</li>
          <li><b>FULL OUTER</b> — everyone from both sides, NULLs filling gaps (not supported in MySQL)</li>
        </ul>
        <p>A common question asks "return all rows from one table whether or not there's a match" — the answer is LEFT (or RIGHT) JOIN.</p>` },
            { h: "Practical learning exercises", body: `
        <ul>
          <li><b>Exercise 1 (Joins):</b> Write a query to join a Customers table and an Orders table. Return all customers, including those who haven't placed an order (using a LEFT JOIN), and handle NULLs with the COALESCE function.</li>
          <li><b>Exercise 2 (Aggregations):</b> Group an Employees table by Department and use aggregate functions to find the average salary and the total number of employees per department. Filter out departments with fewer than 5 employees using the HAVING clause.</li>
          <li><b>Exercise 3 (Window Functions):</b> Write a query using ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) to find the highest-paid employee in each department.</li>
        </ul>` },
{ h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 20</span><span>Aggregation</span></div>
          <div class="q-body">
            <p class="q-text">You want to list only departments whose average salary exceeds 60,000. Which clause filters this correctly?</p>
            <label class="opt"><input type="radio" name="q1"> WHERE AVG(salary) &gt; 60000</label>
            <label class="opt" data-correct><input type="radio" name="q1"> HAVING AVG(salary) &gt; 60000</label>
            <label class="opt"><input type="radio" name="q1"> FILTER AVG(salary) &gt; 60000</label>
            <label class="opt"><input type="radio" name="q1"> GROUP BY avg_salary &gt; 60000</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Aggregates are computed during grouping, so they can only be filtered with HAVING after GROUP BY. WHERE runs before grouping and can't reference aggregates.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 2 of 20</span><span>JOINs</span></div>
          <div class="q-body">
            <p class="q-text">Which join returns ALL rows from the left table, with NULLs where there is no match on the right?</p>
            <label class="opt"><input type="radio" name="q2"> INNER JOIN</label>
            <label class="opt" data-correct><input type="radio" name="q2"> LEFT JOIN</label>
            <label class="opt"><input type="radio" name="q2"> CROSS JOIN</label>
            <label class="opt"><input type="radio" name="q2"> SELF JOIN</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> LEFT JOIN preserves every row from the left side regardless of matches. INNER drops non-matching rows from both sides; CROSS returns the Cartesian product.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 3 of 20</span><span>Window Functions</span></div>
          <div class="q-body">
            <p class="q-text">To number rows within each department by salary (highest first), you would use:</p>
            <label class="opt"><input type="radio" name="q3"> GROUP BY department ORDER BY salary DESC</label>
            <label class="opt" data-correct><input type="radio" name="q3"> ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC)</label>
            <label class="opt"><input type="radio" name="q3"> RANK() OVER (ORDER BY salary DESC)</label>
            <label class="opt"><input type="radio" name="q3"> COUNT(*) OVER (PARTITION BY department)</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>PARTITION BY department</code> restarts numbering per department, and <code>ORDER BY salary DESC</code> puts the highest first. Plain GROUP BY would collapse rows and couldn't produce per-row numbers.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 4 of 20</span><span>Aggregation</span></div>
          <div class="q-body">
            <p class="q-text">Which clause is used to filter the results of aggregate functions?</p>
            <label class="opt"><input type="radio" name="q4"> WHERE</label>
            <label class="opt"><input type="radio" name="q4"> ORDER BY</label>
            <label class="opt" data-correct><input type="radio" name="q4"> HAVING</label>
            <label class="opt"><input type="radio" name="q4"> GROUP BY</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The <code>HAVING</code> clause was added to SQL because the <code>WHERE</code> keyword cannot be used with aggregate functions.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 5 of 20</span><span>Subqueries</span></div>
          <div class="q-body">
            <p class="q-text">What is a correlated subquery?</p>
            <label class="opt"><input type="radio" name="q5"> A query that returns multiple columns</label>
            <label class="opt" data-correct><input type="radio" name="q5"> A subquery that uses values from the outer query</label>
            <label class="opt"><input type="radio" name="q5"> A query joining three or more tables</label>
            <label class="opt"><input type="radio" name="q5"> A subquery in the FROM clause</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A correlated subquery evaluates once for each row processed by the outer query, as it references columns from the outer query.</div>
        </div>

        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 6 of 20</span><span>Filtering</span></div>
          <div class="q-body">
            <p class="q-text">Which clause is used to filter the results of an aggregate function like SUM or COUNT?</p>
            <label class="opt"><input type="radio" name="q6"> WHERE</label>
            <label class="opt" data-correct><input type="radio" name="q6"> HAVING</label>
            <label class="opt"><input type="radio" name="q6"> FILTER</label>
            <label class="opt"><input type="radio" name="q6"> GROUP BY</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The HAVING clause filters groups after aggregation, whereas WHERE filters rows before aggregation.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 7 of 20</span><span>Joins</span></div>
          <div class="q-body">
            <p class="q-text">What does an INNER JOIN return?</p>
            <label class="opt"><input type="radio" name="q7"> All rows from the left table</label>
            <label class="opt"><input type="radio" name="q7"> All rows from both tables</label>
            <label class="opt" data-correct><input type="radio" name="q7"> Only rows with matching values in both tables</label>
            <label class="opt"><input type="radio" name="q7"> A cartesian product</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> INNER JOIN strictly requires a match in both joined tables.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 8 of 20</span><span>Nulls</span></div>
          <div class="q-body">
            <p class="q-text">How do you check if a column value is NULL?</p>
            <label class="opt"><input type="radio" name="q8"> &#96;column = NULL&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q8"> &#96;column IS NULL&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;column == NULL&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;ISNULL(column)&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> NULL cannot be evaluated with equality operators; you must use the &#96;IS NULL&#96; operator.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 9 of 20</span><span>Sorting</span></div>
          <div class="q-body">
            <p class="q-text">Which keyword sorts the result set in descending order?</p>
            <label class="opt"><input type="radio" name="q9"> ASC</label>
            <label class="opt" data-correct><input type="radio" name="q9"> DESC</label>
            <label class="opt"><input type="radio" name="q9"> DOWN</label>
            <label class="opt"><input type="radio" name="q9"> SORT BY</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> DESC specifies descending order in an ORDER BY clause.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 10 of 20</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">Which function returns the number of non-null values in a column?</p>
            <label class="opt"><input type="radio" name="q10"> &#96;SUM(column)&#96;</label>
            <label class="opt"><input type="radio" name="q10"> &#96;COUNT(*)&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q10"> &#96;COUNT(column)&#96;</label>
            <label class="opt"><input type="radio" name="q10"> &#96;TOTAL(column)&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;COUNT(column)&#96; counts non-null entries, while &#96;COUNT(*)&#96; counts all rows.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 11 of 20</span><span>Set Operators</span></div>
          <div class="q-body">
            <p class="q-text">What is the difference between UNION and UNION ALL?</p>
            <label class="opt"><input type="radio" name="q11"> UNION ALL removes duplicates, UNION keeps them</label>
            <label class="opt" data-correct><input type="radio" name="q11"> UNION removes duplicates, UNION ALL keeps them</label>
            <label class="opt"><input type="radio" name="q11"> They are the same</label>
            <label class="opt"><input type="radio" name="q11"> UNION applies to columns, UNION ALL to rows</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> UNION performs a distinct operation (which is slower), while UNION ALL simply appends result sets.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 12 of 20</span><span>Wildcards</span></div>
          <div class="q-body">
            <p class="q-text">In the LIKE operator, what does the &#96;%&#96; symbol represent?</p>
            <label class="opt"><input type="radio" name="q12"> A single character</label>
            <label class="opt" data-correct><input type="radio" name="q12"> Zero, one, or multiple characters</label>
            <label class="opt"><input type="radio" name="q12"> A number</label>
            <label class="opt"><input type="radio" name="q12"> An exact match</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;%&#96; is a wildcard for any sequence of characters.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 13 of 20</span><span>Data Manipulation</span></div>
          <div class="q-body">
            <p class="q-text">Which statement is used to modify existing records in a table?</p>
            <label class="opt"><input type="radio" name="q13"> ALTER</label>
            <label class="opt"><input type="radio" name="q13"> MODIFY</label>
            <label class="opt" data-correct><input type="radio" name="q13"> UPDATE</label>
            <label class="opt"><input type="radio" name="q13"> CHANGE</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> UPDATE changes data inside a table, while ALTER changes the table structure.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 14 of 20</span><span>Constraints</span></div>
          <div class="q-body">
            <p class="q-text">What does a PRIMARY KEY constraint do?</p>
            <label class="opt"><input type="radio" name="q14"> Allows duplicate values</label>
            <label class="opt" data-correct><input type="radio" name="q14"> Uniquely identifies each record in a table and cannot contain NULLs</label>
            <label class="opt"><input type="radio" name="q14"> Creates a relationship to another table</label>
            <label class="opt"><input type="radio" name="q14"> Encrypts the data</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A primary key enforces entity integrity (unique and not null).</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 15 of 20</span><span>Window Functions</span></div>
          <div class="q-body">
            <p class="q-text">Which clause is essential when writing a window function?</p>
            <label class="opt"><input type="radio" name="q15"> GROUP BY</label>
            <label class="opt" data-correct><input type="radio" name="q15"> OVER()</label>
            <label class="opt"><input type="radio" name="q15"> HAVING</label>
            <label class="opt"><input type="radio" name="q15"> WINDOW</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The OVER clause defines the window (set of rows) the function operates on.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 16 of 20</span><span>Subqueries</span></div>
          <div class="q-body">
            <p class="q-text">Can a subquery return multiple columns?</p>
            <label class="opt"><input type="radio" name="q16"> Yes, if used with the IN operator</label>
            <label class="opt" data-correct><input type="radio" name="q16"> Yes, if used in the FROM clause (as a derived table) or with EXISTS</label>
            <label class="opt"><input type="radio" name="q16"> No, it can only return a single value</label>
            <label class="opt"><input type="radio" name="q16"> No, SQL does not support subqueries</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> When used in the FROM clause, a subquery acts as a temporary table and can have multiple columns.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 17 of 20</span><span>Transactions</span></div>
          <div class="q-body">
            <p class="q-text">What command undoes a transaction if an error occurs?</p>
            <label class="opt"><input type="radio" name="q17"> COMMIT</label>
            <label class="opt"><input type="radio" name="q17"> UNDO</label>
            <label class="opt" data-correct><input type="radio" name="q17"> ROLLBACK</label>
            <label class="opt"><input type="radio" name="q17"> REVERT</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> ROLLBACK reverts the database to the state it was in before the transaction began.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 18 of 20</span><span>Aliases</span></div>
          <div class="q-body">
            <p class="q-text">How do you assign an alias to a column in a query?</p>
            <label class="opt" data-correct><input type="radio" name="q18"> &#96;column AS alias&#96;</label>
            <label class="opt"><input type="radio" name="q18"> &#96;column = alias&#96;</label>
            <label class="opt"><input type="radio" name="q18"> &#96;ALIAS(column)&#96;</label>
            <label class="opt"><input type="radio" name="q18"> &#96;column -&gt; alias&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The AS keyword (or just a space) is used to create a temporary alias for a column or table.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 19 of 20</span><span>Data Types</span></div>
          <div class="q-body">
            <p class="q-text">Which data type is best for storing a fixed-length string, like a 2-letter state code?</p>
            <label class="opt"><input type="radio" name="q19"> VARCHAR</label>
            <label class="opt"><input type="radio" name="q19"> TEXT</label>
            <label class="opt" data-correct><input type="radio" name="q19"> CHAR</label>
            <label class="opt"><input type="radio" name="q19"> BLOB</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> CHAR is used for fixed-length strings and is often more efficient for that purpose.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 20 of 20</span><span>Optimization</span></div>
          <div class="q-body">
            <p class="q-text">What database object improves the speed of data retrieval operations?</p>
            <label class="opt"><input type="radio" name="q20"> View</label>
            <label class="opt" data-correct><input type="radio" name="q20"> Index</label>
            <label class="opt"><input type="radio" name="q20"> Trigger</label>
            <label class="opt"><input type="radio" name="q20"> Stored Procedure</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Indexes work like a book's index, allowing the database to find rows quickly without scanning the whole table.</div>
        </div>` },
      { h: "Preparation checklist", body: `
        <ul>
          <li>Practice the 5 JOIN types and the anti-join pattern (LEFT JOIN + IS NULL)</li>
          <li>Memorize the WHERE → GROUP BY → HAVING → ORDER BY execution order</li>
          <li>Know basic index trade-offs: faster reads, slower writes, extra storage</li>
          <li>For window functions, understand what <code>PARTITION BY</code> changes compared with a plain <code>ORDER BY</code></li>
        </ul>` }
    ]
  },
  {
    slug: "digital-marketing-study-guide",
    title: "Digital Marketing Study Guide: SEO, Funnels & Metrics",
    category: "Marketing",
    icon: "DM",
    gradient: "linear-gradient(135deg,#b02525,#dc4a4a)",
    date: "Aug 8, 2026",
    readTime: "7 min read",
    excerpt: "SEO fundamentals, funnel metrics, A/B testing, and campaign attribution — condensed study notes with practice questions.",
    intro: "Digital marketing covers a broad surface: SEO, paid media, email, analytics, and strategy. Interviews and skills tests tend toward definitions applied to realistic campaign scenarios.",
    sections: [
      { h: "SEO essentials", body: `
        <ul>
          <li><b>On-page SEO</b> — title tags, meta descriptions, headings, internal links, keyword usage</li>
          <li><b>Off-page SEO</b> — backlinks and mentions from other sites (a major ranking signal)</li>
          <li><b>Technical SEO</b> — site speed, mobile-friendliness, crawlability, sitemaps, structured data</li>
          <li><b>CTR</b> = clicks ÷ impressions; <b>Bounce rate</b> = in Google Analytics 4, the percentage of sessions that were not engaged (older GA3 definition was single-page sessions ÷ all sessions).</li>
        </ul>
        <div class="callout"><b>Common question</b> "What most improves a page's authority?" → quality backlinks. "What helps search engines understand page structure?" → heading tags / semantic HTML / structured data.</div>` },
      { h: "Funnel metrics", body: `
        <table>
          <tr><th>Stage</th><th>Goal</th><th>Typical metrics</th></tr>
          <tr><td>Awareness</td><td>Reach new audiences</td><td>Impressions, reach, CTR</td></tr>
          <tr><td>Consideration</td><td>Engage prospects</td><td>Time on site, pages/session, video views</td></tr>
          <tr><td>Conversion</td><td>Drive action</td><td>Conversion rate, CPA, ROAS</td></tr>
          <tr><td>Retention</td><td>Repeat business</td><td>Retention rate, LTV, churn</td></tr>
        </table>
        <p>Know the formulas: <code>Conversion Rate = Conversions ÷ Visitors</code>, <code>ROAS = Revenue ÷ Ad Spend</code>, <code>CPA = Spend ÷ Conversions</code>.</p>` },
      { h: "A/B testing basics", body: `
        <p>Expect one or two questions on experimentation:</p>
        <ul>
          <li>Test <b>one variable</b> at a time (subject line, CTA color, headline)</li>
          <li>Reach <b>statistical significance</b> before deciding — usually 95% confidence</li>
          <li>Run tests for full business cycles to avoid day-of-week bias</li>
          <li>Don't stop early when one variant "looks" ahead — that inflates false positives</li>
        </ul>` },
            { h: "Practical learning exercises", body: `
        <ul>
          <li><b>Exercise 1 (SEO Audit):</b> Pick a web page. Write out a new optimized Title tag (under 60 characters) and Meta Description (under 155 characters) targeting a specific long-tail keyword.</li>
          <li><b>Exercise 2 (Campaign Math):</b> If you spend $500 on ads, get 10,000 impressions, 200 clicks, and 5 sales, calculate the CTR, CPC, Conversion Rate, and CPA.</li>
          <li><b>Exercise 3 (Email Marketing):</b> Draft a promotional email. Ensure it has a compelling subject line, a clear CTA, and complies with CAN-SPAM (e.g., includes an unsubscribe link and physical address).</li>
        </ul>` },
{ h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 20</span><span>SEO</span></div>
          <div class="q-body">
            <p class="q-text">Which factor most directly increases a website's authority in search?</p>
            <label class="opt"><input type="radio" name="q1"> Adding more pages</label>
            <label class="opt" data-correct><input type="radio" name="q1"> Earning backlinks from reputable sites</label>
            <label class="opt"><input type="radio" name="q1"> Using more images</label>
            <label class="opt"><input type="radio" name="q1"> Posting more frequently</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Backlinks act as "votes of confidence" and remain among the strongest authority signals. Volume of pages or posts without quality doesn't move authority. (Scores such as Moz's Domain Authority are third-party estimates, not Google ranking factors.)</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 2 of 20</span><span>Metrics</span></div>
          <div class="q-body">
            <p class="q-text">An ad campaign spent $2,000 and generated $8,000 in attributed revenue. What is the ROAS?</p>
            <label class="opt"><input type="radio" name="q2"> 4%</label>
            <label class="opt"><input type="radio" name="q2"> 25%</label>
            <label class="opt" data-correct><input type="radio" name="q2"> 4:1 (or 400%)</label>
            <label class="opt"><input type="radio" name="q2"> $6,000</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> ROAS = Revenue ÷ Ad Spend = 8000 ÷ 2000 = 4. The $6,000 figure is revenue minus spend, not ROAS. Whether 4:1 is "good" depends on your margins — compare ROAS with your break-even ROAS (1 ÷ profit margin).</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 3 of 20</span><span>Testing</span></div>
          <div class="q-body">
            <p class="q-text">What is the main reason to avoid stopping an A/B test early?</p>
            <label class="opt"><input type="radio" name="q3"> It costs more per day</label>
            <label class="opt" data-correct><input type="radio" name="q3"> Early leads are often noise, inflating false-positive risk</label>
            <label class="opt"><input type="radio" name="q3"> Users will notice the test</label>
            <label class="opt"><input type="radio" name="q3"> It confuses search engines</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Early results fluctuate randomly ("peeking problem"). Stopping as soon as one variant leads dramatically increases the chance of declaring a winner that doesn't actually exist.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 4 of 20</span><span>SEO</span></div>
          <div class="q-body">
            <p class="q-text">Which of these is an off-page SEO factor?</p>
            <label class="opt"><input type="radio" name="q4"> Meta tags</label>
            <label class="opt" data-correct><input type="radio" name="q4"> Backlinks from other websites</label>
            <label class="opt"><input type="radio" name="q4"> Page load speed</label>
            <label class="opt"><input type="radio" name="q4"> Keyword density</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Off-page SEO refers to actions taken outside of your own website to impact your rankings, primarily building high-quality backlinks.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 5 of 20</span><span>Metrics</span></div>
          <div class="q-body">
            <p class="q-text">What does Customer Acquisition Cost (CAC) measure?</p>
            <label class="opt"><input type="radio" name="q5"> The total revenue generated by a customer</label>
            <label class="opt"><input type="radio" name="q5"> The cost of manufacturing a product</label>
            <label class="opt" data-correct><input type="radio" name="q5"> The total cost of sales and marketing divided by the number of new customers acquired</label>
            <label class="opt"><input type="radio" name="q5"> The advertising budget for a month</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> CAC calculates how much a company spends to acquire a single new customer, a vital metric for determining marketing profitability.</div>
        </div>

        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 6 of 20</span><span>SEO</span></div>
          <div class="q-body">
            <p class="q-text">Which of these is an 'on-page' SEO factor?</p>
            <label class="opt"><input type="radio" name="q6"> Backlinks from other websites</label>
            <label class="opt"><input type="radio" name="q6"> Social media shares</label>
            <label class="opt" data-correct><input type="radio" name="q6"> Title tags and header structures</label>
            <label class="opt"><input type="radio" name="q6"> Domain age</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> On-page SEO refers to optimizations made directly within the website's HTML and content.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 7 of 20</span><span>Metrics</span></div>
          <div class="q-body">
            <p class="q-text">What does CTR stand for in digital advertising?</p>
            <label class="opt"><input type="radio" name="q7"> Cost To Retain</label>
            <label class="opt" data-correct><input type="radio" name="q7"> Click-Through Rate</label>
            <label class="opt"><input type="radio" name="q7"> Customer Target Ratio</label>
            <label class="opt"><input type="radio" name="q7"> Conversion Tracking Record</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> CTR is the percentage of people who click an ad after seeing it (Clicks / Impressions).</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 8 of 20</span><span>PPC</span></div>
          <div class="q-body">
            <p class="q-text">In Google Ads, what determines your Ad Rank at auction time?</p>
            <label class="opt"><input type="radio" name="q8"> Your maximum bid multiplied by your 1-10 Quality Score</label>
            <label class="opt" data-correct><input type="radio" name="q8"> Multiple auction-time factors including bid, ad/landing page quality, competitiveness, search context, and format impact</label>
            <label class="opt"><input type="radio" name="q8"> Only your maximum bid and the age of your Google Ads account</label>
            <label class="opt"><input type="radio" name="q8"> The daily budget divided by the number of clicks</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Ad Rank is determined by multiple real-time factors including bid, auction competitiveness, context, format impact, and ad/landing page quality. Quality Score (the 1-10 number) is a diagnostic tool, not a direct auction input. <a href="https://support.google.com/google-ads/answer/1722122" target="_blank" rel="noopener">Official Reference</a></div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 9 of 20</span><span>Social Media</span></div>
          <div class="q-body">
            <p class="q-text">What is 'organic reach'?</p>
            <label class="opt"><input type="radio" name="q9"> The number of people who see your content through paid promotion</label>
            <label class="opt" data-correct><input type="radio" name="q9"> The number of people who see your content without paid distribution</label>
            <label class="opt"><input type="radio" name="q9"> The number of fake accounts following you</label>
            <label class="opt"><input type="radio" name="q9"> The percentage of followers who buy a product</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Organic reach is driven by the platform's algorithm and user sharing, not ad spend.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 10 of 20</span><span>Analytics</span></div>
          <div class="q-body">
            <p class="q-text">How is bounce rate defined in Google Analytics 4 (GA4)?</p>
            <label class="opt"><input type="radio" name="q10"> A single-page session where the user leaves without interacting</label>
            <label class="opt" data-correct><input type="radio" name="q10"> The percentage of sessions that were not engaged sessions</label>
            <label class="opt"><input type="radio" name="q10"> When an email marketing campaign cannot be delivered</label>
            <label class="opt"><input type="radio" name="q10"> The number of times a user clicks the back button</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> In GA4, bounce rate is the percentage of sessions that were not "engaged sessions." An engaged session lasts longer than 10 seconds, has a key event, or has at least 2 pageviews. (The older UA definition was simply a single-page session without interaction.) <a href="https://support.google.com/analytics/answer/12195621" target="_blank" rel="noopener">Official Reference</a></div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 11 of 20</span><span>Email</span></div>
          <div class="q-body">
            <p class="q-text">What is a key requirement of the CAN-SPAM Act?</p>
            <label class="opt"><input type="radio" name="q11"> You must email users every day</label>
            <label class="opt"><input type="radio" name="q11"> You cannot use emojis in subject lines</label>
            <label class="opt" data-correct><input type="radio" name="q11"> You must include a clear way for recipients to opt-out (unsubscribe)</label>
            <label class="opt"><input type="radio" name="q11"> You must guarantee open rates</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> CAN-SPAM requires a visible unsubscribe link and a physical mailing address.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 12 of 20</span><span>Content</span></div>
          <div class="q-body">
            <p class="q-text">What is a 'buyer persona'?</p>
            <label class="opt"><input type="radio" name="q12"> A real customer who buys the most products</label>
            <label class="opt" data-correct><input type="radio" name="q12"> A semi-fictional representation of your ideal customer based on data</label>
            <label class="opt"><input type="radio" name="q12"> A software tool for tracking purchases</label>
            <label class="opt"><input type="radio" name="q12"> An employee dedicated to sales</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Personas help marketers tailor content and messaging to specific audience segments.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 13 of 20</span><span>CRO</span></div>
          <div class="q-body">
            <p class="q-text">What is A/B testing?</p>
            <label class="opt"><input type="radio" name="q13"> Testing a website on two different browsers</label>
            <label class="opt" data-correct><input type="radio" name="q13"> Comparing two versions of a webpage or ad to see which performs better</label>
            <label class="opt"><input type="radio" name="q13"> Running ads in two different countries</label>
            <label class="opt"><input type="radio" name="q13"> Testing the backup server</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A/B testing isolates variables to determine what drives higher conversion rates.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 14 of 20</span><span>SEO</span></div>
          <div class="q-body">
            <p class="q-text">Why are backlinks important for SEO?</p>
            <label class="opt"><input type="radio" name="q14"> They prevent spam</label>
            <label class="opt" data-correct><input type="radio" name="q14"> They act as a 'vote of confidence' from one site to another, signaling authority to search engines</label>
            <label class="opt"><input type="radio" name="q14"> They make pages load faster</label>
            <label class="opt"><input type="radio" name="q14"> They are legally required</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> High-quality backlinks are one of the strongest ranking factors in Google's algorithm.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 15 of 20</span><span>Metrics</span></div>
          <div class="q-body">
            <p class="q-text">If you spend $100 and acquire 5 customers, what is your CPA (Cost Per Acquisition)?</p>
            <label class="opt"><input type="radio" name="q15"> $5</label>
            <label class="opt" data-correct><input type="radio" name="q15"> $20</label>
            <label class="opt"><input type="radio" name="q15"> $500</label>
            <label class="opt"><input type="radio" name="q15"> 5%</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> CPA = Total Spend / Total Acquisitions ($100 / 5 = $20).</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 16 of 20</span><span>Affiliate</span></div>
          <div class="q-body">
            <p class="q-text">How does affiliate marketing generally work?</p>
            <label class="opt"><input type="radio" name="q16"> Paying influencers a fixed salary</label>
            <label class="opt" data-correct><input type="radio" name="q16"> Earning a commission by promoting other people's/company's products</label>
            <label class="opt"><input type="radio" name="q16"> Buying email lists</label>
            <label class="opt"><input type="radio" name="q16"> Renting billboard space</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Affiliates are paid a performance-based commission for driving sales or leads.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 17 of 20</span><span>Video</span></div>
          <div class="q-body">
            <p class="q-text">What is the primary benefit of adding captions to marketing videos?</p>
            <label class="opt"><input type="radio" name="q17"> It increases the file size</label>
            <label class="opt" data-correct><input type="radio" name="q17"> It improves accessibility and allows viewing in sound-off environments</label>
            <label class="opt"><input type="radio" name="q17"> It changes the video resolution</label>
            <label class="opt"><input type="radio" name="q17"> It prevents downloading</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Most videos on social media are watched without sound, making captions crucial for engagement.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 18 of 20</span><span>Strategy</span></div>
          <div class="q-body">
            <p class="q-text">What is the 'marketing funnel'?</p>
            <label class="opt"><input type="radio" name="q18"> A tool for pouring data into a CRM</label>
            <label class="opt" data-correct><input type="radio" name="q18"> A model illustrating the customer journey from awareness to purchase</label>
            <label class="opt"><input type="radio" name="q18"> A type of chart in Google Analytics</label>
            <label class="opt"><input type="radio" name="q18"> A budget allocation strategy</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The funnel maps stages like Awareness, Consideration, and Decision.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 19 of 20</span><span>SEO</span></div>
          <div class="q-body">
            <p class="q-text">What is the purpose of a robots.txt file?</p>
            <label class="opt"><input type="radio" name="q19"> To animate website graphics</label>
            <label class="opt" data-correct><input type="radio" name="q19"> To tell search engine crawlers which pages they can or cannot request</label>
            <label class="opt"><input type="radio" name="q19"> To strictly prevent pages from being indexed by search engines</label>
            <label class="opt"><input type="radio" name="q19"> To store user passwords</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A robots.txt file manages crawler traffic to avoid overloading your site. It is <strong>not</strong> a mechanism to keep a webpage out of Google. To prevent indexing, you must use <code>noindex</code> tags. <a href="https://developers.google.com/search/docs/crawling-indexing/robots/intro" target="_blank" rel="noopener">Official Reference</a></div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 20 of 20</span><span>PPC</span></div>
          <div class="q-body">
            <p class="q-text">What is retargeting (or remarketing)?</p>
            <label class="opt"><input type="radio" name="q20"> Changing your target audience completely</label>
            <label class="opt" data-correct><input type="radio" name="q20"> Serving ads to people who have previously visited your website or used your app</label>
            <label class="opt"><input type="radio" name="q20"> Sending emails to bouncing addresses</label>
            <label class="opt"><input type="radio" name="q20"> Targeting competitors' employees</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Retargeting uses cookies to re-engage users who showed initial interest.</div>
        </div>` },
      { h: "Final tips", body: `
        <ul>
          <li>Memorize the metric formulas — calculation questions are easy marks once you know them cold</li>
          <li>Know the difference between remarketing (past visitors) and prospecting (new audiences)</li>
          <li>Review email terms: open rate, CTR, list segmentation, deliverability, CAN-SPAM/GDPR basics</li>
        </ul>` }
    ]
  },
  {
    slug: "git-study-guide",
    title: "Git Study Guide: Commands and Concepts",
    category: "Git",
    icon: "GT",
    gradient: "linear-gradient(135deg,#c05621,#ed8936)",
    date: "Jul 30, 2026",
    readTime: "7 min read",
    excerpt: "Branching, merging vs rebasing, staging, and undoing mistakes — the Git knowledge every developer needs, with quizzes.",
    intro: "Interviews and skills tests focus on everyday version-control workflows. Questions often present a situation (\"you committed to the wrong branch\") and ask for the correct command sequence.",
    sections: [
      { h: "Core workflow commands", body: `
        <pre><code>git status              # what's changed / staged
git add file.txt        # stage a file
git commit -m "msg"     # commit staged changes
git log --oneline       # compact history
git diff                # unstaged changes
git diff --staged       # staged vs last commit</code></pre>
        <p>Know the three areas cold: <b>working directory</b> → <code>git add</code> → <b>staging area</b> → <code>git commit</code> → <b>repository</b>.</p>` },
      { h: "Undoing things — a favorite topic", body: `
        <table>
          <tr><th>Situation</th><th>Command</th></tr>
          <tr><td>Discard unstaged changes to a file</td><td><code>git restore file.txt</code> (or <code>git checkout -- file.txt</code>)</td></tr>
          <tr><td>Unstage a file (keep changes)</td><td><code>git restore --staged file.txt</code></td></tr>
          <tr><td>Amend the last commit</td><td><code>git commit --amend</code></td></tr>
          <tr><td>Move branch pointer back one commit (keep changes staged)</td><td><code>git reset --soft HEAD~1</code></td></tr>
          <tr><td>Revert a pushed commit safely</td><td><code>git revert &lt;sha&gt;</code></td></tr>
        </table>
        <div class="callout"><b>Key distinction</b> <code>reset</code> rewrites history (dangerous after push); <code>revert</code> creates a new commit that undoes changes (safe for shared history).</div>` },
      { h: "Merge vs rebase", body: `
        <p>Both combine branches, but differently:</p>
        <ul>
          <li><b>Merge</b> — creates a merge commit, preserves true history. Safe for shared branches.</li>
          <li><b>Rebase</b> — replays your commits on top of another branch, producing linear history. Never rebase commits others have pulled.</li>
        </ul>
        <p>The golden rule: <b>rebase local, merge shared</b>.</p>` },
            { h: "Practical learning exercises", body: `
        <ul>
          <li><b>Exercise 1 (Branching):</b> In a local repo, create a new branch called feature-login. Make a change to a file, stage it, commit it with a descriptive message, and switch back to main.</li>
          <li><b>Exercise 2 (Merging & Conflicts):</b> Intentionally create a merge conflict. Modify the same line of a file in both main and a test branch. Attempt to merge the branch into main, resolve the conflict markers in your editor, and complete the merge.</li>
          <li><b>Exercise 3 (History):</b> Use git log --oneline --graph to view your history. Then use git revert to safely undo your last commit by creating a new inverse commit.</li>
        </ul>` },
{ h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 20</span><span>Basics</span></div>
          <div class="q-body">
            <p class="q-text">Which command shows the difference between your working directory and the staging area?</p>
            <label class="opt"><input type="radio" name="q1"> git diff --staged</label>
            <label class="opt" data-correct><input type="radio" name="q1"> git diff</label>
            <label class="opt"><input type="radio" name="q1"> git log -p</label>
            <label class="opt"><input type="radio" name="q1"> git status -v</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Plain <code>git diff</code> compares working tree to the index (staging area). <code>--staged</code> compares the index to the last commit instead.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 2 of 20</span><span>Undoing</span></div>
          <div class="q-body">
            <p class="q-text">A commit has already been pushed to a shared branch, and you need to undo it without rewriting history. What do you use?</p>
            <label class="opt"><input type="radio" name="q2"> git reset --hard HEAD~1</label>
            <label class="opt"><input type="radio" name="q2"> git rebase -i</label>
            <label class="opt" data-correct><input type="radio" name="q2"> git revert &lt;sha&gt;</label>
            <label class="opt"><input type="radio" name="q2"> git stash</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>revert</code> adds a new commit that undoes the target commit — safe for shared history. <code>reset</code> rewrites history and would break teammates' repos on their next pull.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 3 of 20</span><span>Branching</span></div>
          <div class="q-body">
            <p class="q-text">What does <code>git checkout -b feature</code> do?</p>
            <label class="opt"><input type="radio" name="q3"> Creates a branch named "feature" only</label>
            <label class="opt" data-correct><input type="radio" name="q3"> Creates and switches to a new branch named "feature"</label>
            <label class="opt"><input type="radio" name="q3"> Switches to an existing branch named "feature"</label>
            <label class="opt"><input type="radio" name="q3"> Merges "feature" into the current branch</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The <code>-b</code> flag creates the branch and immediately checks it out — equivalent to <code>git branch feature</code> followed by <code>git checkout feature</code>. Modern Git also offers <code>git switch -c feature</code> for the same job.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 4 of 20</span><span>Branching</span></div>
          <div class="q-body">
            <p class="q-text">Which command creates a new branch and switches to it immediately?</p>
            <label class="opt"><input type="radio" name="q4"> git branch new-branch</label>
            <label class="opt"><input type="radio" name="q4"> git switch new-branch</label>
            <label class="opt" data-correct><input type="radio" name="q4"> git checkout -b new-branch</label>
            <label class="opt"><input type="radio" name="q4"> git create branch new-branch</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>git checkout -b &lt;branch&gt;</code> is a shortcut that creates the branch and immediately checks it out. <code>git switch -c &lt;branch&gt;</code> also does this.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 5 of 20</span><span>History</span></div>
          <div class="q-body">
            <p class="q-text">How do you discard all uncommitted changes in your working directory?</p>
            <label class="opt"><input type="radio" name="q5"> git clean</label>
            <label class="opt" data-correct><input type="radio" name="q5"> git reset --hard</label>
            <label class="opt"><input type="radio" name="q5"> git revert</label>
            <label class="opt"><input type="radio" name="q5"> git stash pop</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>git reset --hard</code> resets the index and working tree to match the last commit, discarding all uncommitted local changes.</div>
        </div>

        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 6 of 20</span><span>Basics</span></div>
          <div class="q-body">
            <p class="q-text">What command initializes a new Git repository?</p>
            <label class="opt"><input type="radio" name="q6"> &#96;git start&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q6"> &#96;git init&#96;</label>
            <label class="opt"><input type="radio" name="q6"> &#96;git create&#96;</label>
            <label class="opt"><input type="radio" name="q6"> &#96;git new&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git init&#96; creates the hidden .git folder that tracks repository history.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 7 of 20</span><span>Staging</span></div>
          <div class="q-body">
            <p class="q-text">What is the purpose of the staging area (index) in Git?</p>
            <label class="opt"><input type="radio" name="q7"> To backup files to the cloud</label>
            <label class="opt" data-correct><input type="radio" name="q7"> To prepare and group specific changes before committing them</label>
            <label class="opt"><input type="radio" name="q7"> To compile code</label>
            <label class="opt"><input type="radio" name="q7"> To resolve merge conflicts automatically</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The staging area allows you to craft precise commits rather than committing all changed files at once.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 8 of 20</span><span>Committing</span></div>
          <div class="q-body">
            <p class="q-text">Which command records staged changes to the repository history?</p>
            <label class="opt"><input type="radio" name="q8"> &#96;git save&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;git push&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q8"> &#96;git commit&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;git add&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git commit&#96; captures a snapshot of the staged changes.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 9 of 20</span><span>Remote</span></div>
          <div class="q-body">
            <p class="q-text">What does &#96;git clone&#96; do?</p>
            <label class="opt"><input type="radio" name="q9"> Duplicates a file</label>
            <label class="opt" data-correct><input type="radio" name="q9"> Copies a remote repository to your local machine</label>
            <label class="opt"><input type="radio" name="q9"> Creates a backup branch</label>
            <label class="opt"><input type="radio" name="q9"> Uploads your code to GitHub</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git clone&#96; downloads the entire repository, including its history, to your local environment.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 10 of 20</span><span>Branching</span></div>
          <div class="q-body">
            <p class="q-text">How do you create and switch to a new branch in one command?</p>
            <label class="opt"><input type="radio" name="q10"> &#96;git branch -c &lt;name&gt;&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q10"> &#96;git switch -c &lt;name&gt;&#96; (or &#96;git checkout -b &lt;name&gt;&#96;)</label>
            <label class="opt"><input type="radio" name="q10"> &#96;git new &lt;name&gt;&#96;</label>
            <label class="opt"><input type="radio" name="q10"> &#96;git branch --switch &lt;name&gt;&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git switch -c&#96; (newer) or &#96;git checkout -b&#96; (older) perform both actions simultaneously.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 11 of 20</span><span>History</span></div>
          <div class="q-body">
            <p class="q-text">Which command shows the status of files (modified, staged, untracked)?</p>
            <label class="opt"><input type="radio" name="q11"> &#96;git log&#96;</label>
            <label class="opt"><input type="radio" name="q11"> &#96;git diff&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q11"> &#96;git status&#96;</label>
            <label class="opt"><input type="radio" name="q11"> &#96;git show&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git status&#96; provides an overview of the working tree and staging area.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 12 of 20</span><span>Remote</span></div>
          <div class="q-body">
            <p class="q-text">What is the difference between &#96;git fetch&#96; and &#96;git pull&#96;?</p>
            <label class="opt"><input type="radio" name="q12"> Fetch uploads data, pull downloads data</label>
            <label class="opt" data-correct><input type="radio" name="q12"> Fetch downloads data without merging, pull downloads and automatically merges</label>
            <label class="opt"><input type="radio" name="q12"> They are identical</label>
            <label class="opt"><input type="radio" name="q12"> Fetch works on branches, pull works on files</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git pull&#96; is essentially &#96;git fetch&#96; followed immediately by &#96;git merge&#96;.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 13 of 20</span><span>Undoing</span></div>
          <div class="q-body">
            <p class="q-text">You made a typo in your last commit message. How can you fix it without creating a new commit?</p>
            <label class="opt" data-correct><input type="radio" name="q13"> &#96;git commit --amend&#96;</label>
            <label class="opt"><input type="radio" name="q13"> &#96;git revert&#96;</label>
            <label class="opt"><input type="radio" name="q13"> &#96;git reset&#96;</label>
            <label class="opt"><input type="radio" name="q13"> &#96;git change&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git commit --amend&#96; replaces the most recent commit with a new one containing updated changes/messages.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 14 of 20</span><span>Merging</span></div>
          <div class="q-body">
            <p class="q-text">What happens during a merge conflict?</p>
            <label class="opt"><input type="radio" name="q14"> Git deletes the conflicting branch</label>
            <label class="opt"><input type="radio" name="q14"> Git chooses the most recent change automatically</label>
            <label class="opt" data-correct><input type="radio" name="q14"> Git pauses the merge and asks the user to manually resolve the conflicting lines</label>
            <label class="opt"><input type="radio" name="q14"> The repository is corrupted</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Conflicts occur when identical lines are changed differently. Git inserts markers for you to resolve manually.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 15 of 20</span><span>Rebasing</span></div>
          <div class="q-body">
            <p class="q-text">How does &#96;git rebase&#96; differ from &#96;git merge&#96;?</p>
            <label class="opt"><input type="radio" name="q15"> Rebase deletes history, merge keeps it</label>
            <label class="opt" data-correct><input type="radio" name="q15"> Rebase rewrites history to create a linear progression, merge creates a merge commit joining histories</label>
            <label class="opt"><input type="radio" name="q15"> Rebase is for local files, merge is for remotes</label>
            <label class="opt"><input type="radio" name="q15"> There is no difference</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Rebasing moves the base of a branch to a new commit, keeping history clean but rewriting commit IDs.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 16 of 20</span><span>Stashing</span></div>
          <div class="q-body">
            <p class="q-text">You need to switch branches but have half-finished work you don't want to commit yet. What command should you use?</p>
            <label class="opt"><input type="radio" name="q16"> &#96;git save&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q16"> &#96;git stash&#96;</label>
            <label class="opt"><input type="radio" name="q16"> &#96;git pause&#96;</label>
            <label class="opt"><input type="radio" name="q16"> &#96;git hide&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git stash&#96; temporarily shelves changes so you can work on something else.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 17 of 20</span><span>Configuration</span></div>
          <div class="q-body">
            <p class="q-text">How do you set your global Git username?</p>
            <label class="opt" data-correct><input type="radio" name="q17"> &#96;git config --global user.name "Name"&#96;</label>
            <label class="opt"><input type="radio" name="q17"> &#96;git set name "Name"&#96;</label>
            <label class="opt"><input type="radio" name="q17"> &#96;git name = "Name"&#96;</label>
            <label class="opt"><input type="radio" name="q17"> &#96;git config user "Name"&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The &#96;git config&#96; command manages settings. &#96;--global&#96; applies it to all repos for the user.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 18 of 20</span><span>Files</span></div>
          <div class="q-body">
            <p class="q-text">What is the purpose of a &#96;.gitignore&#96; file?</p>
            <label class="opt"><input type="radio" name="q18"> To delete files permanently</label>
            <label class="opt" data-correct><input type="radio" name="q18"> To specify intentionally untracked files that Git should ignore</label>
            <label class="opt"><input type="radio" name="q18"> To ignore merge conflicts</label>
            <label class="opt"><input type="radio" name="q18"> To hide code from other collaborators</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> It prevents temporary files, build artifacts, or uncommitted secrets from being accidentally committed. Note: adding an already-tracked file to <code>.gitignore</code> does not remove it from tracking or history. <a href="https://git-scm.com/docs/gitignore" target="_blank" rel="noopener">Official Reference</a></div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 19 of 20</span><span>Inspection</span></div>
          <div class="q-body">
            <p class="q-text">Which command shows the exact line-by-line differences of uncommitted changes?</p>
            <label class="opt"><input type="radio" name="q19"> &#96;git status&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q19"> &#96;git diff&#96;</label>
            <label class="opt"><input type="radio" name="q19"> &#96;git log&#96;</label>
            <label class="opt"><input type="radio" name="q19"> &#96;git changes&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git diff&#96; compares the working directory with the staging area or last commit.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 20 of 20</span><span>Undoing</span></div>
          <div class="q-body">
            <p class="q-text">Which command safely undoes a published commit by creating a new commit with the opposite changes?</p>
            <label class="opt"><input type="radio" name="q20"> &#96;git reset --hard&#96;</label>
            <label class="opt"><input type="radio" name="q20"> &#96;git clean&#96;</label>
            <label class="opt" data-correct><input type="radio" name="q20"> &#96;git revert&#96;</label>
            <label class="opt"><input type="radio" name="q20"> &#96;git rm&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> &#96;git revert&#96; is safe for shared history because it doesn't rewrite or delete past commits.</div>
        </div>` },
      { h: "Final tips", body: `
        <ul>
          <li>Practice the "wrong branch" scenario: you committed on the wrong branch → <code>git branch newbranch</code>, then <code>git reset --hard HEAD~1</code>, then <code>git switch newbranch</code></li>
          <li>Know <code>git stash</code> / <code>stash pop</code> for parking unfinished work</li>
          <li>Understand <code>.gitignore</code> purpose — preventing untracked build artifacts and secrets from being committed.</li>
          <li><b>Security Warning:</b> <code>.gitignore</code> does not automatically remove files already tracked by Git. If you accidentally commit a secret, adding it to <code>.gitignore</code> later is not safe. You must remove the secret from tracking (e.g., <code>git rm --cached</code>), immediately rotate/revoke the exposed credentials, and consider cleaning the repository history.</li>
        </ul>` }
    ]
  },
  {
    slug: "powerpoint-study-guide",
    title: "PowerPoint Study Guide: Efficient Slide Skills",
    category: "PowerPoint",
    icon: "PP",
    gradient: "linear-gradient(135deg,#b03a2e,#e07b39)",
    date: "Jul 22, 2026",
    readTime: "6 min read",
    excerpt: "Slide masters, presenter view, SmartArt, and the productivity features that separate casual users from efficient ones.",
    intro: "Efficient PowerPoint use comes down to productivity features — the things that separate casual users from efficient ones: masters, layouts, transitions, and presentation tools.",
    sections: [
      { h: "Features worth mastering", body: `
        <ul>
          <li><b>Slide Master</b> — edit once, update every slide; the place for logos, fonts, and footers</li>
          <li><b>Presenter View</b> — speaker notes, next slide, timer (audience sees only slides)</li>
          <li><b>SmartArt</b> — converts bullet points into diagrams (processes, hierarchies, cycles)</li>
          <li><b>Morph transition</b> — smooth animation between slides with matching objects</li>
          <li><b>Reuse Slides</b> — import slides from other decks keeping the destination theme</li>
          <li><b>Presenter tools</b> — pen, laser pointer, black screen (press <code>B</code>)</li>
        </ul>` },
      { h: "Slide Master vs layouts", body: `
        <p>A classic question. The <b>Slide Master</b> controls the overall theme of the deck; <b>slide layouts</b> are children of the master that define placeholder arrangements (Title, Two Content, etc.). Editing the master changes all layouts; editing a layout changes only slides using it.</p>
        <div class="callout tip"><b>Quick rule</b> "Add a company logo to every slide" → put it on the Slide Master, not slide by slide.</div>` },
            { h: "Practical learning exercises", body: `
        <ul>
          <li><b>Exercise 1 (Slide Master):</b> Open a blank presentation. Go to View > Slide Master. Add a company logo and a specific font to the master layout so it automatically applies to all new slides.</li>
          <li><b>Exercise 2 (Animations vs Transitions):</b> Create three slides. Apply a "Morph" transition between Slide 1 and 2. On Slide 2, add bullet points and animate them to appear one by one "On Click."</li>
          <li><b>Exercise 3 (SmartArt & Alignment):</b> Convert a boring bulleted list of a 4-step process into a SmartArt graphic. Use the Align tools to ensure the SmartArt and the slide title are perfectly centered on the slide.</li>
        </ul>` },
{ h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 20</span><span>Masters</span></div>
          <div class="q-body">
            <p class="q-text">The fastest way to add a logo to every slide in a deck is to:</p>
            <label class="opt"><input type="radio" name="q1"> Copy-paste it onto each slide</label>
            <label class="opt" data-correct><input type="radio" name="q1"> Insert it on the Slide Master</label>
            <label class="opt"><input type="radio" name="q1"> Use Find and Replace</label>
            <label class="opt"><input type="radio" name="q1"> Add it to the Notes page</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The Slide Master propagates to all slides automatically. Paste-per-slide is slow and breaks when slides are reordered; the Notes page is never shown to the audience.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 2 of 20</span><span>Presenting</span></div>
          <div class="q-body">
            <p class="q-text">What does pressing the <code>B</code> key during a slideshow do?</p>
            <label class="opt"><input type="radio" name="q2"> Goes back one slide</label>
            <label class="opt" data-correct><input type="radio" name="q2"> Blanks the screen (black)</label>
            <label class="opt"><input type="radio" name="q2"> Opens the laser pointer</label>
            <label class="opt"><input type="radio" name="q2"> Bold-faces the selected text</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> During a slideshow, <code>B</code> blacks out the screen to redirect attention (press again to restore). <code>W</code> gives a white screen. Bold only works in edit mode.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 3 of 20</span><span>Objects</span></div>
          <div class="q-body">
            <p class="q-text">You want to animate an object smoothly moving between its position on one slide and its position on the next. Best tool?</p>
            <label class="opt"><input type="radio" name="q3"> A motion path animation</label>
            <label class="opt"><input type="radio" name="q3"> The Fly In entrance effect</label>
            <label class="opt" data-correct><input type="radio" name="q3"> The Morph transition</label>
            <label class="opt"><input type="radio" name="q3"> Triggered animations</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Morph interpolates position/size/style changes of matching objects across consecutive slides — perfect for smooth movement. Motion paths animate within one slide only. (Morph is available in PowerPoint 2019 and Microsoft 365.)</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 4 of 20</span><span>Formatting</span></div>
          <div class="q-body">
            <p class="q-text">What is the Slide Master used for?</p>
            <label class="opt"><input type="radio" name="q4"> To create complex animations</label>
            <label class="opt" data-correct><input type="radio" name="q4"> To control the global design and layout of all slides</label>
            <label class="opt"><input type="radio" name="q4"> To rehearse timings</label>
            <label class="opt"><input type="radio" name="q4"> To export the presentation to PDF</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The Slide Master stores information about the theme and slide layouts, including background, color, fonts, effects, placeholder sizes, and positioning.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 5 of 20</span><span>Delivery</span></div>
          <div class="q-body">
            <p class="q-text">Which view allows you to see your notes on one screen while the audience sees the slide on another?</p>
            <label class="opt"><input type="radio" name="q5"> Reading View</label>
            <label class="opt"><input type="radio" name="q5"> Slide Sorter View</label>
            <label class="opt" data-correct><input type="radio" name="q5"> Presenter View</label>
            <label class="opt"><input type="radio" name="q5"> Normal View</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Presenter View is designed for multi-monitor setups, allowing the presenter to see current/next slides, speaker notes, and a timer, while the audience only sees the slides.</div>
        </div>

        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 6 of 20</span><span>Design</span></div>
          <div class="q-body">
            <p class="q-text">What is the Slide Master?</p>
            <label class="opt"><input type="radio" name="q6"> The person presenting</label>
            <label class="opt" data-correct><input type="radio" name="q6"> The top slide in a deck that controls formatting, fonts, and layouts for the entire presentation</label>
            <label class="opt"><input type="radio" name="q6"> A premium template</label>
            <label class="opt"><input type="radio" name="q6"> The final review tool</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Editing the Slide Master ensures consistency and saves time compared to formatting individual slides.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 7 of 20</span><span>Delivery</span></div>
          <div class="q-body">
            <p class="q-text">What is the keyboard shortcut to start a presentation from the beginning?</p>
            <label class="opt" data-correct><input type="radio" name="q7"> F5</label>
            <label class="opt"><input type="radio" name="q7"> Ctrl + P</label>
            <label class="opt"><input type="radio" name="q7"> Shift + F5</label>
            <label class="opt"><input type="radio" name="q7"> Alt + Enter</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> F5 starts the show from Slide 1. Shift + F5 starts from the current slide.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 8 of 20</span><span>Animations</span></div>
          <div class="q-body">
            <p class="q-text">What is the difference between a Transition and an Animation?</p>
            <label class="opt"><input type="radio" name="q8"> They are the same thing</label>
            <label class="opt"><input type="radio" name="q8"> Transitions apply to individual objects; Animations apply between slides</label>
            <label class="opt" data-correct><input type="radio" name="q8"> Transitions move you from one slide to the next; Animations move objects within a single slide</label>
            <label class="opt"><input type="radio" name="q8"> Transitions are only for video</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Transitions affect the whole slide surface; animations affect text boxes, shapes, or images.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 9 of 20</span><span>Layout</span></div>
          <div class="q-body">
            <p class="q-text">How can you quickly ensure three shapes are spaced evenly apart?</p>
            <label class="opt"><input type="radio" name="q9"> Eyeball it and drag carefully</label>
            <label class="opt" data-correct><input type="radio" name="q9"> Use the Distribute Horizontally/Vertically tool under the Align menu</label>
            <label class="opt"><input type="radio" name="q9"> Group them</label>
            <label class="opt"><input type="radio" name="q9"> Use SmartGuides only</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The Distribute tool mathematically calculates equal spacing between selected objects.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 10 of 20</span><span>Media</span></div>
          <div class="q-body">
            <p class="q-text">If you want an audio track to play continuously across the entire presentation, what setting must you choose?</p>
            <label class="opt" data-correct><input type="radio" name="q10"> Play Across Slides</label>
            <label class="opt"><input type="radio" name="q10"> Loop until Stopped</label>
            <label class="opt"><input type="radio" name="q10"> Start Automatically</label>
            <label class="opt"><input type="radio" name="q10"> Hide During Show</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The 'Play Across Slides' playback option prevents the audio from stopping when you advance to the next slide.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 11 of 20</span><span>Formatting</span></div>
          <div class="q-body">
            <p class="q-text">What does the Format Painter do?</p>
            <label class="opt"><input type="radio" name="q11"> Paints shapes with a brush tool</label>
            <label class="opt" data-correct><input type="radio" name="q11"> Copies formatting from one object and applies it to another</label>
            <label class="opt"><input type="radio" name="q11"> Changes the slide background color</label>
            <label class="opt"><input type="radio" name="q11"> Converts text to WordArt</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Format Painter saves time by duplicating complex formatting (color, font, borders) instantly.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 12 of 20</span><span>SmartArt</span></div>
          <div class="q-body">
            <p class="q-text">What is the primary benefit of using SmartArt?</p>
            <label class="opt"><input type="radio" name="q12"> It makes the file size smaller</label>
            <label class="opt" data-correct><input type="radio" name="q12"> It quickly converts text into professional, visually appealing diagrams (processes, hierarchies)</label>
            <label class="opt"><input type="radio" name="q12"> It translates text to other languages</label>
            <label class="opt"><input type="radio" name="q12"> It adds animations automatically</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> SmartArt is a fast way to visualize relationships without drawing individual shapes.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 13 of 20</span><span>Views</span></div>
          <div class="q-body">
            <p class="q-text">Which view is best for easily rearranging the order of slides?</p>
            <label class="opt"><input type="radio" name="q13"> Normal View</label>
            <label class="opt"><input type="radio" name="q13"> Reading View</label>
            <label class="opt" data-correct><input type="radio" name="q13"> Slide Sorter View</label>
            <label class="opt"><input type="radio" name="q13"> Notes Page View</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Slide Sorter displays all slides as thumbnails, making drag-and-drop reordering easy.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 14 of 20</span><span>Exporting</span></div>
          <div class="q-body">
            <p class="q-text">How can you share a presentation so the recipient cannot easily edit it and doesn't need PowerPoint to view it?</p>
            <label class="opt"><input type="radio" name="q14"> Save as .pptx</label>
            <label class="opt" data-correct><input type="radio" name="q14"> Save as PDF</label>
            <label class="opt"><input type="radio" name="q14"> Save as .potx</label>
            <label class="opt"><input type="radio" name="q14"> Share via OneDrive link</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Exporting as a PDF preserves layout and fonts while preventing easy editing.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 15 of 20</span><span>Design Ideas</span></div>
          <div class="q-body">
            <p class="q-text">What does the PowerPoint Designer (Design Ideas) feature do?</p>
            <label class="opt"><input type="radio" name="q15"> Checks spelling</label>
            <label class="opt" data-correct><input type="radio" name="q15"> Automatically suggests professional layouts based on the content of your slide</label>
            <label class="opt"><input type="radio" name="q15"> Downloads templates from the internet</label>
            <label class="opt"><input type="radio" name="q15"> Writes text for you</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Designer uses AI to generate layout options when you add images or text.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 16 of 20</span><span>Delivery</span></div>
          <div class="q-body">
            <p class="q-text">While presenting, what happens if you press the 'B' key on your keyboard?</p>
            <label class="opt"><input type="radio" name="q16"> The slide goes Back</label>
            <label class="opt" data-correct><input type="radio" name="q16"> The screen turns completely Black</label>
            <label class="opt"><input type="radio" name="q16"> The presentation ends</label>
            <label class="opt"><input type="radio" name="q16"> It Bolds the text</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Pressing 'B' blacks out the screen (and 'W' whites it out) to draw the audience's attention to the speaker.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 17 of 20</span><span>Images</span></div>
          <div class="q-body">
            <p class="q-text">How do you remove the background of a photo directly in PowerPoint?</p>
            <label class="opt"><input type="radio" name="q17"> It requires Photoshop</label>
            <label class="opt" data-correct><input type="radio" name="q17"> Picture Format &gt; Remove Background</label>
            <label class="opt"><input type="radio" name="q17"> Design &gt; Format Background</label>
            <label class="opt"><input type="radio" name="q17"> Apply a transparent color filter</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> PowerPoint has a built-in background removal tool for basic image masking.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 18 of 20</span><span>Grouping</span></div>
          <div class="q-body">
            <p class="q-text">Why would you Group objects on a slide?</p>
            <label class="opt"><input type="radio" name="q18"> To compress their file size</label>
            <label class="opt" data-correct><input type="radio" name="q18"> To move, resize, or animate them as a single unit</label>
            <label class="opt"><input type="radio" name="q18"> To change their color</label>
            <label class="opt"><input type="radio" name="q18"> To hide them</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Grouping locks the relative position of objects so they can be handled together.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 19 of 20</span><span>Hyperlinks</span></div>
          <div class="q-body">
            <p class="q-text">Can you create a hyperlink that jumps to a specific slide in the same presentation?</p>
            <label class="opt"><input type="radio" name="q19"> No, only to websites</label>
            <label class="opt" data-correct><input type="radio" name="q19"> Yes, using Insert &gt; Link &gt; 'Place in This Document'</label>
            <label class="opt"><input type="radio" name="q19"> Yes, but only using VBA macros</label>
            <label class="opt"><input type="radio" name="q19"> Only if the file is saved online</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Hyperlinks can create interactive, non-linear navigation within a deck.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 20 of 20</span><span>Printing</span></div>
          <div class="q-body">
            <p class="q-text">What print layout is best for giving the audience space to write notes next to the slides?</p>
            <label class="opt"><input type="radio" name="q20"> Full Page Slides</label>
            <label class="opt"><input type="radio" name="q20"> Outline</label>
            <label class="opt" data-correct><input type="radio" name="q20"> Handouts (3 Slides per page)</label>
            <label class="opt"><input type="radio" name="q20"> Notes Pages</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The '3 Slides per page' handout layout automatically prints lines next to each thumbnail.</div>
        </div>` },
      { h: "Final tips", body: `
        <ul>
          <li>Know the difference between entrance, emphasis, exit, and motion path animations</li>
          <li>Review Presenter View features: notes, pen tools, zoom into a region</li>
          <li>Remember that "Reuse Slides" can keep source formatting or adopt destination theme</li>
        </ul>` }
    ]
  },
  {
    slug: "linkedin-skill-assessments-retired",
    title: "LinkedIn Skill Assessments Are Retired: What to Do Instead",
    category: "Getting Started",
    icon: "LI",
    gradient: "linear-gradient(135deg,#0A66C2,#4a90d9)",
    date: "Oct 18, 2026",
    readTime: "5 min read",
    excerpt: "LinkedIn Skill Assessments are no longer available. Here is what that means for your profile and the best ways to prove and practise your skills today.",
    intro: "If you landed here looking for LinkedIn Skill Assessment answers or study material: LinkedIn's Help Center now lists Skill Assessments as <b>no longer available</b>. SkillPrep started life as a study site for those assessments, so we have rebuilt it around the skills themselves — Excel, Python, SQL, JavaScript, Git and more — which matter whether or not a badge exists.",
    sections: [
      { h: "What happened to Skill Assessments?", body: `
        <p>LinkedIn Skill Assessments were short multiple-choice quizzes that earned a skill badge on your profile. LinkedIn has since retired the feature, and its Help Center page on the topic is titled <i>"Skill Assessments - no longer available"</i>.</p>
        <p>Because LinkedIn controls that feature and may update its details, check the official page (linked under Sources) for the current position on existing badges and your data rather than relying on third-party summaries — including this one.</p>
        <div class="callout"><b>Be careful with old material</b> Any site still promising "latest LinkedIn Skill Assessment answers" is selling something that can no longer be taken. Rules like retake waiting periods or badge visibility settings no longer apply.</div>` },
      { h: "What this means for you", body: `
        <ul>
          <li>You cannot earn a new assessment badge, so there is nothing to "pass" on LinkedIn.</li>
          <li>The underlying skills are unchanged. Recruiters and interviewers still test Excel, SQL, Python and the rest directly.</li>
          <li>Evidence of what you can <b>do</b> now carries more weight than a quiz score: projects, work samples, recognised certifications and clear descriptions of results.</li>
        </ul>` },
      { h: "Better ways to show your skills", body: `
        <table>
          <tr><th>Skill</th><th>Evidence that works</th></tr>
          <tr><td>Excel</td><td>A real workbook (budget, sales report) with lookups and a pivot table; Microsoft Office Specialist exam</td></tr>
          <tr><td>Python / SQL</td><td>Small projects on GitHub; a query portfolio on a public dataset; Python Institute certifications (PCEP, PCAP)</td></tr>
          <tr><td>JavaScript / Git</td><td>A deployed small app with a clean commit history and README</td></tr>
          <tr><td>Project management</td><td>A written case study of a project you ran; CAPM or Scrum certifications</td></tr>
          <tr><td>Any skill</td><td>Course completion certificates, plus one short paragraph on your profile describing what you built or improved</td></tr>
        </table>
        <p>Pick two or three that match the roles you want. Quality beats quantity — a handful of relevant, checkable items outweighs a long list of generic ones.</p>` },
      { h: "How to use SkillPrep now", body: `
        <ol>
          <li><b>Learn</b> — read the study guide for the skill you need. Each one explains the "why" behind the concept.</li>
          <li><b>Check yourself</b> — answer the practice questions; the explanation tells you why each answer is right.</li>
          <li><b>Go deeper</b> — follow the Sources links at the bottom of every guide to the official documentation.</li>
          <li><b>Prove it</b> — build something small with the skill and add it to your profile or portfolio.</li>
        </ol>
        <div class="callout tip"><b>Independent and unofficial</b> SkillPrep is not affiliated with LinkedIn or Microsoft. All guides and practice questions are unofficial study aids.</div>` }
    ]
  },
  {
    slug: "generative-ai-career-essentials-practice-test",
    title: "Career Essentials in Generative AI: 164-Question Practice Test",
    category: "Generative AI",
    icon: "AI",
    gradient: "linear-gradient(135deg,#0A66C2,#7b5cd6)",
    date: "Sep 21, 2026",
    readTime: "164 questions",
    excerpt: "An unofficial 164-question practice test on generative AI: Copilot in Microsoft 365, LLMs, GANs and VAEs, prompt engineering, machine-learning types, data fundamentals and AI ethics — with instant scoring, a per-topic breakdown and explanations.",
    intro: "\"Career Essentials in Generative AI\" is a free learning path from Microsoft and LinkedIn Learning. This unofficial practice test covers the same ground — generative AI fundamentals, Microsoft Copilot, machine-learning basics, data fundamentals and responsible AI — so you can check your understanding after (or while) working through the courses. It is independent of Microsoft and LinkedIn, and the pass mark below is our own study target, not an official one.",
    sections: [
      { h: "About this practice test", body: `
        <ul>
          <li><b>Format:</b> 164 multiple-choice questions, one best answer each</li>
          <li><b>Scoring:</b> instant, with a per-topic breakdown so you can see which area to revisit</li>
          <li><b>Study target:</b> 70% means you have the basics; aim for 85%+ before you move on</li>
          <li><b>Untimed:</b> work at your own pace — about 90 minutes is a sensible session</li>
        </ul>
        <div class="callout"><b>Study tip</b> Don't memorize answers. Scenario wording varies, so focus on the reasoning — every question here shows an explanation after you finish.</div>` },
      { h: "Topics covered", body: `
        <ul>
          <li><b>Copilot in Microsoft 365</b> — summaries and action items, Draft/Rewrite in Word, PowerPoint and Excel features, the OneDrive/SharePoint requirement, permissions and data security. <i>Copilot's interface changes often, so confirm button names against Microsoft's current documentation.</i></li>
          <li><b>Generative AI fundamentals</b> — LLMs and tokens, transformers, foundation models, self-supervised learning, hallucinations, GANs and VAEs, GPUs, prompt engineering (persona, chain-of-thought, structure), AI agents</li>
          <li><b>Machine learning basics</b> — supervised vs unsupervised vs reinforcement learning, backpropagation, predictive vs generative vs discriminative AI, AI history</li>
          <li><b>Responsible AI &amp; ethics</b> — transparency, algorithmic traceability, bias, alignment, privacy, copyright and fair use, governance, risk-based regulation, green AI</li>
          <li><b>Data fundamentals</b> — validation, access control, training-data quality, "garbage in, garbage out"</li>
        </ul>` },
      { h: "Practice test (164 questions)", body: `
        <p>Answer every question you can, then press <b>Finish &amp; score</b>. Correct answers and explanations appear under each question.</p>
        <div id="mocktest" data-bank="GENAI_QUESTIONS"></div>` },
      { h: "After the test: a study checklist", body: `
        <ul>
          <li>Retake the test until you score 85%+ twice in a row</li>
          <li>Start your revision with the lowest-scoring topic in your breakdown — Responsible AI &amp; ethics is the largest group here, so it deserves the most time</li>
          <li>Know the Copilot specifics: summaries in Outlook and Teams, the OneDrive/SharePoint requirement for Excel, and that Copilot only surfaces data you already have permission to see</li>
          <li>If an answer feels memorized, re-read its explanation until you can justify it in your own words</li>
        </ul>` }
    ]
  },
  {
    slug: "lean-six-sigma-practice-test",
    title: "Lean Six Sigma & Sustainability: 15-Question Practice Test",
    category: "Lean Six Sigma",
    icon: "L6",
    gradient: "linear-gradient(135deg,#276749,#2f9e63)",
    date: "Sep 27, 2026",
    readTime: "15 questions",
    excerpt: "15 practice questions on the 5-Whys, PDCA, the DOWNTIME wastes, stakeholder engagement and the pillars of sustainability — with instant scoring and explanations.",
    intro: "Process-improvement and sustainability courses often end each chapter with short quizzes that many learners find trickier than expected. This unofficial 15-question practice test covers the core ideas — root-cause analysis, Lean wastes, the PDCA cycle, stakeholder engagement and sustainability fundamentals — with an explanation for every answer.",
    sections: [
      { h: "About this practice test", body: `
        <ul>
          <li><b>Format:</b> 15 multiple-choice questions, one best answer each</li>
          <li><b>Scoring:</b> instant, with a per-topic breakdown and explanations</li>
          <li><b>Trap to watch:</b> several questions ask which option is <i>NOT</i> correct — read carefully</li>
          <li><b>Wording varies:</b> different courses and frameworks word some ideas differently (for example, the pillars of sustainability). Where that matters, the explanation says which framing we follow.</li>
        </ul>` },
      { h: "Topics covered", body: `
        <ul>
          <li><b>Root-cause analysis</b> — the 5-Whys technique</li>
          <li><b>Lean fundamentals</b> — gemba, continuous improvement, visual management, and the DOWNTIME wastes</li>
          <li><b>PDCA cycle</b> — Plan-Do-Check-Act for continuous improvement</li>
          <li><b>Lean Six Sigma goal</b> — process improvement, defect reduction, waste minimization</li>
          <li><b>Sustainability</b> — project goals and charters, stakeholder engagement, the pillars of sustainability, global interconnection, and the NAE's 14 Grand Challenges for Engineering</li>
        </ul>` },
      { h: "Practice test (15 questions)", body: `
        <p>Answer all 15 questions, then press <b>Finish &amp; score</b>. The set is small enough to master completely, so aim for 100%.</p>
        <div id="mocktest-lean" data-bank="LEAN_QUESTIONS"></div>` },
      { h: "After the test: a study checklist", body: `
        <ul>
          <li>Memorize the DOWNTIME wastes — Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Extra-processing</li>
          <li>Learn the three pillars of sustainability: social, environmental and economic (people, planet, profit)</li>
          <li>Be able to name several of the NAE Grand Challenges — better medicines, secure cyberspace and clean water are all on the list</li>
          <li>On "which is NOT" questions, eliminate the three true statements first</li>
        </ul>` }
    ]
  }
];
