const fs = require('fs');
const path = require('path');
const stylus = require('stylus');
const crypto = require('crypto');

const dirsToCrawl = ['components', 'pages'];
const trackDir = path.resolve(__dirname, '.track');
const trackJson = path.resolve(trackDir, 'track.json');

let classNameCount = 0;

try {
  fs.accessSync(trackDir);
} catch(err) {
  fs.mkdir(trackDir);
  fs.writeFileSync(trackJson, '{}', 'utf8');
}

for (let i = 0; i < dirsToCrawl.length; i++) {
  crawlDir(path.resolve(__dirname, '..', '..', dirsToCrawl[i]));
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
  // first check if it has already been generated
  let hashes = JSON.parse(fs.readFileSync(trackJson, 'utf8'));
  const content = fs.readFileSync(filePath, 'utf8');
  const currentHash = crypto.createHash('sha256').update(content).digest('hex');

  if (hashes[filePath] && hashes[filePath] === currentHash) {
    return;
  }

  stylus(content)
    .set('filename', filePath)
    .render((err, css) => {
      if (err) {
        throw err;
      }

      const classLookup = {};

      // see https://stackoverflow.com/questions/448981/which-characters-are-valid-in-css-class-names-selectors
      css = css.replace(/\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/g, (_, className) => {
        if (!classLookup[className]) {
          classLookup[className] = `c-${++classNameCount}`;
        }

        return `.${classLookup[className]}`;
      });

      const isGlobal = filePath.substr(-12) === '.global.styl';
      const jsxDefault = `export default (<style${isGlobal ? ' global' : ''} jsx>{\`${css}\`}</style>);`;
      const jsxLookup = `const classes = ${JSON.stringify(classLookup)};\nexport { classes };`;
      const jsxContent = `import React from 'react';\n\n${jsxDefault}\n\n${jsxLookup}\n`;
      const jsxFilePath = filePath.replace(/\.styl$/, '.js');

      fs.writeFileSync(jsxFilePath, jsxContent, 'utf8');
      console.log(`Generated ${jsxFilePath}`);

      hashes = JSON.parse(fs.readFileSync(trackJson, 'utf8')); // re-read it just to make sure it's up to date
      hashes[filePath] = currentHash;
      fs.writeFileSync(trackJson, JSON.stringify(hashes), 'utf8');
    });
}
