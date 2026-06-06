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
      
      // PromoPopup.tsx
      if (filePath.includes('PromoPopup.tsx')) {
         content = content.replace(/className="relative bg-white rounded-3xl/g, 'className="relative bg-white rounded-3xl overflow-hidden');
      }

      // Pricing.tsx line 135
      if (filePath.includes('Pricing.tsx')) {
         content = content.replace(/className="mt-20 bg-brand-primary text-white p-12 md:p-20 rounded-\[4rem\] text-center relative shadow-2xl shadow-brand-primary\/30"/g, 'className="mt-20 bg-brand-primary text-white p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden shadow-2xl shadow-brand-primary/30"');
         // We might have changed rounded-[4rem] to rounded-3xl md:rounded-[4rem] 
         content = content.replace(/className="mt-20 bg-brand-primary text-white p-12 md:p-20 rounded-3xl md:rounded-\[4rem\] text-center relative(?! overflow-hidden)/g, 'className="mt-20 bg-brand-primary text-white p-12 md:p-20 rounded-3xl md:rounded-[4rem] text-center relative overflow-hidden');
      }
      
      // BlogDetail.tsx line 235
      if (filePath.includes('BlogDetail.tsx')) {
         content = content.replace(/mt-20 p-10 bg-brand-secondary rounded-3xl md:rounded-\[3rem\] text-white(?! relative overflow-hidden)/g, 'mt-20 p-10 bg-brand-secondary rounded-3xl md:rounded-[3rem] text-white relative overflow-hidden');
      }

      // Services.tsx line 347 & 498
      if (filePath.includes('Services.tsx')) {
         content = content.replace(/section className="relative py-12 md:py-16 bg-brand-secondary"(?! overflow-hidden)/g, 'section className="relative py-12 md:py-16 bg-brand-secondary overflow-hidden"');
         content = content.replace(/bg-brand-primary rounded-3xl md:rounded-\[3rem\] p-12 text-center text-white relative(?! overflow-hidden)/g, 'bg-brand-primary rounded-3xl md:rounded-[3rem] p-12 text-center text-white relative overflow-hidden');
      }

      fs.writeFileSync(filePath, content);
      console.log('Fixed ' + filePath);
    }
  });
});
