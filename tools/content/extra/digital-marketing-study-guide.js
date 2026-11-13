module.exports = [
  { h: "SEO in four layers", body: `
<p>Search engine optimisation is easier to reason about when you split it into four layers. Problems in a lower layer limit what the upper layers can achieve.</p>
<table>
<tr><th>Layer</th><th>Question it answers</th><th>Examples</th></tr>
<tr><td>Technical</td><td>Can search engines reach and understand the pages?</td><td>Crawlable links, sensible robots rules, working XML sitemap, fast mobile-friendly pages, HTTPS, no duplicate URLs for the same content</td></tr>
<tr><td>On-page</td><td>Does each page clearly say what it is about?</td><td>Descriptive title, one main heading, meaningful subheadings, descriptive image alt text, internal links with clear anchor text</td></tr>
<tr><td>Content</td><td>Does the page satisfy the searcher's intent?</td><td>Original, accurate, complete answers matched to what the person wants to do</td></tr>
<tr><td>Links</td><td>Do other sites trust and reference this page?</td><td>Earned mentions from relevant sites, not purchased link schemes</td></tr>
</table>
<p><b>Search intent</b> is a useful idea. Someone searching "how to tie a tie" wants instructions; someone searching "buy silk tie" wants a shop. A product page will struggle to serve the first query however well it is tuned, and a long article will serve the second badly. A good exercise: take one keyword, read what kinds of pages rank, and decide what intent they satisfy before writing anything.</p>
<p>Common mistakes: stuffing a keyword repeatedly, publishing several thin pages for near-identical queries (they compete with each other), accidentally blocking important pages from crawling, and expecting overnight results. SEO outcomes take time and no one can guarantee a position.</p>
<div class="callout"><b>Interview reasoning</b> If traffic drops after a site redesign, check the technical layer first: changed URLs without redirects, pages accidentally set to not be indexed, or blocked crawling.</div>` },
  { h: "Funnel metrics with worked arithmetic", body: `
<p>Take one small paid campaign. Spend: 2,000. Impressions: 50,000. Clicks: 1,000. Purchases: 40. Revenue: 3,000.</p>
<table>
<tr><th>Metric</th><th>Formula</th><th>Result</th></tr>
<tr><td>CTR</td><td>clicks / impressions</td><td>1,000 / 50,000 = 2%</td></tr>
<tr><td>CPC</td><td>spend / clicks</td><td>2,000 / 1,000 = 2.00</td></tr>
<tr><td>Conversion rate</td><td>purchases / clicks</td><td>40 / 1,000 = 4%</td></tr>
<tr><td>CAC</td><td>spend / new customers</td><td>2,000 / 40 = 50</td></tr>
<tr><td>Average order value</td><td>revenue / purchases</td><td>3,000 / 40 = 75</td></tr>
<tr><td>ROAS</td><td>revenue / ad spend</td><td>3,000 / 2,000 = 1.5</td></tr>
</table>
<p>ROAS of 1.5 sounds positive, but it measures revenue, not profit. If the product's gross margin is 40%, the gross profit is 3,000 x 0.40 = 1,200, which is less than the 2,000 spent, so this campaign loses money on the first sale. It might still make sense only if customers buy again, which is why CAC is compared with <b>customer lifetime value</b>.</p>
<p>Watch the denominators. Conversion rate can be measured per click, per session or per visitor, and numbers are not comparable across definitions. Also remember funnel stages multiply: doubling CTR with the same conversion rate doubles purchases, but a click-bait ad that raises CTR while lowering conversion rate may achieve nothing.</p>
<div class="callout tip"><b>Interview reasoning</b> When asked to improve results, locate the weakest stage first. Low CTR points to the ad or targeting; good CTR but low conversion points to the landing page or offer.</div>` },
  { h: "A/B testing and attribution", body: `
<p>An A/B test shows two versions to comparable random groups at the same time and compares an outcome. Rules that keep it honest:</p>
<ul>
<li><b>Change one thing.</b> If the headline and the button colour both change, you cannot say which mattered.</li>
<li><b>Decide the metric and the sample size before starting.</b> The required sample depends on your current rate, the smallest improvement worth detecting and the confidence you want; calculators exist for this.</li>
<li><b>Do not peek and stop early.</b> Checking repeatedly and stopping the first time one version looks ahead greatly raises the chance of a false win.</li>
<li><b>Run across whole weeks</b> if behaviour differs by day.</li>
</ul>
<p>Example: version A converts 40 of 1,000 visitors (4.0%), version B converts 44 of 1,000 (4.4%). That looks like a 10% relative lift, but a difference of four people is well within random noise at this size. Statistical significance indicates how unlikely a difference is to be chance alone; it does not tell you the difference is large or valuable.</p>
<p><b>Attribution</b> is deciding which touchpoints deserve credit for a conversion. A customer might see a social ad, later search the brand, then click an email. <i>Last-click</i> gives all credit to the email, <i>first-click</i> to the social ad, and <i>linear</i> splits it equally. No model is simply correct; each favours certain channels, so compare more than one view and avoid cutting top-of-funnel activity just because last-click shows it as zero.</p>` },
  { h: "Email compliance, practice and glossary", body: `
<p>Email rules differ by country and change over time, so check the law that applies to your recipients. The ideas that appear almost everywhere are consistent:</p>
<ul>
<li>Have a lawful basis for contacting people, often clear consent, and keep a record of it.</li>
<li>Identify yourself honestly: accurate sender name and non-misleading subject line.</li>
<li>Include a clear, working way to unsubscribe and honour requests promptly.</li>
<li>Collect only the data you need and protect it.</li>
</ul>
<p>Buying a list of addresses is risky precisely because those people never agreed to hear from you. It also damages deliverability, since complaints push your messages toward spam folders.</p>
<p><b>How to practise</b>: pick a fictional shop and invent campaign numbers, then calculate every metric above and say which stage you would test first. Write a one-line test hypothesis such as "Changing the button text to name the benefit will raise the click rate on the landing page." Outline an on-page checklist for one real article.</p>
<p><b>Glossary</b>: impression is one display of an ad. Landing page is where a click arrives. Bounce means leaving after one page. Retargeting shows ads to people who previously visited. UTM parameters are tags added to a URL to identify the traffic source.</p>` },
  { h: "Putting it together: a diagnosis walk-through", body: `
<p>Interview questions often hand you a problem and ask what you would do. Use the funnel as a map and let the numbers choose the stage.</p>
<p>Scenario: an online shop spends 3,000 on ads and gets 1,500 clicks and 30 orders. Conversion rate is 30 / 1,500 = 2%. CAC is 3,000 / 30 = 100. Average order value is 60. Even before margin, each customer costs more to acquire than their first order brings in. There are only three levers: pay less per click, convert more of the clicks, or raise the value per customer.</p>
<table>
<tr><th>Lever</th><th>Change</th><th>New CAC</th></tr>
<tr><td>Convert more</td><td>Conversion rate 2% to 3% (45 orders)</td><td>3,000 / 45 = 66.67</td></tr>
<tr><td>Cheaper clicks</td><td>CPC from 2.00 to 1.50 (spend 2,250 for the same 1,500 clicks)</td><td>2,250 / 30 = 75</td></tr>
<tr><td>Raise order value</td><td>Bundles lift AOV from 60 to 80</td><td>CAC unchanged; revenue rises</td></tr>
</table>
<p>Notice that a one-point rise in conversion rate improved CAC more than a 25% cut in click cost. Small gains lower in the funnel compound, which is why conversion work is often tested first. Still, you would run it as an A/B test on the landing page, not assume the improvement.</p>
<p>Common mistakes to avoid in answers:</p>
<ul>
<li>Quoting a metric without stating its formula or denominator.</li>
<li>Declaring a winner from a tiny sample or after a few days.</li>
<li>Treating correlation as proof: sales rose in the month you changed the headline, but there was also a festival or a discount.</li>
<li>Optimising one number (clicks) while ignoring the business outcome (profit).</li>
</ul>
<p>Finish any recommendation with what you would measure next and what result would make you change your mind. That shows structured, evidence-based thinking. For example: "I would test the landing page headline for two full weeks, judge it on orders per visitor, and keep the current page if the difference is within noise."</p>` }
];
