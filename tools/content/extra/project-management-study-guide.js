module.exports = [
  { h: "Scrum, Waterfall and Kanban: choosing by the shape of the work", body: `
<p>Interviewers rarely want a definition of each method. They want to hear <i>when</i> you would pick one. Waterfall completes phases in order (requirements, design, build, test, release) and suits work where scope is stable and changes are expensive, such as building a bridge. Scrum delivers in short cycles and suits work where learning from early results should change what you build next. Kanban has no fixed cycle at all: work flows continuously across a board and you limit how many items sit in each column.</p>
<p>The 2020 Scrum Guide describes a single <b>Scrum Team</b> with no sub-teams or hierarchy. It contains three accountabilities:</p>
<ul>
<li><b>Product Owner</b>: maximises the value of the product and manages the Product Backlog.</li>
<li><b>Scrum Master</b>: helps the team and the organisation understand and use Scrum; a coach, not a manager.</li>
<li><b>Developers</b>: the people who create any part of a usable Increment each Sprint.</li>
</ul>
<p>The five events are the Sprint (a container for all the others, one month or less), Sprint Planning, the Daily Scrum (15 minutes), the Sprint Review and the Sprint Retrospective. There are three artifacts, each paired with a commitment: the Product Backlog with the <b>Product Goal</b>, the Sprint Backlog with the <b>Sprint Goal</b>, and the Increment with the <b>Definition of Done</b>.</p>
<table>
<tr><th>Situation</th><th>Better fit</th><th>Why</th></tr>
<tr><td>Fixed regulatory scope, signed-off specification</td><td>Waterfall</td><td>Little to learn along the way</td></tr>
<tr><td>New product, unclear what users want</td><td>Scrum</td><td>Each Sprint gives feedback</td></tr>
<tr><td>Support requests arriving daily</td><td>Kanban</td><td>Continuous flow, no planning cycle needed</td></tr>
</table>
<div class="callout"><b>Common mistake</b> Calling the Scrum Master the team's boss, or treating the Daily Scrum as a status report to the manager. It is a planning meeting for the Developers.</div>` },
  { h: "Critical path and float: a worked example", body: `
<p>Take six tasks. Durations are in days.</p>
<table>
<tr><th>Task</th><th>Duration</th><th>Predecessors</th></tr>
<tr><td>A</td><td>3</td><td>none</td></tr>
<tr><td>B</td><td>4</td><td>A</td></tr>
<tr><td>C</td><td>2</td><td>A</td></tr>
<tr><td>D</td><td>5</td><td>B</td></tr>
<tr><td>E</td><td>3</td><td>C</td></tr>
<tr><td>F</td><td>2</td><td>D, E</td></tr>
</table>
<p>List every path from start to finish and add the durations. A-B-D-F = 3+4+5+2 = <b>14</b>. A-C-E-F = 3+2+3+2 = <b>10</b>. The longest path is the critical path, so the project takes at least 14 days and tasks A, B, D and F have zero float.</p>
<p>Float is how long a task can slip without delaying the finish. Task E can start at day 5 at the earliest (after A and C). F cannot begin until D finishes at day 12, so E may finish as late as day 12 instead of day 8. Its total float is 12 - 8 = <b>4 days</b>. Task C also has 4 days of float, but that float is shared: if C uses all 4, E has none left.</p>
<ul>
<li>Delay on a critical task delays the project day for day.</li>
<li>To shorten the project you must shorten a critical task, and the critical path may then switch to the other route.</li>
<li><b>Crashing</b> adds resources to critical tasks and raises cost. <b>Fast tracking</b> overlaps tasks and raises risk.</li>
</ul>
<div class="callout tip"><b>Interview reasoning</b> Asked "what if B slips by 2 days?", answer: critical task, so the end moves from day 14 to day 16. Asked the same about E, answer: absorbed by float, no change.</div>` },
  { h: "Earned value worked example and the control documents", body: `
<p>Project: budget at completion (BAC) of 100,000 over 10 weeks, spread evenly. At the end of week 4 you review. Planned value (PV) is 4/10 of BAC = 40,000. The team has finished work that was budgeted at 30,000, so earned value (EV) = 30,000. Actual cost (AC) is 36,000.</p>
<table>
<tr><th>Measure</th><th>Calculation</th><th>Result</th><th>Reading</th></tr>
<tr><td>CPI</td><td>EV / AC = 30,000 / 36,000</td><td>0.83</td><td>Each unit spent returns 0.83 of work</td></tr>
<tr><td>SPI</td><td>EV / PV = 30,000 / 40,000</td><td>0.75</td><td>Behind schedule</td></tr>
<tr><td>CV</td><td>EV - AC</td><td>-6,000</td><td>Over budget</td></tr>
<tr><td>SV</td><td>EV - PV</td><td>-10,000</td><td>Behind plan</td></tr>
</table>
<p>If you assume the current cost efficiency continues, EAC = BAC / CPI = 100,000 / 0.8333 = 120,000. Below 1 is bad for both indexes; above 1 is good. A frequent slip is dividing the wrong way round, so remember that EV is always the numerator.</p>
<p><b>RACI</b> clarifies who does what. For the task "Approve the budget": Finance Lead = <b>R</b> (Responsible, does the work), Sponsor = <b>A</b> (Accountable, one person only, signs off), Project Manager = <b>C</b> (Consulted), Team = <b>I</b> (Informed). A common error is two As on one row, which means nobody truly owns the decision.</p>
<p>A <b>risk register</b> row holds the risk, probability, impact, a score (probability multiplied by impact), a response (avoid, mitigate, transfer, accept), an owner and a status. Write risks as "Because of X, Y may happen, causing Z", not as a vague worry. An <b>issue</b> has already happened; a risk has not.</p>` },
  { h: "Stakeholders, change control and how to practise", body: `
<p>Stakeholder analysis often uses a power and interest grid. High power, high interest: manage closely. High power, low interest: keep satisfied. Low power, high interest: keep informed. Low power, low interest: monitor. The grid is a starting point; revisit it, because a stakeholder's position changes during a project.</p>
<p>Scenario: midway through, a sponsor asks for an extra report. Do not simply say yes or no. A sound sequence is: record the request, assess its impact on scope, schedule, cost and risk, bring it to the agreed change control process (a change request, reviewed by whoever has authority, such as a change control board), then update the baselines and tell stakeholders if it is approved. Unmanaged additions are <b>scope creep</b>. In an Agile project the equivalent is adding the item to the Product Backlog and letting the Product Owner prioritise it, rather than inserting it into a running Sprint.</p>
<p><b>How to practise</b></p>
<ol>
<li>Redraw the critical path example with new durations and find the float by hand.</li>
<li>Invent EV numbers for a small personal project and compute all four measures.</li>
<li>Write a five-row risk register for a house move.</li>
<li>Explain Scrum aloud in two minutes without notes.</li>
</ol>
<p><b>Glossary</b>: baseline is the approved plan used for comparison. Slack is another word for float. Increment is the usable, done result of a Sprint. Velocity is a team's observed rate of completed work, used only for its own forecasting, never to compare teams.</p>` },
  { h: "Common exam and interview traps", body: `
<p>Most wrong answers in project management come from mixing up two similar ideas. Keep these pairs straight.</p>
<table>
<tr><th>Pair</th><th>Difference</th></tr>
<tr><td>Risk and issue</td><td>A risk might happen; an issue is happening now and needs action, not analysis</td></tr>
<tr><td>Product Goal and Sprint Goal</td><td>The Product Goal is the long-term target for the product; the Sprint Goal is the single purpose of one Sprint</td></tr>
<tr><td>Definition of Done and acceptance criteria</td><td>Done applies to every item and sets the quality bar; acceptance criteria are specific to one backlog item</td></tr>
<tr><td>Crashing and fast tracking</td><td>Crashing adds resources (more cost); fast tracking overlaps tasks (more risk)</td></tr>
<tr><td>Responsible and Accountable</td><td>Responsible does the work and may be several people; Accountable answers for the outcome and is one person</td></tr>
</table>
<p>Scenario: the Sprint is halfway through and a stakeholder wants a new feature added. Weak answer: "Add it, the customer is always right." Stronger answer: the Developers own the Sprint Backlog during the Sprint, so the request goes to the Product Owner, who may order it into the Product Backlog for a later Sprint. Only if it makes the Sprint Goal obsolete should the Product Owner consider cancelling the Sprint.</p>
<p>Scenario: SPI is 0.75 but CPI is 1.1. The project is behind schedule yet spending efficiently, which can mean under-resourcing. A good manager asks <i>why</i> before choosing a fix, since adding people to a late task does not always speed it up.</p>
<div class="callout tip"><b>Habit</b> In any calculation question, write the formula first, substitute the numbers second, and state in words what the result means. Examiners and interviewers reward the reading as much as the arithmetic.</div>` }
];
