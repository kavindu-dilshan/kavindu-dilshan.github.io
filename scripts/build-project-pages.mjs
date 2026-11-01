import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import ts from 'typescript';

// Reuse the portfolio's typed project data without maintaining a second catalog.
const root = resolve(import.meta.dirname, '..');
const dataPath = resolve(root, 'src/data/projects.ts');
const assets = [];
const source = (await readFile(dataPath, 'utf8')).replace(/import (\w+) from "([^"]+)";/g, (_, name, path) => {
  const image = resolve(dirname(dataPath), path);
  assets.push(image);
  return `const ${name} = ${JSON.stringify('/projects/images/' + basename(image))};`;
});
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { projects } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const { projectUrl } = await import(`data:text/javascript;base64,${Buffer.from(ts.transpileModule(await readFile(resolve(root, 'src/data/projectUrl.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText).toString('base64')}`);
const site = 'https://kavindu-dilshan.github.io';
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
await mkdir(resolve(root, 'dist/projects/images'), { recursive: true });
for (const image of assets) await copyFile(image, resolve(root, 'dist/projects/images', basename(image)));

for (const project of projects) {
  const path = projectUrl(project.title);
  const title = `${project.title} | ${project.category === 'mobile app' ? 'Mobile' : 'Web'} Development Project | Kavindu Dilshan`;
  const related = projects.filter((item) => item.id !== project.id && item.category === project.category);
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(project.description)}">
<link rel="canonical" href="${site}${path}"><link rel="icon" href="/Icon.svg">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(project.description)}"><meta property="og:url" content="${site}${path}">
<meta property="og:image" content="${site}${esc(project.image)}">
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#0e0e14;color:#f4f2ff;font:17px/1.75 system-ui,sans-serif}main,header,footer{max-width:960px;margin:auto;padding:24px}header{border-bottom:1px solid #333}a{color:#c8b5ff;text-underline-offset:4px}a:hover{color:white}a:focus-visible{outline:2px solid #c8b5ff;outline-offset:4px}h1{font-size:clamp(2.4rem,7vw,4.5rem);line-height:1.1;margin:24px 0}h2{margin-top:40px;line-height:1.3}p{max-width:75ch}img{width:100%;height:auto;border-radius:16px;margin-top:24px}.muted{color:#b4b0c5}.tags,.links{display:flex;flex-wrap:wrap;gap:12px}.tags span{background:#262032;border:1px solid #48385f;border-radius:30px;padding:5px 16px}.links{gap:24px}footer{border-top:1px solid #333;margin-top:40px}li{margin:8px 0}
</style></head><body>
<header><a href="/">Kavindu Dilshan — Portfolio</a></header>
<main><p class="muted">${esc(project.category)} · ${esc(project.date)}</p><h1>${esc(project.title)}</h1>
<p>${esc(project.description)}</p><div class="tags" aria-label="Technologies">${project.tags.map((tag) => `<span>${esc(tag)}</span>`).join('')}</div>
<img src="${esc(project.image)}" alt="${esc(project.title)} application screenshot" width="1200" decoding="async">
<h2>About the project</h2><p>${esc(project.title)} is a ${esc(project.category)} featured in Kavindu Dilshan's development portfolio. Explore the source code for implementation details and setup instructions.</p>
<div class="links"><a href="${esc(project.github)}">View source code on GitHub</a>${project.webapp && project.webapp !== project.github ? `<a href="${esc(project.webapp)}">Visit the application</a>` : ''}</div>
<h2>Technology stack</h2><ul>${project.tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
<h2>${project.member.length > 1 ? 'Project team' : 'Developer'}</h2><ul>${project.member.map((member) => `<li><a href="${esc(member.github)}">${esc(member.name)}</a></li>`).join('')}</ul>
${related.length ? `<h2>More ${project.category === 'mobile app' ? 'mobile' : 'web'} projects</h2><ul>${related.map((item) => `<li><a href="${projectUrl(item.title)}">${esc(item.title)}</a></li>`).join('')}</ul>` : ''}
<h2>Have a project in mind?</h2><p><a href="/#contact">Contact Kavindu Dilshan</a> to discuss web development, mobile apps, or design.</p></main>
<footer><a href="/#projects">Explore the full portfolio</a> · <a href="https://github.com/kavindu-dilshan">GitHub</a> · <a href="https://www.linkedin.com/in/kavindudilshan84/">LinkedIn</a></footer>
</body></html>`;
  const directory = resolve(root, 'dist', path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
await writeFile(resolve(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['/', ...projects.map((project) => projectUrl(project.title))].map((path) => `  <url><loc>${site}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated ${projects.length} static project pages and sitemap.xml`);
