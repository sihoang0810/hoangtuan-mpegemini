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
  if(filepath.includes('LocationContext.tsx')) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Pattern replacements for usages
  content = content.replace(/const \{ location: appLocation \} = useLocation\(\);/g, 'const { locationSlug } = useLocation();');
  content = content.replace(/const \{ locationId, location: appLocation, changeLocation \} = useLocation\(\);/g, 'const { locationSlug, changeLocation } = useLocation();');
  content = content.replace(/const \{ locationId \} = useLocation\(\);/g, 'const { locationSlug } = useLocation();');
  content = content.replace(/const \{ location, setShowPopup, locations \} = useLocation\(\);/g, 'const { locationSlug, setShowPopup, locations } = useLocation();');
  content = content.replace(/const \{ location, locations \} = useLocation\(\);/g, 'const { locationSlug, locations } = useLocation();');
  
  content = content.replace(/const siteLocationPrefix = appLocation === 'Hồ Chí Minh' \? '\/ho-chi-minh' : '\/bao-loc';/g, "const siteLocationPrefix = '/' + locationSlug;");
  content = content.replace(/appLocation === 'Hồ Chí Minh' \? '\/ho-chi-minh' : '\/bao-loc'/g, "'/' + locationSlug");
  content = content.replace(/appLocation === 'Hồ Chí Minh'/g, "locationSlug === 'ho-chi-minh'");
  content = content.replace(/location === 'Hồ Chí Minh'/g, "locationSlug === 'ho-chi-minh'");
  content = content.replace(/locationId === 'hcm'/g, "locationSlug === 'ho-chi-minh'");
  content = content.replace(/locationId === 'ho-chi-minh'/g, "locationSlug === 'ho-chi-minh'");

  // some locations had `const { locationId } = useParams();` - these are from route params. 
  // We need to keep router params as `locationId` or rename them, but the prompt says 
  // they replaced `const { locationId } = useLocation()` above.

  if(content.includes('locationId') && content.includes('useLocation()')) {
    // just in case
    console.log("WARN: locationId still next to useLocation in " + filepath);
  }

  // specifically footer
  content = content.replace(/locationId === 'ho-chi-minh' \|\| locationId === 'hcm'/g, "locationSlug === 'ho-chi-minh'");

  // any remaining appLocation
  content = content.replace(/\bappLocation\b/g, 'locationSlug');

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log(`Updated ${filepath}`);
  }
});
