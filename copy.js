const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components', 'layout');
const destDir = path.join(__dirname, 'src', 'features', 'landing', 'components');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(path.join(srcDir, 'HowItsWork.tsx'), path.join(destDir, 'HowItsWork.tsx'));
fs.copyFileSync(path.join(srcDir, 'ComponentShowcase.tsx'), path.join(destDir, 'ComponentShowcase.tsx'));

console.log('Files copied successfully.');
