const fs = require('fs');
let code = fs.readFileSync('src/pages/ProjectDetail.tsx', 'utf8');

// Replace project.gallery with images
code = code.replace(/project\.gallery/g, "images");

// Ensure images exist before mapping
code = code.replace("images.map((img, idx) =>", "images && images.map((img, idx) =>");

// Replace project.category, etc
code = code.replace(/\{project\.challenges\}/g, "{project.challenges || project.description}");
code = code.replace(/\{project\.solutions\}/g, "{project.solutions || project.description}");

// Hide missing UI sections
code = code.replace("{/* Challenges & Solutions */}", "{/* Challenges & Solutions */}\n          {(project.challenges || project.solutions) && (");
code = code.replace("</section>\n\n          {/* Before/After Tool", "</section>\n          )}\n\n          {/* Before/After Tool");

code = code.replace("{/* Before/After Tool embedded right in the article */}", "{/* Before/After Tool embedded right in the article */}\n          {project.beforeAfter && (");
code = code.replace("</section>\n\n          {/* Key Outcome */}", "</section>\n          )}\n\n          {/* Key Outcome */}");

code = code.replace("{/* Key Outcome */}", "{/* Key Outcome */}\n          {project.outcome && (");
code = code.replace("</div>\n\n          {/* Detailed Services Package Summary */}", "</div>\n          )}\n\n          {/* Detailed Services Package Summary */}");

code = code.replace("{/* Detailed Services Package Summary */}", "{/* Detailed Services Package Summary */}\n          {project.packages && project.packages.length > 0 && (");
code = code.replace("</div>\n\n          {/* Execution Steps */}", "</div>\n          )}\n\n          {/* Execution Steps */}");

code = code.replace("{/* Execution Steps */}", "{/* Execution Steps */}\n          {project.steps && project.steps.length > 0 && (");
code = code.replace("</section>\n\n          {/* Technical Specifications Tab-like Box */}", "</section>\n          )}\n\n          {/* Technical Specifications Tab-like Box */}");

code = code.replace("{/* Technical Specifications Tab-like Box */}", "{/* Technical Specifications Tab-like Box */}\n          {project.specifications && project.specifications.length > 0 && (");
code = code.replace("</div>\n\n          {/* Detailed FAQ */}", "</div>\n          )}\n\n          {/* Detailed FAQ */}");

code = code.replace("{/* Detailed FAQ */}", "{/* Detailed FAQ */}\n          {project.faq && project.faq.length > 0 && (");
code = code.replace("</div>\n\n          {/* Project Image Gallery */}", "</div>\n          )}\n\n          {/* Project Image Gallery */}");

// Wait, the services
code = code.replace("{/* Left Info Card */}", "{/* Left Info Card */}\n          {project.services && (");
code = code.replace("{/* Core Article Content */}", ")}\n\n          {/* Core Article Content */}");


// Add PortableText rendering where description is
code = code.replace(
  '<p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium whitespace-pre-line">\n              {project.fullDescription}\n            </p>',
  `<div className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
              {project.content ? (
                <div className="prose prose-slate max-w-none">
                  <PortableText value={project.content} />
                </div>
              ) : (
                <p className="whitespace-pre-line">{project.description}</p>
              )}
            </div>`
);


fs.writeFileSync('src/pages/ProjectDetail.tsx', code);
