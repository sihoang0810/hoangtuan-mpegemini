import * as fs from 'fs';
import * as path from 'path';

function walk(dir: string, callback: (filepath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk('./src', (filepath) => {
  if (!filepath.endsWith('.tsx') && !filepath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Remove locationSlug from useParams completely since we have it via useLocation
  content = content.replace(/const \{ locationSlug \} = useParams\(\);/g, '');
  content = content.replace(/const \{ slug, locationSlug \} = useParams/g, 'const { slug } = useParams');
  content = content.replace(/const \{ slug, locationSlug \} = useParams<\{(.*?)\}>/g, 'const { slug } = useParams<{$1}>');
  
  if (content !== original) {
    fs.writeFileSync(filepath, content);
  }
});
