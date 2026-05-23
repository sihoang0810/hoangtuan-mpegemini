import * as fs from 'fs';
import * as path from 'path';

function walk(dir: string, callback: (filepath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

const FILES_TO_FIX = [
  'src/components/Blog.tsx',
  'src/components/BlogCard.tsx',
  'src/components/ExtraSections.tsx',
  'src/components/FeaturedProducts.tsx',
  'src/components/FloatingContact.tsx',
  'src/components/Footer.tsx',
  'src/components/Header.tsx',
  'src/components/Hero.tsx',
  'src/components/PageSEO.tsx',
  'src/components/ProductCard.tsx',
  'src/components/Services.tsx',
  'src/components/Testimonials.tsx',
  'src/components/TopBar.tsx',
  'src/pages/BlogDetail.tsx',
  'src/pages/BlogListing.tsx',
  'src/pages/Contact.tsx',
  'src/pages/ProductDetail.tsx',
  'src/pages/ProductListing.tsx',
  'src/pages/ServiceDetail.tsx',
  'src/pages/Services.tsx'
];

walk('./src', (filepath) => {
  if (!filepath.endsWith('.tsx') && !filepath.endsWith('.ts')) return;
  if(filepath.includes('LocationContext.tsx')) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // We need to replace usages of `locationId` with `locationSlug`, 
  // ONLY IF there's no `useParams()` in the same file that destructured `locationId`.
  // Actually, even if there is `useParams`, we might want to just standardize on locationId -> locationSlug where it makes sense, or rename the param.
  // The Prompt says: "Remove logic duplication for baoloc ... Create ONE canonical location system. Every component must use this file"

  // If a component uses useParams() it extracts `locationId` from the route.
  // We can just leave `locationId` from useParams() alone, but it needs to be canonical.
  // Or better, let's just use `locationSlug` everywhere!

  // Let's replace ONLY `locationId` -> `locationSlug` if it's NOT coming from useParams.
  // Wait, if it comes from useParams, we still want it to be canonical. Let's just do a regex replace if `useLocation` is used.
  
  if (!content.includes('useParams')) {
    content = content.replace(/\blocationId\b/g, 'locationSlug');
  } else {
    // If it uses useParams, `const { locationId }` is from useParams.
    // e.g. `const { slug, locationId } = useParams();` or `const { locationId } = useParams();`
    // We should rename it to `locationSlug` from `useParams` for consistency?
    // Wait, let's just make it generic.
    content = content.replace(/locationId\b/g, 'locationSlug');
    // For useParams:
    content = content.replace(/const\s+\{\s*([^}]*?)locationSlug(.*?)?\}\s*=\s*useParams/g, (match, p1, p2) => {
       // if it had locationSlug, it means it was previously locationId
       // We should extract `locationId` and alias it to locationSlug OR change the router path var to `:locationSlug`.
       // Wait, changing the router path is better. Let's change `locationId` to `locationSlug` in App.tsx too.
       return match;
    });
  }

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log(`Fixed ${filepath}`);
  }
});
