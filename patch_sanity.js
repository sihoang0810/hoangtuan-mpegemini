const fs = require('fs');
let code = fs.readFileSync('src/lib/sanity.ts', 'utf8');
code = code.replace("import { client } from './client';", "import { client } from './client';\nimport { PROJECTS_DATA } from '../data/projectsData';");
code = code.replace("fallbackProjects", "PROJECTS_DATA");
fs.writeFileSync('src/lib/sanity.ts', code);
