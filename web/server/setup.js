'use strict';

// allowing sync methods in this file only
// ... allowing sync in this file since it will only be run at startup, not during the lifetime of the app
/*eslint no-sync: 0*/

const fs = require('fs');
const path = require('path');

// crawling routes
const apiRoutesDir = path.resolve(__dirname, 'routes', 'api');
const viewsRoutesDir = path.resolve(__dirname, 'routes', 'views');
const jsFileExt = /\.js$/;

function crawlRoutesDir(dirpath) {
  const list = fs.readdirSync(dirpath);
  const routes = [];
  const files = [];

  list.sort((a, b) => {
    // see http://stackoverflow.com/questions/8996963/how-to-perform-case-insensitive-sorting-in-javascript
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  for (let i = 0; i < list.length; i++) {
    const stat = fs.statSync(path.resolve(dirpath, list[i]));

    if (stat.isFile() && jsFileExt.test(list[i])) {
      files.push(list[i]);
      continue;
    }

    if (stat.isDirectory()) {
      const subdirRoutes = crawlRoutesDir(path.resolve(dirpath, list[i]));

      for (let j = 0; j < subdirRoutes.length; j++) {
        routes.push(subdirRoutes[j]);
      }
    }
  }

  for (let i = 0; i < files.length; i++) {
    const verb = files[i].replace(jsFileExt, '');
    const individualRoute = require(path.resolve(dirpath, files[i]));
    routes.push(individualRoute.expressRouter(verb));
  }
  
  return routes;
}

module.exports = {
  routes: {
    api: crawlRoutesDir(apiRoutesDir),
    views: crawlRoutesDir(viewsRoutesDir)
  }
};
