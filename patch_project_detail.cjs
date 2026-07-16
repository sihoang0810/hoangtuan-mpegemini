const fs = require('fs');
let code = fs.readFileSync('src/pages/ProjectDetail.tsx', 'utf8');

// Replace standard imports
code = code.replace("import { PROJECTS_DATA, Project } from '../data/projectsData';", `import { getProjectBySlug, getProjectBySlugSync, CMSProject, client } from '../lib/sanity';
import { PortableText } from '@portabletext/react';`);

fs.writeFileSync('src/pages/ProjectDetail.tsx', code);
