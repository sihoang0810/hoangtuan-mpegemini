import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const dirs = ['./src/pages'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;

  walkDir(dir, (filePath) => {
    if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      content = content.replace(/(?<!(md:|lg:|sm:|xl:))pt-32/g, 'pt-24 md:pt-32');
      content = content.replace(/(?<!(md:|lg:|sm:|xl:))pb-24/g, 'pb-16 md:pb-24');
      content = content.replace(/(?<!(md:|lg:|sm:|xl:))pb-20/g, 'pb-16 md:pb-20');

      // Double check not to overwrite pb-20 md:pb-0 from phase 3
      content = content.replace(/pb-16 md:pb-20 md:pb-0/g, 'pb-20 md:pb-0');

      fs.writeFileSync(filePath, content);
      console.log('Fixed padding ' + filePath);
    }
  });
});
