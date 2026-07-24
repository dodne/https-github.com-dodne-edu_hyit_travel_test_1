const fs = require('fs');
const path = require('path');

const distHtmlPath = path.join(__dirname, '../dist/src/index.html');
const rootHtmlPath = path.join(__dirname, '../index.html');
const distAssetsDir = path.join(__dirname, '../dist/assets');
const rootAssetsDir = path.join(__dirname, '../assets');

if (fs.existsSync(distHtmlPath)) {
  let htmlContent = fs.readFileSync(distHtmlPath, 'utf-8');
  htmlContent = htmlContent.replace(/\.\.\/assets\//g, './assets/');
  fs.writeFileSync(rootHtmlPath, htmlContent, 'utf-8');
  console.log('Updated ./index.html with production build assets.');
}

if (fs.existsSync(distAssetsDir)) {
  if (!fs.existsSync(rootAssetsDir)) {
    fs.mkdirSync(rootAssetsDir, { recursive: true });
  }
  const files = fs.readdirSync(distAssetsDir);
  for (const file of files) {
    fs.copyFileSync(
      path.join(distAssetsDir, file),
      path.join(rootAssetsDir, file)
    );
  }
  console.log('Copied built assets to ./assets.');
}
