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
      { h: "Practice questions", body: `
        <p>Test yourself. Select an answer, then check the explanation.</p>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 3</span><span>Functions</span></div>
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
          <div class="q-head"><span>Question 2 of 3</span><span>Lookups</span></div>
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
          <div class="q-head"><span>Question 3 of 3</span><span>Pivot Tables</span></div>
          <div class="q-body">
            <p class="q-text">In a pivot table, you want the number of unique customers per product, not the number of orders. What do you need?</p>
            <label class="opt"><input type="radio" name="q3"> Change the value field to Count of Customer</label>
            <label class="opt"><input type="radio" name="q3"> Use Sum of Customer instead</label>
            <label class="opt" data-correct><input type="radio" name="q3"> Add the data to the Data Model and use Distinct Count</label>
            <label class="opt"><input type="radio" name="q3"> Group the Customer field</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Plain "Count" counts rows, so repeat customers are counted multiple times. <b>Distinct Count</b> is only available when the pivot table is based on the Data Model (check "Add this data to the Data Model" when inserting).</div>
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
      { h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 3</span><span>Data Types</span></div>
          <div class="q-body">
            <p class="q-text">Which of these is immutable?</p>
            <label class="opt"><input type="radio" name="q1"> list</label>
            <label class="opt"><input type="radio" name="q1"> dict</label>
            <label class="opt" data-correct><input type="radio" name="q1"> tuple</label>
            <label class="opt"><input type="radio" name="q1"> set</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Tuples cannot be modified after creation, so they can be dictionary keys and set members. Lists, dicts, and sets are all mutable.</div>
        </div>
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 2 of 3</span><span>Exceptions</span></div>
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
          <div class="q-head"><span>Question 3 of 3</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">What does <code>*args</code> allow in a function definition?</p>
            <label class="opt" data-correct><input type="radio" name="q3"> Accept any number of positional arguments as a tuple</label>
            <label class="opt"><input type="radio" name="q3"> Accept any number of keyword arguments as a dict</label>
            <label class="opt"><input type="radio" name="q3"> Unpack a list into separate arguments</label>
            <label class="opt"><input type="radio" name="q3"> Make the argument optional</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>*args</code> collects extra positional arguments into a tuple. Collecting keyword arguments into a dict is <code>**kwargs</code> — the two are frequently confused in questions.</div>
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
      { h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 3</span><span>Types</span></div>
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
          <div class="q-head"><span>Question 2 of 3</span><span>Array Methods</span></div>
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
          <div class="q-head"><span>Question 3 of 3</span><span>Functions</span></div>
          <div class="q-body">
            <p class="q-text">What makes arrow functions different from regular functions regarding <code>this</code>?</p>
            <label class="opt"><input type="radio" name="q3"> They bind this to the window object</label>
            <label class="opt" data-correct><input type="radio" name="q3"> They inherit this from the surrounding (lexical) scope</label>
            <label class="opt"><input type="radio" name="q3"> They create a new this like regular functions</label>
            <label class="opt"><input type="radio" name="q3"> They cannot use this at all</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Arrow functions have no own <code>this</code> — they capture it lexically from the enclosing context, which is exactly why they're preferred for callbacks and event handlers inside classes and methods.</div>
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
      { h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 3</span><span>Frameworks</span></div>
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
          <div class="q-head"><span>Question 2 of 3</span><span>Agile</span></div>
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
          <div class="q-head"><span>Question 3 of 3</span><span>Scheduling</span></div>
          <div class="q-body">
            <p class="q-text">What does the critical path of a project determine?</p>
            <label class="opt"><input type="radio" name="q3"> The tasks with the highest cost</label>
            <label class="opt"><input type="radio" name="q3"> The tasks assigned to senior staff</label>
            <label class="opt" data-correct><input type="radio" name="q3"> The shortest possible project duration</label>
            <label class="opt"><input type="radio" name="q3"> The order of stakeholder reviews</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The critical path is the longest chain of dependent tasks with zero slack. Any delay on it delays the whole project — hence it sets the minimum timeline.</div>
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
      { h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 3</span><span>Aggregation</span></div>
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
          <div class="q-head"><span>Question 2 of 3</span><span>JOINs</span></div>
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
          <div class="q-head"><span>Question 3 of 3</span><span>Window Functions</span></div>
          <div class="q-body">
            <p class="q-text">To number rows within each department by salary (highest first), you would use:</p>
            <label class="opt"><input type="radio" name="q3"> GROUP BY department ORDER BY salary DESC</label>
            <label class="opt" data-correct><input type="radio" name="q3"> ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC)</label>
            <label class="opt"><input type="radio" name="q3"> RANK() OVER (ORDER BY salary DESC)</label>
            <label class="opt"><input type="radio" name="q3"> COUNT(*) OVER (PARTITION BY department)</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> <code>PARTITION BY department</code> restarts numbering per department, and <code>ORDER BY salary DESC</code> puts the highest first. Plain GROUP BY would collapse rows and couldn't produce per-row numbers.</div>
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
          <li><b>CTR</b> = clicks ÷ impressions; <b>Bounce rate</b> = single-page sessions ÷ all sessions</li>
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
      { h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 3</span><span>SEO</span></div>
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
          <div class="q-head"><span>Question 2 of 3</span><span>Metrics</span></div>
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
          <div class="q-head"><span>Question 3 of 3</span><span>Testing</span></div>
          <div class="q-body">
            <p class="q-text">What is the main reason to avoid stopping an A/B test early?</p>
            <label class="opt"><input type="radio" name="q3"> It costs more per day</label>
            <label class="opt" data-correct><input type="radio" name="q3"> Early leads are often noise, inflating false-positive risk</label>
            <label class="opt"><input type="radio" name="q3"> Users will notice the test</label>
            <label class="opt"><input type="radio" name="q3"> It confuses search engines</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Early results fluctuate randomly ("peeking problem"). Stopping as soon as one variant leads dramatically increases the chance of declaring a winner that doesn't actually exist.</div>
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
      { h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 3</span><span>Basics</span></div>
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
          <div class="q-head"><span>Question 2 of 3</span><span>Undoing</span></div>
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
          <div class="q-head"><span>Question 3 of 3</span><span>Branching</span></div>
          <div class="q-body">
            <p class="q-text">What does <code>git checkout -b feature</code> do?</p>
            <label class="opt"><input type="radio" name="q3"> Creates a branch named "feature" only</label>
            <label class="opt" data-correct><input type="radio" name="q3"> Creates and switches to a new branch named "feature"</label>
            <label class="opt"><input type="radio" name="q3"> Switches to an existing branch named "feature"</label>
            <label class="opt"><input type="radio" name="q3"> Merges "feature" into the current branch</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The <code>-b</code> flag creates the branch and immediately checks it out — equivalent to <code>git branch feature</code> followed by <code>git checkout feature</code>. Modern Git also offers <code>git switch -c feature</code> for the same job.</div>
        </div>` },
      { h: "Final tips", body: `
        <ul>
          <li>Practice the "wrong branch" scenario: you committed on the wrong branch → <code>git branch newbranch</code>, then <code>git reset --hard HEAD~1</code>, then <code>git switch newbranch</code></li>
          <li>Know <code>git stash</code> / <code>stash pop</code> for parking unfinished work</li>
          <li>Understand <code>.gitignore</code> purpose — ignoring build artifacts and secrets</li>
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
      { h: "Practice questions", body: `
        <div class="quiz" data-quiz>
          <div class="q-head"><span>Question 1 of 3</span><span>Masters</span></div>
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
          <div class="q-head"><span>Question 2 of 3</span><span>Presenting</span></div>
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
          <div class="q-head"><span>Question 3 of 3</span><span>Objects</span></div>
          <div class="q-body">
            <p class="q-text">You want to animate an object smoothly moving between its position on one slide and its position on the next. Best tool?</p>
            <label class="opt"><input type="radio" name="q3"> A motion path animation</label>
            <label class="opt"><input type="radio" name="q3"> The Fly In entrance effect</label>
            <label class="opt" data-correct><input type="radio" name="q3"> The Morph transition</label>
            <label class="opt"><input type="radio" name="q3"> Triggered animations</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Morph interpolates position/size/style changes of matching objects across consecutive slides — perfect for smooth movement. Motion paths animate within one slide only. (Morph is available in PowerPoint 2019 and Microsoft 365.)</div>
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
    title: "Career Essentials in Generative AI: 125-Question Practice Test",
    category: "Generative AI",
    icon: "AI",
    gradient: "linear-gradient(135deg,#0A66C2,#7b5cd6)",
    date: "Sep 21, 2026",
    readTime: "125 questions",
    excerpt: "An unofficial 125-question practice test on generative AI: Copilot in Microsoft 365, LLMs, GANs and VAEs, prompt engineering, machine-learning types, data fundamentals and AI ethics — with instant scoring, a per-topic breakdown and explanations.",
    intro: "\"Career Essentials in Generative AI\" is a free learning path from Microsoft and LinkedIn Learning. This unofficial practice test covers the same ground — generative AI fundamentals, Microsoft Copilot, machine-learning basics, data fundamentals and responsible AI — so you can check your understanding after (or while) working through the courses. It is independent of Microsoft and LinkedIn, and the pass mark below is our own study target, not an official one.",
    sections: [
      { h: "About this practice test", body: `
        <ul>
          <li><b>Format:</b> 125 multiple-choice questions, one best answer each</li>
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
      { h: "Practice test (125 questions)", body: `
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
