import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const dirs = ['./src/components', './src/pages', './src'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  
  if (dir === './src') {
     const p = path.join(dir, 'index.css');
     if(fs.existsSync(p)) {
         let content = fs.readFileSync(p, 'utf-8');
         content = content.replace(/py-24/g, 'py-12 md:py-16 lg:py-24');
         content = content.replace(/py-16/g, 'py-12 md:py-16 lg:py-24');
         fs.writeFileSync(p, content);
     }
     return;
  }

  walkDir(dir, (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Phase 1 Layout
      content = content.replace(/(?<!(md:|lg:|sm:|xl:))py-24/g, 'py-12 md:py-16 lg:py-24');
      content = content.replace(/(?<!(md:|lg:|sm:|xl:))py-16/g, 'py-12 md:py-16 lg:py-24');
      content = content.replace(/(?<!(md:|lg:|sm:|xl:))gap-12/g, 'gap-6 md:gap-12 lg:gap-16');
      content = content.replace(/(?<!(md:|lg:|sm:|xl:))gap-16/g, 'gap-6 md:gap-12 lg:gap-16');
      // grid-cols-2 -> grid-cols-1 sm:grid-cols-2 if it's not already sm:grid-cols-2 or md:grid-cols-2 etc
      content = content.replace(/\b(?<!(?:sm:|md:|lg:|xl:))grid-cols-2\b/g, 'grid-cols-1 sm:grid-cols-2');

      // Phase 2 Typography & Components
      content = content.replace(/rounded-\[3rem\]/g, 'rounded-3xl md:rounded-[3rem]');
      content = content.replace(/rounded-\[4rem\]/g, 'rounded-3xl md:rounded-[4rem]');
      content = content.replace(/h-\[360px\]/g, 'min-h-[300px] h-auto');
      
      // Phase 3 UX & QA Refinement
      // Add pb-20 md:pb-0 for root page wrappers to prevent overlap with floating contact
      if (filePath.includes('pages/')) {
        // we can generally replace min-h-screen with min-h-screen pb-20 md:pb-0
        content = content.replace(/min-h-screen(?! pb-20)/g, 'min-h-screen pb-20 md:pb-0');
        // change 100vh -> 100dvh
        content = content.replace(/100vh/g, '100dvh');
      }
      
      if (filePath.includes('Header.tsx')) {
         content = content.replace(/100vh/g, '100dvh');
      }

      fs.writeFileSync(filePath, content);
      console.log('Updated ' + filePath);
    }
  });
});
