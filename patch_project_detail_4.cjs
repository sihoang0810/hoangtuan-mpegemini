const fs = require('fs');
let code = fs.readFileSync('src/pages/ProjectDetail.tsx', 'utf8');

code = code.replace(
  "</section>\n          {/* Specifications details if available */}",
  "</section>\n          )}\n\n          {/* Specifications details if available */}"
);

fs.writeFileSync('src/pages/ProjectDetail.tsx', code);
