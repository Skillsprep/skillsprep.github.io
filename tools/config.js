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
  // Date shown as "Last reviewed" on every guide (ISO). Update when you re-check content.
  lastReviewed: "2026-10-18",
  // Date shown as "Last updated" on the Privacy page only (kept separate so it doesn't claim guides were re-reviewed).
  privacyUpdated: "2026-11-14",
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
  // Hand-picked "Related guides" shown in each guide's sidebar (slug -> up to 3 slugs). Edit freely;
  // the build fails if a slug doesn't exist. Guides not listed fall back to the first other guides.
  related: {
    "excel-study-guide": ["sql-study-guide", "power-bi-study-guide", "powerpoint-study-guide"],
    "python-study-guide": ["sql-study-guide", "excel-study-guide", "javascript-study-guide"],
    "javascript-study-guide": ["git-study-guide", "python-study-guide", "sql-study-guide"],
    "project-management-study-guide": ["lean-six-sigma-practice-test", "excel-study-guide", "powerpoint-study-guide"],
    "power-bi-practice-test": [
      ["Study guide for Exam PL-300: Microsoft Power BI Data Analyst — Microsoft Learn", "https://learn.microsoft.com/en-us/certifications/resources/study-guides/PL-300"],
      ["Use Performance Analyzer to examine report element performance — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-performance-analyzer"],
      ["Create calculation groups in Power BI Desktop — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/transform-model/calculation-groups"],
      ["DATEADD function (DAX) — Microsoft Learn", "https://learn.microsoft.com/en-us/dax/dateadd-function-dax"],
      ["Model relationships in Power BI Desktop — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"],
      ["Understand star schema and the importance for Power BI — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"],
      ["Data profiling tools in Power Query — Microsoft Learn", "https://learn.microsoft.com/en-us/power-query/data-profiling-tools"],
      ["Privacy levels in Power Query — Microsoft Learn", "https://learn.microsoft.com/en-us/power-query/privacy-levels"],
      ["DirectQuery in Power BI — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-directquery-about"],
      ["Paginated reports in Power BI — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/paginated-reports/paginated-reports-report-builder-power-bi"],
      ["Roles in workspaces in Power BI — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces"],
      ["Row-level security (RLS) with Power BI — Microsoft Learn", "https://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security"],
      ["What is an on-premises data gateway? — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/connect-data/service-gateway-onprem"],
      ["Configure scheduled refresh — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh"],
      ["Create and publish a workspace app — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps"],
      ["Endorse your content — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-endorse-content"]
    ],
    "power-bi-study-guide": [
      ["Study guide for Exam PL-300: Microsoft Power BI Data Analyst — Microsoft Learn", "https://learn.microsoft.com/en-us/certifications/resources/study-guides/PL-300"],
      ["New name for Power BI datasets (semantic models) — Microsoft Learn", "https://learn.microsoft.com/power-bi/connect-data/service-datasets-rename"],
      ["Understand star schema and the importance for Power BI — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"],
      ["Model relationships in Power BI Desktop — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"],
      ["Set and use date tables in Power BI Desktop — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/guidance/model-date-tables"],
      ["CALCULATE function (DAX) — Microsoft Learn", "https://learn.microsoft.com/en-us/dax/calculate-function-dax"],
      ["DirectQuery in Power BI — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-directquery-about"],
      ["Configure scheduled refresh — Microsoft Learn", "https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh"],
      ["Row-level security (RLS) with Power BI — Microsoft Learn", "https://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security"]
    ],
    "sql-study-guide": ["excel-study-guide", "power-bi-study-guide", "python-study-guide"],
    "power-bi-study-guide": ["power-bi-practice-test", "excel-study-guide", "sql-study-guide"],
    "power-bi-practice-test": ["power-bi-study-guide", "excel-study-guide", "sql-study-guide"],
    "digital-marketing-study-guide": ["excel-study-guide", "powerpoint-study-guide", "generative-ai-career-essentials-practice-test"],
    "git-study-guide": ["javascript-study-guide", "python-study-guide", "project-management-study-guide"],
    "powerpoint-study-guide": ["excel-study-guide", "digital-marketing-study-guide", "generative-ai-career-essentials-practice-test"],
    "linkedin-skill-assessments-retired": ["generative-ai-career-essentials-practice-test", "excel-study-guide", "python-study-guide"],
    "generative-ai-career-essentials-practice-test": ["powerpoint-study-guide", "digital-marketing-study-guide", "excel-study-guide"],
    "lean-six-sigma-practice-test": ["project-management-study-guide", "excel-study-guide", "powerpoint-study-guide"]
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
      ["The Scrum Guide (2020)", "https://scrumguides.org/scrum-guide.html"],
      ["PMBOK Guide", "https://www.pmi.org/pmbok-guide-standards/foundational/pmbok"]
    ],
    "sql-study-guide": [
      ["Window functions — PostgreSQL documentation", "https://www.postgresql.org/docs/current/tutorial-window.html"],
      ["Joins and table expressions — PostgreSQL documentation", "https://www.postgresql.org/docs/current/queries-table-expressions.html"]
    ],
    "digital-marketing-study-guide": [
      ["SEO Starter Guide — Google Search Central", "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"],
      ["CAN-SPAM Act: A Compliance Guide for Business — FTC", "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business"],
      ["Bounce rate — Google Analytics Help", "https://support.google.com/analytics/answer/12195621"]
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
      ["The EU Artificial Intelligence Act", "https://artificialintelligenceact.eu/"],
      ["Microsoft Copilot documentation — Microsoft Learn", "https://learn.microsoft.com/en-us/copilot/"]
    ],
    "lean-six-sigma-practice-test": [
      ["PDCA cycle — ASQ", "https://asq.org/quality-resources/pdca-cycle"],
      ["Five Whys — ASQ", "https://asq.org/quality-resources/five-whys"],
      ["NAE Grand Challenges for Engineering", "https://www.engineeringchallenges.org/"]
    ]
  }
};
