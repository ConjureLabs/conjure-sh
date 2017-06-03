const fs = require('fs');
const path = require('path');
const stylus = require('stylus');

const dirsToCrawl = ['components'];

for (let i = 0; i < dirsToCrawl.length; i++) {
  crawlDir(path.resolve(__dirname, '..', dirsToCrawl[i]));
}

function crawlDir(dir) {
  const list = fs.readdirSync(dir);
  
  for (let i = 0; i < list.length; i++) {
    let pathResolved = path.resolve(dir, list[i]);
    let fileStat = fs.statSync(pathResolved);

    if (fileStat.isDirectory()) {
      crawlDir(pathResolved);
      continue;
    }

    if (fileStat.isFile() && list[i].length > 5 && list[i].substr(-5) === '.styl') {
      prepareStylus(pathResolved);
    }
  }
}

function prepareStylus(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  stylus(content)
    .set('filename', filePath)
    .render((err, css) => {
      if (err) {
        throw err;
      }

      const isGlobal = filePath.substr(-12) === '.global.styl';
      const jsxContent = `export default = (<style${isGlobal ? ' global' : ''} jsx>{\`${css}\`}</style>);\n`;
      const jsxFilePath = filePath.replace(/\.styl$/, '.js');

      fs.writeFileSync(jsxFilePath, jsxContent, 'utf8');
      console.log(`Generated ${jsxFilePath}`);
    });
}
