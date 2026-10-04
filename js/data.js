const POSTS = [
  {
    slug: "excel-assessment-guide",
    title: "LinkedIn Excel Assessment: Complete Study Guide (2026)",
    category: "Excel",
    icon: "XL",
    gradient: "linear-gradient(135deg,#1D6F42,#31a05f)",
    date: "Sep 5, 2026",
    readTime: "9 min read",
    excerpt: "Everything you need to pass the LinkedIn Excel skill assessment: functions, pivot tables, lookup formulas, and 3 practice questions with full explanations.",
    intro: "The LinkedIn Excel Skill Assessment is one of the most popular assessments on the platform. Passing it in the top 30% adds a verified badge to your profile. This guide covers the topics that appear most often, based on candidate reports, with practice questions to test yourself.",
    sections: [
      { h: "Topics you must know", body: `
        <p>The assessment focuses on practical, everyday spreadsheet work. These are the highest-frequency areas reported by candidates:</p>
        <ul>
          <li><b>Lookup functions</b> — <code>VLOOKUP</code>, <code>XLOOKUP</code>, <code>INDEX</code> + <code>MATCH</code></li>
          <li><b>Logical functions</b> — <code>IF</code>, <code>IFS</code>, <code>AND</code>, <code>OR</code>, <code>SWITCH</code></li>
          <li><b>Text functions</b> — <code>LEFT</code>, <code>RIGHT</code>, <code>MID</code>, <code>CONCAT</code>, <code>TRIM</code>, <code>TEXTSPLIT</code></li>
          <li><b>Pivot tables</b> — grouping, calculated fields, slicers, and value field settings</li>
          <li><b>Conditional formatting</b> — highlight cells rules, color scales, and icon sets</li>
          <li><b>Data tools</b> — remove duplicates, text to columns, data validation</li>
        </ul>` },
      { h: "VLOOKUP vs XLOOKUP", body: `
        <p>A classic trap question. <code>VLOOKUP</code> only searches the <b>first column</b> of a range and can only return columns to the <b>right</b>. <code>XLOOKUP</code> (Excel 365/2021) searches anywhere and returns from any column:</p>
        <pre><code>=XLOOKUP(A2, Sheet2!B:B, Sheet2!C:C, "Not found")</code></pre>
        <div class="callout"><b>Exam tip</b> If a question says "lookup value may not exist and you want a friendly message instead of #N/A", the answer is a function with a built-in <i>if not found</i> argument — that's <code>XLOOKUP</code> (or <code>IFERROR</code> wrapped around <code>VLOOKUP</code>).</div>` },
      { h: "Pivot table essentials", body: `
        <p>Expect scenario-based questions: "You have 10,000 rows of sales data and need the total per region per quarter." The correct answer is almost always a <b>pivot table</b>, with Region in Rows, Quarter in Columns, and Sum of Amount in Values.</p>
        <p>Know the difference between:</p>
        <ul>
          <li><b>Sum</b> — default for numeric data</li>
          <li><b>Count</b> — counts non-empty cells</li>
          <li><b>Distinct Count</b> — requires adding the data to the <i>Data Model</i></li>
        </ul>` },
      { h: "Practice questions", body: `
        <p>Try these before your assessment. Select an answer, then check the explanation.</p>
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
          <li>Practice the functions above hands-on — the assessment is scenario-based, not definition-based</li>
          <li>Skim LinkedIn Learning's free "Excel Essential Training" if any topic feels rusty</li>
          <li>The assessment is ~15 questions, untimed per question but time-limited overall — don't stall</li>
          <li>You can retake after 3 months if you don't pass, and you can choose to hide failed attempts from your profile</li>
        </ul>` }
    ]
  },
  {
    slug: "python-assessment-guide",
    title: "LinkedIn Python Assessment: What to Expect + Practice Quiz",
    category: "Python",
    icon: "PY",
    gradient: "linear-gradient(135deg,#2b6cb0,#3182ce)",
    date: "Sep 3, 2026",
    readTime: "8 min read",
    excerpt: "Data structures, comprehensions, exceptions, and decorators — the Python topics that dominate the LinkedIn assessment, with explained practice questions.",
    intro: "The LinkedIn Python Skill Assessment tests core language knowledge rather than frameworks. Candidates who pass typically have a solid grip on built-in data types, iteration, error handling, and a few intermediate features like comprehensions and decorators.",
    sections: [
      { h: "High-yield topics", body: `
        <p>Based on aggregated candidate reports, these areas appear most frequently:</p>
        <ul>
          <li><b>Lists, dicts, tuples, sets</b> — mutability, methods (<code>append</code>, <code>get</code>, <code>set</code> operations)</li>
          <li><b>List & dict comprehensions</b> — reading and writing them</li>
          <li><b>String methods</b> — <code>split</code>, <code>join</code>, <code>strip</code>, <code>replace</code>, slicing</li>
          <li><b>Exceptions</b> — <code>try/except/else/finally</code> flow</li>
          <li><b>Functions</b> — <code>*args</code>/<code>**kwargs</code>, default arguments, lambda, scope (<code>global</code>)</li>
          <li><b>Decorators</b> — basic understanding of <code>@wrapper</code> syntax</li>
          <li><b>OOP basics</b> — <code>__init__</code>, <code>self</code>, inheritance, <code>super()</code></li>
        </ul>` },
      { h: "The classic mutable default argument trap", body: `
        <p>This pattern shows up constantly in assessments. What does this print?</p>
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
          <li>Run code snippets mentally — most questions ask "what is the output?"</li>
          <li>Review the official Python tutorial's sections on data structures and exceptions</li>
          <li>Know the difference between <code>==</code> and <code>is</code> (<code>is</code> compares identity)</li>
          <li>Don't panic on decorator questions — usually only 1–2, and basic syntax suffices</li>
        </ul>` }
    ]
  },
  {
    slug: "javascript-assessment-guide",
    title: "LinkedIn JavaScript Assessment: Key Concepts Explained",
    category: "JavaScript",
    icon: "JS",
    gradient: "linear-gradient(135deg,#b7791f,#ecc94b)",
    date: "Aug 28, 2026",
    readTime: "8 min read",
    excerpt: "Hoisting, closures, == vs ===, arrow functions, and promises — the JavaScript fundamentals that decide your LinkedIn assessment result.",
    intro: "The LinkedIn JavaScript Skill Assessment leans heavily on language fundamentals. Questions about output, scope, and type coercion are the most common — framework knowledge is rarely tested.",
    sections: [
      { h: "Core topics ranked by frequency", body: `
        <ul>
          <li><b>var vs let vs const</b> — scoping, hoisting, and the temporal dead zone</li>
          <li><b>Type coercion</b> — <code>==</code> vs <code>===</code>, truthy/falsy values</li>
          <li><b>Closures</b> — what they are and how they capture variables</li>
          <li><b>Arrow functions</b> — lexical <code>this</code> (no own <code>this</code> binding)</li>
          <li><b>Promises & async/await</b> — order of execution, <code>.then()</code> chaining</li>
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
          <div class="q-explain"><b>Why:</b> Arrow functions have no own <code>this</code> — they capture it lexically from the enclosing context, which is exactly why they're preferred for callbacks in class components and event handlers.</div>
        </div>` },
      { h: "Last-minute tips", body: `
        <ul>
          <li>Practice reading short code snippets and predicting output — that is most of the exam</li>
          <li>Review <code>map</code> vs <code>forEach</code> vs <code>reduce</code> — guaranteed to appear</li>
          <li>Understand closure examples like a counter function</li>
          <li>Remember: assessments are not proctored, and you choose whether results show on your profile</li>
        </ul>` }
    ]
  },
  {
    slug: "project-management-assessment-guide",
    title: "LinkedIn Project Management Assessment: Concepts That Matter",
    category: "Project Management",
    icon: "PM",
    gradient: "linear-gradient(135deg,#6b46c1,#9f7aea)",
    date: "Aug 22, 2026",
    readTime: "7 min read",
    excerpt: "Agile vs Waterfall, the Iron Triangle, RACI matrices, and risk management — study the PM concepts LinkedIn actually tests.",
    intro: "The LinkedIn Project Management Skill Assessment mixes methodology knowledge with scenario judgment. Unlike the coding assessments, many answers hinge on choosing the 'best practice' response rather than a strictly right one.",
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
        <p>Know Scrum roles: <b>Product Owner</b> (prioritizes backlog), <b>Scrum Master</b> (removes impediments, facilitates), and the <b>Development Team</b> (self-organizing).</p>` },
      { h: "Key frameworks to recognize", body: `
        <ul>
          <li><b>Iron Triangle</b> — Scope, Time, Cost (with Quality in the center). Changing one affects the others.</li>
          <li><b>RACI matrix</b> — Responsible, Accountable, Consulted, Informed. Exactly one A per task.</li>
          <li><b>Critical Path</b> — the longest sequence of dependent tasks; it determines the project's minimum duration.</li>
          <li><b>Risk matrix</b> — Probability × Impact. High/high risks get mitigation plans.</li>
          <li><b>Triple constraint trade-offs</b> — scenario: deadline moved up → cut scope or add resources.</li>
        </ul>` },
      { h: "Scenario question strategy", body: `
        <p>Many questions describe a project problem and ask what the PM should do first. The LinkedIn-preferred answers usually follow this order of preference:</p>
        <ol>
          <li><b>Analyze/assess</b> the situation (gather facts, check impact)</li>
          <li><b>Communicate</b> with stakeholders</li>
          <li><b>Then</b> act (escalate, change plan, add resources)</li>
        </ol>
        <div class="callout"><b>Pattern</b> Answers that immediately escalate to management or blame team members are almost always wrong. Answers starting with analysis or communication are usually right.</div>` },
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
            <label class="opt"><input type="radio" name="q2"> Development Team</label>
            <label class="opt"><input type="radio" name="q2"> Project Sponsor</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> The Product Owner owns the backlog and its ordering by business value. The Scrum Master facilitates the process but doesn't prioritize, and the team decides how much work to pull into a sprint.</div>
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
          <li>If you hold a PMP or CAPM, this assessment will feel easy — it covers similar ground</li>
          <li>Focus on "what should the PM do FIRST" patterns</li>
          <li>Brush up on Scrum ceremonies: sprint planning, daily standup, review, retrospective</li>
        </ul>` }
    ]
  },
  {
    slug: "sql-assessment-guide",
    title: "LinkedIn SQL Assessment: Queries You Should Master",
    category: "SQL",
    icon: "SQ",
    gradient: "linear-gradient(135deg,#2c5282,#4299e1)",
    date: "Aug 15, 2026",
    readTime: "8 min read",
    excerpt: "JOINs, GROUP BY, window functions, and subqueries — the SQL patterns behind most LinkedIn assessment questions, explained with examples.",
    intro: "The LinkedIn SQL Skill Assessment asks you to read and reason about queries more than to write them from scratch. JOIN types, aggregation, and the difference between WHERE and HAVING appear in nearly every sitting.",
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
      { h: "WHERE vs HAVING — the #1 trap", body: `
        <pre><code>SELECT department, AVG(salary)
FROM employees
WHERE status = 'active'      -- filters ROWS first
GROUP BY department
HAVING AVG(salary) > 50000;  -- filters GROUPS after</code></pre>
        <p>You cannot use an aggregate in <code>WHERE</code> — the aggregate doesn't exist yet when WHERE runs. Questions testing this appear constantly.</p>
        <div class="callout"><b>Memory trick</b> WHERE = filter rows → then GROUP → then HAVING = filter groups.</div>` },
      { h: "JOIN types visualized", body: `
        <p>Given tables <code>customers</code> and <code>orders</code>:</p>
        <ul>
          <li><b>INNER JOIN</b> — only customers who have orders</li>
          <li><b>LEFT JOIN</b> — all customers, with NULLs where no order exists (find customers who never ordered: <code>WHERE o.id IS NULL</code>)</li>
          <li><b>FULL OUTER</b> — everyone from both sides, NULLs filling gaps</li>
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
          <li>Window functions appear in ~2–3 questions; understand PARTITION BY vs plain ORDER BY</li>
        </ul>` }
    ]
  },
  {
    slug: "digital-marketing-assessment-guide",
    title: "LinkedIn Digital Marketing Assessment: Study Notes",
    category: "Marketing",
    icon: "DM",
    gradient: "linear-gradient(135deg,#c53030,#f56565)",
    date: "Aug 8, 2026",
    readTime: "7 min read",
    excerpt: "SEO fundamentals, funnel metrics, A/B testing, and campaign attribution — condensed notes for the LinkedIn marketing assessment.",
    intro: "The LinkedIn Digital Marketing Skill Assessment covers a broad surface: SEO, paid media, email, analytics, and strategy. The questions tend toward definitions applied to realistic campaign scenarios.",
    sections: [
      { h: "SEO essentials", body: `
        <ul>
          <li><b>On-page SEO</b> — title tags, meta descriptions, headings, internal links, keyword usage</li>
          <li><b>Off-page SEO</b> — backlinks from other sites (biggest ranking factor)</li>
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
            <p class="q-text">Which factor most directly increases a website's domain authority?</p>
            <label class="opt"><input type="radio" name="q1"> Adding more pages</label>
            <label class="opt" data-correct><input type="radio" name="q1"> Earning backlinks from reputable sites</label>
            <label class="opt"><input type="radio" name="q1"> Using more images</label>
            <label class="opt"><input type="radio" name="q1"> Posting more frequently</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Backlinks act as "votes of confidence" and remain the strongest authority signal. Volume of pages or posts without quality doesn't move authority.</div>
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
          <div class="q-explain"><b>Why:</b> ROAS = Revenue ÷ Ad Spend = 8000 ÷ 2000 = 4. The $6,000 figure is profit, not ROAS. A 4:1 ROAS is a common benchmark for healthy paid campaigns.</div>
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
          <li>Memorize the metric formulas — at least one calculation question is nearly guaranteed</li>
          <li>Know the difference between remarketing (past visitors) and prospecting (new audiences)</li>
          <li>Review email terms: open rate, CTR, list segmentation, deliverability, CAN-SPAM/GDPR basics</li>
        </ul>` }
    ]
  },
  {
    slug: "git-github-assessment-guide",
    title: "LinkedIn Git Assessment: Commands and Concepts",
    category: "Git",
    icon: "GT",
    gradient: "linear-gradient(135deg,#c05621,#ed8936)",
    date: "Jul 30, 2026",
    readTime: "7 min read",
    excerpt: "Branching, merging vs rebasing, staging, and undoing mistakes — the Git knowledge the LinkedIn assessment focuses on, with quizzes.",
    intro: "The LinkedIn Git Skill Assessment tests everyday version-control workflows. Questions often present a situation (" + '"you committed to the wrong branch"' + ") and ask for the correct command sequence.",
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
          <div class="q-explain"><b>Why:</b> The <code>-b</code> flag creates the branch and immediately checks it out — equivalent to <code>git branch feature</code> followed by <code>git checkout feature</code>.</div>
        </div>` },
      { h: "Final tips", body: `
        <ul>
          <li>Practice the "wrong branch" scenario: commit, <code>git branch newbranch</code>, <code>git reset --hard HEAD~1</code>, switch</li>
          <li>Know <code>git stash</code> / <code>stash pop</code> for parking unfinished work</li>
          <li>Understand <code>.gitignore</code> purpose — ignoring build artifacts and secrets</li>
        </ul>` }
    ]
  },
  {
    slug: "powerpoint-assessment-guide",
    title: "LinkedIn PowerPoint Assessment: Efficient Slide Skills",
    category: "PowerPoint",
    icon: "PP",
    gradient: "linear-gradient(135deg,#b03a2e,#e07b39)",
    date: "Jul 22, 2026",
    readTime: "6 min read",
    excerpt: "Slide masters, presenter view, SmartArt, and the design features LinkedIn's PowerPoint assessment actually tests.",
    intro: "The LinkedIn PowerPoint Skill Assessment focuses on productivity features — the things that separate casual users from efficient ones: masters, layouts, transitions, and presentation tools.",
    sections: [
      { h: "High-frequency features", body: `
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
        <div class="callout tip"><b>Exam answer</b> "Add a company logo to every slide" → put it on the Slide Master, not slide by slide.</div>` },
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
          <div class="q-explain"><b>Why:</b> Morph interpolates position/size/style changes of matching objects across consecutive slides — perfect for smooth movement. Motion paths animate within one slide only.</div>
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
    slug: "assessment-basics-faq",
    title: "LinkedIn Skill Assessments: How They Work (Complete FAQ)",
    category: "Getting Started",
    icon: "LI",
    gradient: "linear-gradient(135deg,#0A66C2,#4a90d9)",
    date: "Jul 15, 2026",
    readTime: "5 min read",
    excerpt: "How LinkedIn Skill Assessments work: scoring, badges, retakes, visibility settings, and whether they're worth your time.",
    intro: "Before diving into subject-specific prep, it helps to understand how LinkedIn Skill Assessments actually work — the rules, scoring, and what the badge means for your profile.",
    sections: [
      { h: "What is a LinkedIn Skill Assessment?", body: `
        <p>LinkedIn Skill Assessments are free, multiple-choice quizzes tied to skills on your profile. Passing (in the top 30%) earns a <b>verified skill badge</b> that displays next to that skill, signaling to recruiters that you've validated the skill on a standardized test.</p>
        <p>There are 100+ assessments covering technical skills (Python, Excel, AWS), design tools (Photoshop, Figma), and business skills (Project Management, Agile Methodologies).</p>` },
      { h: "How the assessment works", body: `
        <ul>
          <li><b>Format:</b> roughly 15 multiple-choice questions</li>
          <li><b>Time:</b> about 1.5 minutes per question on average</li>
          <li><b>Pass mark:</b> scoring in approximately the top 30% earns the badge</li>
          <li><b>Mode:</b> online, unproctored, open to anyone with a LinkedIn account</li>
        </ul>
        <p>You can take any assessment from your profile's Skills section — LinkedIn suggests them based on your listed skills and job title.</p>` },
      { h: "Retakes, visibility, and honesty", body: `
        <ul>
          <li><b>Retakes:</b> if you don't pass, you can retake the same assessment after a waiting period (about 3 months)</li>
          <li><b>Visibility:</b> you control whether results appear on your profile — you can hide a failed attempt entirely</li>
          <li><b>Removed badges:</b> LinkedIn may remove badges if cheating is detected (question dumps circulating online are monitored)</li>
          <li><b>Recruiter signal:</b> the badge appears in recruiter searches filtered by "verified skills," giving you a real visibility boost</li>
        </ul>
        <div class="callout"><b>Our advice</b> Study the concepts — like with the guides on this site — rather than memorizing answer dumps. The assessments change periodically, and genuine knowledge is what the badge is supposed to represent (and what interviews will test anyway).</div>` },
      { h: "Are they worth it?", body: `
        <p>For most professionals: yes, selectively.</p>
        <ul>
          <li><b>Job seekers:</b> badges make your profile more discoverable and credible in recruiter searches</li>
          <li><b>Career switchers:</b> a verified badge backs up self-taught skills on your resume</li>
          <li><b>Time cost:</b> 15–25 minutes per assessment — cheap for a profile upgrade</li>
        </ul>
        <p>The best strategy: take assessments in skills you already use daily, and study the guides here for anything rusty. Quality over quantity — a handful of relevant badges beats twenty random ones.</p>` },
      { h: "Quick facts", body: `
        <ul>
          <li>Free for all LinkedIn members</li>
          <li>No certificate download — the badge lives on your profile</li>
          <li>New assessments are added periodically; check the Skills section for the full list</li>
          <li>Skills endorsements from connections are separate (and weaker) than assessment badges</li>
        </ul>` }
    ]
  },
  {
    slug: "generative-ai-microsoft-linkedin-guide",
    title: "Career Essentials in Generative AI (Microsoft & LinkedIn): Full Mock Test",
    category: "Generative AI",
    icon: "AI",
    gradient: "linear-gradient(135deg,#0A66C2,#7b5cd6)",
    date: "Sep 21, 2026",
    readTime: "45 min read",
    excerpt: "All 125 real exam questions from the Career Essentials in Generative AI certification — Copilot, LLMs, GANs & VAEs, prompt engineering, machine learning types, and AI ethics — in one interactive mock test with instant scoring and explanations.",
    intro: "The \"Career Essentials in Generative AI\" learning path by Microsoft and LinkedIn is one of the most popular free AI certifications on LinkedIn Learning. The final assessment draws from five courses: What Is Generative AI?, Generative AI: The Evolution of Thoughtful Online Search, Streamlining Your Work with Microsoft Bing Chat, Ethics in the Age of Generative AI, and Introduction to Artificial Intelligence. This guide collects 122 real exam questions — organized exactly the way the exam is — into one full-length interactive mock test.",
    sections: [
      { h: "How the exam works", body: `
        <ul>
          <li><b>Format:</b> multiple choice, one best answer per question</li>
          <li><b>Length:</b> ~125 questions, drawn from all five courses</li>
          <li><b>Weighting:</b> ethics and responsible-AI scenarios make up the biggest share, followed by generative AI fundamentals and Copilot product questions</li>
          <li><b>Passing:</b> roughly 70%+; some questions repeat in different wording, so read carefully</li>
        </ul>
        <div class="callout"><b>Study tip</b> Don't memorize answers — the exam shuffles questions and rewords scenarios. Understand the reasoning: this mock test shows an explanation for every answer.</div>` },
      { h: "Topics you must know", body: `
        <p>Based on aggregated candidate reports, these areas dominate the assessment:</p>
        <ul>
          <li><b>Copilot in Microsoft 365</b> — what Copilot can do in Outlook, Word, Excel, PowerPoint, Teams (summaries, action items, OneDrive/SharePoint requirement, Work/Web tabs)</li>
          <li><b>Generative AI fundamentals</b> — LLMs, tokens, transformers, foundation models, self-supervised learning, hallucinations, prompt engineering (persona, chain-of-thought, structure)</li>
          <li><b>AI types</b> — supervised vs unsupervised vs reinforcement vs self-supervised; generative vs discriminative vs predictive</li>
          <li><b>AI agents</b> — tool access + feedback loop, autonomous multi-step task execution</li>
          <li><b>Ethics &amp; governance</b> — transparency, algorithmic traceability, bias, alignment, privacy, copyright/fair use, board responsibility, AI regulations (risk-based), green AI</li>
          <li><b>Data fundamentals</b> — validation, access control, training data quality, "garbage in, garbage out"</li>
        </ul>` },
      { h: "How to use this mock test", body: `
        <p>Answer all 125 questions at your own pace (suggested 90 minutes), then hit <b>Finish &amp; score</b>. You'll get your percentage, a pass/fail verdict, and every correct answer with an explanation so you can review your misses. Aim for 85%+ before sitting the real exam.</p>` },
      { h: "Full mock test (125 questions)", body: `
        <div id="mocktest" data-bank="GENAI_QUESTIONS"></div>` },
      { h: "Final preparation checklist", body: `
        <ul>
          <li>Retake this mock test until you score 85%+ twice in a row</li>
          <li>Review the <i>Ethics in the Age of Generative AI</i> course — it covers the largest share of scenario questions</li>
          <li>Know the Copilot specifics cold: Summary in Outlook, 'Draft with Copilot' in Word, OneDrive/SharePoint requirement in Excel, Work/Web tabs for licensing</li>
          <li>The real exam rewords scenarios — if an answer here feels memorized, re-read the explanation until the concept is clear</li>
        </ul>` }
    ]
  },
  {
    slug: "lean-six-sigma-sustainability-mock-test",
    title: "Lean Six Sigma & Sustainability (LinkedIn Learning): Mock Test",
    category: "Lean Six Sigma",
    icon: "L6",
    gradient: "linear-gradient(135deg,#2f855a,#68d391)",
    date: "Sep 27, 2026",
    readTime: "10 min read",
    excerpt: "15 real quiz questions from LinkedIn Learning's Lean Six Sigma and Sustainability courses — 5-Whys, PDCA, DOWNTIME waste, stakeholder engagement, and the triple contexts of sustainability — with verified answer keys and explanations.",
    intro: "LinkedIn Learning's process-improvement and sustainability courses (Lean Six Sigma fundamentals, continuous improvement, and sustainability strategy) end each chapter with short quizzes that many learners find trickier than expected. This mock test collects 15 real questions from those quizzes — with the answer keys verified against LinkedIn's own graded results — into one interactive practice test.",
    sections: [
      { h: "How these quizzes work", body: `
        <ul>
          <li><b>Format:</b> multiple choice, one best answer per question</li>
          <li><b>Length:</b> short chapter quizzes (typically 10 questions each); this mock test combines the highest-value questions</li>
          <li><b>Trap to watch:</b> several questions ask which option is <i>NOT</i> correct — read carefully</li>
          <li><b>Course quirks:</b> two questions have answer keys that differ from common textbook knowledge (sustainability contexts; the grand challenges list) — we flag both in the explanations so you pass the quiz <i>and</i> learn the real-world facts</li>
        </ul>` },
      { h: "Topics covered", body: `
        <ul>
          <li><b>Root cause analysis</b> — the 5-Whys technique</li>
          <li><b>Lean fundamentals</b> — gemba, continuous improvement, visual management, and the DOWNTIME wastes</li>
          <li><b>PDCA cycle</b> — Plan-Do-Check-Act for continuous improvement</li>
          <li><b>Lean Six Sigma goal</b> — process improvement, defect reduction, waste minimization</li>
          <li><b>Sustainability</b> — project goals and charters, stakeholder engagement and communication, the three contexts of sustainability, global interconnection, and the 14 grand challenges for engineering</li>
        </ul>` },
      { h: "How to use this mock test", body: `
        <p>Answer all 15 questions, then hit <b>Finish &amp; score</b>. You'll get your score, a pass/fail verdict, and every correct answer with an explanation. Aim for 100% — the question set is small enough to master completely.</p>` },
      { h: "Mock test (15 questions)", body: `
        <div id="mocktest-lean" data-bank="LEAN_QUESTIONS"></div>` },
      { h: "Final preparation checklist", body: `
        <ul>
          <li>Memorize the DOWNTIME wastes — Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Extra-processing</li>
          <li>Remember the two course-specific answer keys flagged in the explanations — they override textbook knowledge on this quiz</li>
          <li>On "which is NOT" questions, eliminate the three true statements first</li>
        </ul>` }
    ]
  }
];
