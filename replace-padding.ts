import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const dirs = ['./src/components', './src/pages'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;

  walkDir(dir, (filePath) => {
    if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Phase 2 Button padding
      // Find patterns like px-8 py-4, px-6 py-3.5 sm:px-8 sm:py-4, etc. and replace with px-6 py-4 md:px-8 md:py-4
      content = content.replace(/px-8 py-4/g, 'px-6 py-4 md:px-8 md:py-4');
      content = content.replace(/px-8 py-5/g, 'px-6 py-4 md:px-8 md:py-4');
      content = content.replace(/px-6 py-3\.5 sm:px-8 sm:py-4/g, 'px-6 py-4 md:px-8 md:py-4');
      content = content.replace(/px-6 py-4 sm:px-[0-9]+ sm:py-[0-9]+/g, 'px-6 py-4 md:px-8 md:py-4');
      
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + filePath);
    }
  });
});
