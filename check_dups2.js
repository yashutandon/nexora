const fs = require('fs');
const lines = fs.readFileSync('src/config/components.ts', 'utf8').split('\n');
lines.forEach((line, i) => {
  if (line.includes('Code is dynamically served from API')) {
    console.log(`Line ${i + 1}: ${line.trim()}`);
  }
});
