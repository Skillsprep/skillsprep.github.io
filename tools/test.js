// tools/test.js
// A simple test script to validate content JSON files and structure

const guides = require('./content/guides.js');
const genai = require('./content/genai.js');
const lean = require('./content/lean.js').concat(require('./content/lean_more.js'));

let errors = 0;

function checkQuestions(topic, qs) {
    const ids = new Set();
    qs.forEach((q, i) => {
        if (!q.q || typeof q.q !== 'string') {
            console.error(`[Error] ${topic} Question ${i+1}: Missing or invalid question text.`);
            errors++;
        } else {
            if (ids.has(q.q)) {
                console.error(`[Error] ${topic} Question ${i+1}: Duplicate question found ("${q.q}").`);
                errors++;
            }
            ids.add(q.q);
        }
        
        if (!q.o || !Array.isArray(q.o) || q.o.length < 2) {
            console.error(`[Error] ${topic} Question ${i+1}: Missing or invalid options.`);
            errors++;
        }
        if (typeof q.a !== 'number' || q.a < 0 || q.a >= q.o.length) {
            console.error(`[Error] ${topic} Question ${i+1}: Invalid answer index ${q.a}.`);
            errors++;
        }
        if (!q.w || typeof q.w !== 'string') {
            console.error(`[Error] ${topic} Question ${i+1}: Missing or invalid explanation ('w').`);
            errors++;
        }
    });
}

// 1. Check GenAI test
console.log(`Checking ${genai.length} GenAI questions...`);
checkQuestions('GenAI', genai);

// 2. Check Lean Six Sigma test
console.log(`Checking ${lean.length} Lean questions...`);
checkQuestions('Lean', lean);

// 3. Check guides structure
console.log(`Checking ${guides.length} guides...`);
guides.forEach(g => {
    if (!g.slug || !g.title || !g.sections) {
        console.error(`[Error] Guide missing required fields: ${g.slug || 'Unknown'}`);
        errors++;
    }
});

// 4. Check inline quizzes in the built guide pages (run `node tools/build.js` first)
const fs = require('fs');
const path = require('path');
const guidesDir = path.join(__dirname, '..', 'guides');
let inlineTotal = 0;
if (fs.existsSync(guidesDir)) {
    fs.readdirSync(guidesDir).forEach(slug => {
        const file = path.join(guidesDir, slug, 'index.html');
        if (!fs.existsSync(file)) return;
        const html = fs.readFileSync(file, 'utf8');
        const blocks = html.split('<div class="quiz" data-quiz>').slice(1);
        const seen = new Set();
        blocks.forEach((b, i) => {
            inlineTotal++;
            const label = `${slug} inline question ${i + 1}`;
            // keep only this quiz's own markup (up to the next quiz marker, already split)
            const text = (/<p class="q-text"[^>]*>([\s\S]*?)<\/p>/.exec(b) || [])[1];
            const opts = (b.match(/<label class="opt"/g) || []).length;
            const correct = (b.match(/<label class="opt" data-correct/g) || []).length;
            if (!text || !text.trim()) { console.error(`[Error] ${label}: missing question text.`); errors++; }
            else if (seen.has(text)) { console.error(`[Error] ${label}: duplicate question text.`); errors++; }
            else seen.add(text);
            if (opts < 2) { console.error(`[Error] ${label}: fewer than 2 options.`); errors++; }
            if (correct !== 1) { console.error(`[Error] ${label}: expected exactly 1 correct option, found ${correct}.`); errors++; }
            if (!/class="q-explain"/.test(b)) { console.error(`[Error] ${label}: missing explanation.`); errors++; }
        });
    });
    console.log(`Checked ${inlineTotal} inline quiz questions in built guides.`);
}

if (errors > 0) {
    console.error(`\nTests failed with ${errors} error(s).`);
    process.exit(1);
} else {
    console.log("\nAll tests passed successfully.");
    process.exit(0);
}
