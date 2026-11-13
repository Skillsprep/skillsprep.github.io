module.exports = [
  { h: "Masters, layouts and themes: format once, not forty times", body: `
<p>A deck is built on three connected layers. The <b>theme</b> holds colours, fonts and effects. The <b>slide master</b> sits above everything and controls shared elements such as the title style, background and footers. <b>Layouts</b> hang beneath the master and define placeholder arrangements: Title Slide, Title and Content, Two Content and so on. Open the editor from the View tab, then Slide Master.</p>
<p>Practical rule: change the look in the master, never slide by slide. If you want every title to be 32 pt and left-aligned, edit it once on the master and every layout and slide that has not been manually overridden follows. A single deck can have several masters, but most decks need only one.</p>
<p>Worked scenario: you have 40 slides and the client logo must appear bottom right. Place the logo on the master and it appears on all layouts that show master shapes. Doing it by hand means 40 edits, and one will be missed. Similarly, use a layout's placeholders for text rather than drawing text boxes; placeholder text appears in Outline view, is read in a logical order by assistive tools and is restyled when you change the theme or layout.</p>
<div class="callout"><b>Common mistake</b> Pasting content in from another deck with "Keep Source Formatting" imports a second master and a clutter of fonts. Prefer "Use Destination Theme" so the content takes on the current design.</div>
<p>Changing theme fonts and colours should change the entire deck. If it does not, someone set direct formatting, such as a hard-coded colour, instead of choosing from the theme palette. Use the Reset command on the Home tab to return a slide's placeholders to their layout formatting.</p>` },
  { h: "Designing for the audience", body: `
<p>Start with three questions: who is in the room, what must they decide or remember, and how will they see the slides (projector across a hall, laptop screen, or read later as a document)? A deck read alone can hold more text than a deck spoken to. A deck on a projector needs large text, because small type is the most common failure in a big room.</p>
<ul>
<li><b>One message per slide.</b> A useful test is to write the slide's title as a full sentence stating the takeaway ("Support tickets fell after the new form") instead of a topic ("Support tickets").</li>
<li><b>Prefer visuals to bullets</b> when showing a relationship or a trend; keep bullets short.</li>
<li><b>Be consistent</b>: same fonts, alignment and spacing from slide to slide.</li>
<li><b>Limit effects.</b> Transitions and animations should have a purpose, such as revealing the steps of a process one at a time. Using a different dramatic transition on every slide distracts and can make viewers dizzy.</li>
</ul>
<p><b>SmartArt versus charts.</b> SmartArt turns a short list into a diagram such as a process, cycle or hierarchy; it works best with brief text. Charts show numbers. Choose by the question: comparing categories suits a column or bar chart, change over time suits a line chart, parts of a whole suits a pie chart with few slices. Remove clutter: delete unneeded gridlines, label directly, and use a title that states the finding. Charts you insert in PowerPoint carry an embedded data sheet, so edit the data there rather than redrawing.</p>
<p>Example: ten bullet points listing quarterly results can become one line chart with a headline and a single supporting sentence. Move the full table to an appendix slide or handout.</p>` },
  { h: "Accessibility: build it in from the start", body: `
<p>Accessible slides help people who use screen readers, have low vision or colour blindness, and also anyone viewing on a poor projector. The Review tab includes a Check Accessibility command that reports issues; run it before sharing, though it cannot judge everything, such as whether your alt text is actually meaningful.</p>
<table>
<tr><th>Area</th><th>Good practice</th></tr>
<tr><td>Alt text</td><td>Describe the purpose of a picture or chart in a short sentence; mark purely decorative images as decorative</td></tr>
<tr><td>Reading order</td><td>Screen readers follow a defined order of objects; check it in the Selection Pane, where the order is read from the bottom of the list to the top</td></tr>
<tr><td>Titles</td><td>Give every slide a unique title, using the layout's title placeholder</td></tr>
<tr><td>Contrast</td><td>Strong difference between text and background; avoid light grey on white</td></tr>
<tr><td>Colour</td><td>Never rely on colour alone to carry meaning; add labels or patterns</td></tr>
<tr><td>Text</td><td>Readable font size, meaningful link text instead of "click here", tables with a header row</td></tr>
</table>
<p>Alt text example: for a bar chart, "Bar chart: sales rose from 120 in January to 180 in March" is useful. "Chart" or "image001" is not.</p>
<div class="callout tip"><b>Interview reasoning</b> If asked why layouts matter for accessibility, say that title and content placeholders give each slide a title and a predictable reading order, which text boxes dropped in freely do not.</div>` },
  { h: "Presenting, sections, sharing and practice", body: `
<p><b>Presenter view</b> shows you the current slide, the next slide, your speaker notes and a timer, while the audience sees only the slide. It is found on the Slide Show tab. Rehearse with it on the display setup you will use, and have a plan if the venue's screen settings mirror your display instead. Keep notes as prompts, not a script you read aloud.</p>
<p><b>Sections</b> (Home tab, Section) group slides under named headings such as Introduction, Findings and Next steps. They help you navigate a long deck and let several people own different parts, and you can collapse a section while working.</p>
<p>Sharing options differ. Send a <b>.pptx</b> if the recipient must edit. Export to <b>PDF</b> (File, then Export or Save As) for a fixed, widely viewable version; animations and some media will not carry over. Check which sharing and co-authoring options your version and account offer, since these vary. Before sending, remove hidden notes and comments you do not want seen, and consider embedding or including any unusual fonts.</p>
<p><b>How to practise</b></p>
<ol>
<li>Build a five-slide deck from a blank file using only layout placeholders, then change the theme and see what breaks.</li>
<li>Restyle titles in the master and confirm all slides follow.</li>
<li>Run the accessibility checker and fix every item.</li>
<li>Present to a friend using presenter view and keep to a set time.</li>
</ol>
<p><b>Glossary</b>: placeholder is a layout-defined box for title, text or content. Handout is a printable version with several slides per page. Appendix holds backup detail you can show if asked.</p>` },
  { h: "A before-and-after redesign and common mistakes", body: `
<p>Seeing a weak slide fixed is the quickest way to learn. Imagine a slide titled "Customer Feedback" with eight small bullets of survey comments, a clip-art image, a spinning transition and grey text on a pale background.</p>
<table>
<tr><th>Problem</th><th>Fix</th></tr>
<tr><td>Topic title says nothing</td><td>Rewrite as the finding: "Most feedback praises delivery speed"</td></tr>
<tr><td>Eight bullets, small text</td><td>Keep two or three key points; one short quote in large type</td></tr>
<tr><td>Decorative image with no meaning</td><td>Delete it, or replace it with a simple chart of the survey result and give it alt text</td></tr>
<tr><td>Dramatic transition</td><td>Use none, or a subtle one applied consistently to the whole deck</td></tr>
<tr><td>Low-contrast grey text</td><td>Dark text on a light background, or light on dark, with strong difference</td></tr>
<tr><td>Formatting applied by hand</td><td>Move styles to the master so later slides inherit them</td></tr>
</table>
<p>Other frequent mistakes: using many different fonts, which looks unplanned; filling every inch of the slide, when white space helps the eye; reading slides aloud word for word, which makes the audience stop listening to you; aligning objects by eye instead of using the alignment and distribute tools on the Shape Format tab; and leaving the opening and closing slides weak, since people remember beginnings and endings.</p>
<p>Timing is a design decision too. As a rough habit, plan one main idea per minute or less rather than cramming, and prepare backup slides in an appendix for questions rather than adding them to the main flow.</p>
<div class="callout"><b>Interview reasoning</b> If asked how you would improve an existing deck, answer in this order: audience and goal, structure and titles, one message per slide, consistent formatting through the master, accessibility check, then rehearsal. Starting with fonts and colours is the common but backwards answer.</div>` }
];
