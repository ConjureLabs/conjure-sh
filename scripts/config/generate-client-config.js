/*
source ./.profile && node ./scripts/config/generate-client-config.js
 */

const config = require('conjure-core/modules/config');

const clientConfig = {
  app: {
    api: {
      url: config.app.api.url
    }
  }
};

const path = require('path');
const fs = require('fs');

const sharedDir = path.resolve(__dirname, '..', '..', 'shared');

const configContent = `export default ${JSON.stringify(clientConfig)};\n`;

fs.writeFileSync(path.resolve(sharedDir, 'config.js'), configContent, 'utf8');
console.log('Generated client config');
