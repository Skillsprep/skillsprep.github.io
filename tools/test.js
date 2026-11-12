// tools/test.js
// A simple test script to validate content JSON files and structure

const guides = require('./content/guides.js');
const genai = require('./content/genai.js');
const lean = require('./content/lean.js');

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

if (errors > 0) {
    console.error(`\nTests failed with ${errors} error(s).`);
    process.exit(1);
} else {
    console.log("\nAll tests passed successfully.");
    process.exit(0);
}
