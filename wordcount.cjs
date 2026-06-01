const fs = require('fs');
const path = require('path');

const files = [
  'bao-loc-1.ts', 'bao-loc-2.ts', 'bao-loc-3.ts',
  'hcm-1.ts', 'hcm-2.ts', 'hcm-3.ts'
];

let totalWords = 0;
let fileStats = [];

for (const file of files) {
  const filePath = path.join(__dirname, 'src', 'data', 'blogs', file);
  const data = fs.readFileSync(filePath, 'utf8');
  
  // Lấy text thô bỏ khoảng trắng liên tiếp để đếm từ
  const words = data.match(/\S+/g);
  const numWords = words ? words.length : 0;
  
  fileStats.push({ file, numWords });
  totalWords += numWords;
}

const averageWords = totalWords / files.length;
const sorted = [...fileStats].sort((a,b) => a.numWords - b.numWords);
const shortest = sorted[0];
const longest = sorted[sorted.length - 1];

console.log("=== THỐNG KÊ ===");
fileStats.forEach(s => {
  console.log(`${s.file}: ${s.numWords} words`);
});
console.log(`TOTAL_ARTICLES=${files.length}`);
console.log(`TOTAL_WORDS=${totalWords}`);
console.log(`AVERAGE_WORDS=${averageWords}`);
console.log(`SHORTEST=${shortest.numWords} (${shortest.file})`);
console.log(`LONGEST=${longest.numWords} (${longest.file})`);
