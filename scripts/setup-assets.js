const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'src', 'assets', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const brainDir = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\addd6ce0-93fd-4842-89e6-1d08134ed9f0';

const filesToCopy = [
  { src: path.join(brainDir, 'hero_children_1790500923568.jpg'), dest: 'hero-children.jpg' },
  { src: path.join(brainDir, 'gov_students_1790500962659.jpg'), dest: 'government-school-students.jpg' },
  { src: path.join(brainDir, 'school_needs_1790501026161.jpg'), dest: 'government-school-needs.jpg' },
  { src: path.join(brainDir, 'cancer_support_1790501107307.jpg'), dest: 'cancer-patient-support.jpg' },
  { src: path.join(brainDir, '.user_uploaded', 'media_1790500744010.jpg'), dest: 'reference-mockup.jpg' }
];

filesToCopy.forEach(item => {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, path.join(targetDir, item.dest));
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.warn(`File not found: ${item.src}`);
  }
});
