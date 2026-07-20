const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
        if (dirFile.endsWith('.jsx')) {
          filelist.push(dirFile);
        }
      } else {
        throw err;
      }
    }
  });
  return filelist;
};

const srcDir = path.join(__dirname, 'src');
const files = walkSync(srcDir);

const replacements = [
  { regex: /\bbg-white\b(?!.*?dark:bg-)/g, replacement: 'bg-white dark:bg-gray-900' },
  { regex: /\bbg-gray-50\b(?!.*?dark:bg-)/g, replacement: 'bg-gray-50 dark:bg-gray-800' },
  { regex: /\bbg-gray-100\b(?!.*?dark:bg-)/g, replacement: 'bg-gray-100 dark:bg-gray-800' },
  { regex: /\btext-gray-900\b(?!.*?dark:text-)/g, replacement: 'text-gray-900 dark:text-white' },
  { regex: /\btext-gray-800\b(?!.*?dark:text-)/g, replacement: 'text-gray-800 dark:text-gray-100' },
  { regex: /\btext-gray-700\b(?!.*?dark:text-)/g, replacement: 'text-gray-700 dark:text-gray-200' },
  { regex: /\btext-gray-600\b(?!.*?dark:text-)/g, replacement: 'text-gray-600 dark:text-gray-300' },
  { regex: /\btext-gray-500\b(?!.*?dark:text-)/g, replacement: 'text-gray-500 dark:text-gray-400' },
  { regex: /\bborder-gray-100\b(?!.*?dark:border-)/g, replacement: 'border-gray-100 dark:border-gray-800' },
  { regex: /\bborder-gray-200\b(?!.*?dark:border-)/g, replacement: 'border-gray-200 dark:border-gray-700' },
  { regex: /\bborder-white\b(?!.*?dark:border-)/g, replacement: 'border-white dark:border-gray-700' }
];

let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  replacements.forEach(({ regex, replacement }) => {
    newContent = newContent.replace(regex, replacement);
  });

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`Total files updated: ${changedCount}`);
