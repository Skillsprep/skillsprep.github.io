// ===== SkillPrep site configuration — edit these, then run:  node tools/build.js =====
module.exports = {
  siteName: "SkillPrep",
  // Public address of the site (no trailing slash needed). Used for canonical URLs,
  // the sitemap and social-share tags. If you move the site, change it here and rebuild.
  siteUrl: "https://skillsprep.github.io/",
  // Path the site is served from. "/" for a user site (username.github.io),
  // "/repo-name/" for a project site. Only the 404 page needs it (GitHub Pages serves
  // 404.html from any URL depth); every other page uses relative links.
  basePath: "/",
  // Where contact-form messages go. The form opens the visitor's email app addressed here.
  // >>> Make sure this inbox really exists and you read it. <<<
  contactEmail: "hello@skillprep.blog",
  // Date shown as "Last reviewed" on every guide (ISO). Update when you re-check content.
  lastReviewed: "2026-10-18",
  // Old hash-style links (#/post/<old-slug>) are redirected to the new pages.
  legacySlugs: {
    "excel-assessment-guide": "excel-study-guide",
    "python-assessment-guide": "python-study-guide",
    "javascript-assessment-guide": "javascript-study-guide",
    "project-management-assessment-guide": "project-management-study-guide",
    "sql-assessment-guide": "sql-study-guide",
    "digital-marketing-assessment-guide": "digital-marketing-study-guide",
    "git-github-assessment-guide": "git-study-guide",
    "powerpoint-assessment-guide": "powerpoint-study-guide",
    "assessment-basics-faq": "linkedin-skill-assessments-retired",
    "generative-ai-microsoft-linkedin-guide": "generative-ai-career-essentials-practice-test",
    "lean-six-sigma-sustainability-mock-test": "lean-six-sigma-practice-test"
  },
  // Authoritative references shown under each guide ("Sources & further reading").
  sources: {
    "excel-study-guide": [
      ["XLOOKUP function — Microsoft Support", "https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929"],
      ["Create a PivotTable to analyze worksheet data — Microsoft Support", "https://support.microsoft.com/office/18fb0032-b01a-4c99-9a5f-7ab09edde05a"]
    ],
    "python-study-guide": [
      ["Default argument values — The Python Tutorial", "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"],
      ["Errors and exceptions — The Python Tutorial", "https://docs.python.org/3/tutorial/errors.html"],
      ["Data structures — The Python Tutorial", "https://docs.python.org/3/tutorial/datastructures.html"]
    ],
    "javascript-study-guide": [
      ["Closures — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"],
      ["JavaScript execution model (event loop) — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"],
      ["Falsy — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Glossary/Falsy"]
    ],
    "project-management-study-guide": [
      ["The Scrum Guide (2020)", "https://scrumguides.org/scrum-guide.html"]
    ],
    "sql-study-guide": [
      ["Window functions — PostgreSQL documentation", "https://www.postgresql.org/docs/current/tutorial-window.html"],
      ["Joins and table expressions — PostgreSQL documentation", "https://www.postgresql.org/docs/current/queries-table-expressions.html"]
    ],
    "digital-marketing-study-guide": [
      ["SEO Starter Guide — Google Search Central", "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"],
      ["CAN-SPAM Act: A Compliance Guide for Business — FTC", "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business"]
    ],
    "git-study-guide": [
      ["git-revert — Git documentation", "https://git-scm.com/docs/git-revert"],
      ["git-restore — Git documentation", "https://git-scm.com/docs/git-restore"],
      ["Rebasing — Pro Git book", "https://git-scm.com/book/en/v2/Git-Branching-Rebasing"]
    ],
    "powerpoint-study-guide": [
      ["PowerPoint help & learning — Microsoft Support", "https://support.microsoft.com/en-us/powerpoint"]
    ],
    "linkedin-skill-assessments-retired": [
      ["Skill Assessments - no longer available — LinkedIn Help", "https://www.linkedin.com/help/learning/answer/a1690529"]
    ],
    "generative-ai-career-essentials-practice-test": [
      ["AI Risk Management Framework — NIST", "https://www.nist.gov/itl/ai-risk-management-framework"],
      ["The EU Artificial Intelligence Act", "https://artificialintelligenceact.eu/"]
    ],
    "lean-six-sigma-practice-test": [
      ["PDCA cycle — ASQ", "https://asq.org/quality-resources/pdca-cycle"],
      ["Five Whys — ASQ", "https://asq.org/quality-resources/five-whys"],
      ["NAE Grand Challenges for Engineering", "https://www.engineeringchallenges.org/"]
    ]
  }
};
