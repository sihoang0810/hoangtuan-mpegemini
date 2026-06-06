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
      
      // Fix gap-20 and gap-10 without responsive variants
      content = content.replace(/(?<!(md:|lg:|sm:|xl:))gap-20/g, 'gap-8 md:gap-12 lg:gap-20');
      content = content.replace(/(?<!(md:|lg:|sm:|xl:))gap-10/g, 'gap-6 lg:gap-10');

      // Make clickable buttons larger on mobile
      content = content.replace(/w-8 h-8 rounded-full flex items-center justify-center transition-colors/g, 'w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors');
      content = content.replace(/w-10 h-10 bg-slate-100 hover:bg-slate-200/g, 'w-12 h-12 bg-slate-100 hover:bg-slate-200'); // make close buttons bigger for touch
      content = content.replace(/w-10 h-10 rounded-full bg-slate-100 flex items-center/g, 'w-12 h-12 rounded-full bg-slate-100 flex items-center'); // View details icon button
      content = content.replace(/w-8 h-8 rounded-full bg-slate-100/g, 'w-10 h-10 md:w-8 md:h-8 rounded-full bg-slate-100');
      
      // Fix image aspect ratio in Services
      if(filePath.includes('Services.tsx')) {
         content = content.replace(/h-48 bg-slate-100 relative/g, 'aspect-video lg:aspect-[4/3] bg-slate-100 relative');
      }

      // Fix overflow for any absolute elements, verify they don't break horizontal sizing
      // w-full on absolute usually is fine if inset is correct.

      fs.writeFileSync(filePath, content);
      console.log('Fixed ' + filePath);
    }
  });
});
