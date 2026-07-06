const fs = require('fs');
const lines = fs.readFileSync('src/config/components.ts', 'utf8').split('\n');
lines.forEach((line, i) => {
  if (/id:\s*['"](button|badge|card|input)['"]/.test(line)) {
    console.log(`Line ${i + 1}: ${line.trim()}`);
  }
});
