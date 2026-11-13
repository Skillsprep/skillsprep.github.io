module.exports = [
  { h: "DMAIC phases with a worked example", body: `
<p>DMAIC is the five-phase problem-solving structure of Six Sigma, used when an existing process performs badly and the cause is not yet known: <b>Define, Measure, Analyze, Improve, Control</b>. The worked example below is illustrative; the figures are invented to show the logic.</p>
<p>Scenario: a service team notices that many customer orders need correction after entry.</p>
<table>
<tr><th>Phase</th><th>Purpose</th><th>Example activity</th></tr>
<tr><td>Define</td><td>Clarify the problem, scope, customer need and goal</td><td>Charter: "Reduce order-entry errors in the online order team". Name the sponsor and the customer requirement: correct orders on first entry.</td></tr>
<tr><td>Measure</td><td>Establish a baseline with reliable data</td><td>Count orders checked and orders with errors for four weeks; confirm everyone defines "error" the same way. Suppose 8 of every 100 orders contain an error.</td></tr>
<tr><td>Analyze</td><td>Find and verify root causes</td><td>Sort errors by type with a Pareto chart; find most come from free-text address fields. Use 5-Whys to confirm.</td></tr>
<tr><td>Improve</td><td>Test and implement solutions</td><td>Pilot dropdown fields and automatic address checks; compare error rates with the baseline.</td></tr>
<tr><td>Control</td><td>Hold the gains</td><td>Update the procedure, train staff, add a control chart and name an owner who reviews it monthly.</td></tr>
</table>
<p>The key discipline is that solutions come <i>after</i> data and root cause, never before.</p>
<p>Each phase normally ends with a review, sometimes called a tollgate, where the sponsor and team confirm the work is complete before moving on. In the example, the team would not leave Define until the problem statement, scope and goal were agreed, and would not start Improve until the Analyze phase had verified, with data, that address-field entry really caused most errors. Skipping these checks is how teams end up solving the wrong problem. Also note that DMAIC is not always strictly linear: findings in Analyze may send the team back to Measure for better data.</p>
` },
  { h: "The eight wastes (DOWNTIME), 5S and Kaizen", body: `
<p>Lean defines waste as any activity that consumes resources without adding value the customer would pay for. The eight wastes are remembered by the acronym <b>DOWNTIME</b>:</p>
<table>
<tr><th>Letter</th><th>Waste</th><th>Workplace example</th></tr>
<tr><td>D</td><td>Defects</td><td>Invoices that must be corrected and reissued</td></tr>
<tr><td>O</td><td>Overproduction</td><td>Printing 500 forms when 100 are needed</td></tr>
<tr><td>W</td><td>Waiting</td><td>Staff idle until an approval arrives</td></tr>
<tr><td>N</td><td>Non-utilized talent</td><td>A skilled analyst only doing data entry</td></tr>
<tr><td>T</td><td>Transportation</td><td>Moving materials or files between distant sites without need</td></tr>
<tr><td>I</td><td>Inventory</td><td>Excess stock or a growing backlog of unprocessed requests</td></tr>
<tr><td>M</td><td>Motion</td><td>Walking to a distant printer or searching for tools</td></tr>
<tr><td>E</td><td>Extra-processing</td><td>Entering the same data into two systems</td></tr>
</table>
<p><b>5S</b> organises the workplace in five steps: <b>Sort</b> (remove what is not needed), <b>Set in order</b> (a place for everything), <b>Shine</b> (clean and inspect), <b>Standardize</b> (make the rules visible and consistent) and <b>Sustain</b> (build the habit and audit it).</p>
<p><b>Kaizen</b> means continuous improvement through many small changes made by the people doing the work. A kaizen event is a short, focused team effort on one process, but the idea is a daily habit, not a one-off project.</p>
` },
  { h: "Value-stream mapping, takt time, PDCA and DMAIC", body: `
<p>A <b>value-stream map</b> shows every step that turns a request or material into a delivered product, with the information flow that controls it. For each step you record process time, waiting time, and often inventory or queue size. Steps are then classed as value-added, necessary non-value-added, or waste. Maps are drawn for the <i>current state</i> first, then a <i>future state</i> that removes the waste.</p>
<p><b>Takt time</b> is the pace of production needed to meet customer demand: available working time divided by customer demand. If a team has 450 available minutes per day and customers need 90 units, takt time is 450 / 90 = 5 minutes per unit.</p>
<p><b>PDCA</b> (Plan, Do, Check, Act) is a four-step loop for continuous improvement: plan a change, try it on a small scale, check the results, then adopt or adjust it. <b>DMAIC</b> is a more structured five-phase method with heavy use of data and statistics, suited to problems whose cause is unknown or complex.</p>
<table>
<tr><th>Feature</th><th>PDCA</th><th>DMAIC</th></tr>
<tr><td>Steps</td><td>4</td><td>5</td></tr>
<tr><td>Best for</td><td>Ongoing small improvements and quick trials</td><td>Defined projects with data-driven root cause analysis</td></tr>
<tr><td>Rigour</td><td>Lightweight</td><td>Formal charter, baseline, analysis and control plan</td></tr>
</table>
` },
  { h: "5-Whys versus the fishbone diagram", body: `
<p>Both tools look for root causes. <b>5-Whys</b> follows a single chain of causes by asking "why?" repeatedly; five is a guide, not a rule. It is fast and works best for simple problems with one likely path.</p>
<p>Example: a delivery was late. <i>Why?</i> The parcel missed the courier pickup. <i>Why?</i> Packing finished late. <i>Why?</i> The label printer was not working. <i>Why?</i> It ran out of ribbon. <i>Why?</i> No one owns reordering supplies. The root cause is a missing ownership rule, not a slow packer.</p>
<p>A <b>fishbone (Ishikawa or cause-and-effect) diagram</b> explores many possible causes at once. The problem is the fish head; the main bones are categories such as Methods, Machines, Materials, People, Measurement and Environment, and the team brainstorms causes under each. It suits complex problems with several contributing factors. The usual sequence is to use a fishbone to map possibilities, verify the likely ones with data, and then use 5-Whys to drill into the most probable branch. A common 5-Whys mistake is stopping at a person ("the packer was careless"); a good root cause usually points to a process, rule or system that can be fixed. Another is accepting an answer without evidence, so check each "because" against facts.</p>
` },
  { h: "Sustainability pillars and stakeholder engagement", body: `
<p>The <b>triple bottom line</b> asks organisations to measure success on three dimensions: <b>social</b> (people), <b>environmental</b> (planet) and <b>economic</b> (profit or prosperity). Lean and sustainability overlap, because removing waste usually cuts energy, materials and cost, but the framing is broader. Good projects state one goal for each pillar, or explain why one does not apply, and avoid improving one by quietly harming another.</p>
<p>Stakeholders are the people and groups who affect or are affected by the work: customers, employees, suppliers, regulators, communities and owners. Practical tips:</p>
<ul>
<li><b>Identify and map:</b> list stakeholders by their influence and interest to decide how closely to involve each.</li>
<li><b>Engage early:</b> involving people at the start builds ownership and surfaces information you would miss.</li>
<li><b>Communicate regularly and openly:</b> share progress, results and setbacks in plain language.</li>
<li><b>Listen and respond:</b> record concerns and show what changed because of them.</li>
<li><b>Define the goal first:</b> a clear project goal and charter keep discussions focused.</li>
</ul>
<div class="callout tip"><b>Exam habit</b> When two answers look plausible, pick the one that starts with defining the goal and involving stakeholders early.</div>
` }
];
