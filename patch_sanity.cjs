const fs = require('fs');
let code = fs.readFileSync('src/lib/sanity.ts', 'utf8');
if (!code.includes("import { PROJECTS_DATA }")) {
  code = code.replace("import { locationsQuery", "import { PROJECTS_DATA } from '../data/projectsData';\nimport { locationsQuery");
}
code = code.replace(/fallbackProjects/g, "PROJECTS_DATA");
fs.writeFileSync('src/lib/sanity.ts', code);
