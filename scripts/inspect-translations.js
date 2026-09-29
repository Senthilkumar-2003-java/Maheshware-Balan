const fs = require('fs');
const content = fs.readFileSync('frontend/src/translations/translations.js', 'utf8');

// Print all language keys and check for aids
const matches = content.match(/([a-z]{2}):\s*\{/g);
console.log('Languages found:', matches);

const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (/aids|leprosy/i.test(l)) {
    console.log(`${idx + 1}: ${l.trim()}`);
  }
});
