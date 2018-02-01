// allowing sync methods in this file only
// ... allowing sync in this file since it will only be run at startup, not during the lifetime of the app
/*eslint no-sync: 0*/

const fs = require('fs');
const path = require('path');
const config = require('conjure-core/modules/config');
const log = require('conjure-core/modules/log')();

log.info('beginning setup');
log.timeStart('finished setup');

// configure db connection
require('db').init(config.database.pg, (sql, args) => {
  log.dev.info(sql, process.env.NODE_ENV === 'production' && args ? '---REDACTED---' : args);
});

// crawling routes
const viewsRoutesDir = path.resolve(__dirname, 'routes', 'views');
const jsFileExt = /\.js$/;
const startingDollarSign = /^\$/;
const validVerbs = ['all', 'get', 'post', 'put', 'patch', 'delete'];

// todo: remove ignoreCurrentDir logic, find a cleaner solution
function crawlRoutesDir(ignoreCurrentDir, dirpath, uriPathTokens) {
  if (arguments.length === 2) {
    // at first call, only a directory path is given
    uriPathTokens = [];
  }

  // adding to the tokens of the express route, based on the current directory being crawled
  // a folder starting with a $ will be considered a req param
  // (The : used in express does not work well in directory naming)
  if (ignoreCurrentDir !== true) {
    const base = path.parse(dirpath).base;
    uriPathTokens.push(base.replace(startingDollarSign, ':'));
  }

  const list = fs.readdirSync(dirpath);
  const routes = [];
  const files = [];

  const sortInsensitive = require('utils/Array/sort-insensitive');
  sortInsensitive(list);

  // first looking for subdirectories, getting their recursive routes, then pushing those into the main array
  for (let i = 0; i < list.length; i++) {
    const stat = fs.statSync(path.resolve(dirpath, list[i]));

    if (stat.isFile() && jsFileExt.test(list[i])) {
      files.push(list[i]);
      continue;
    }

    if (stat.isDirectory()) {
      const subdirRoutes = crawlRoutesDir(false, path.resolve(dirpath, list[i]), uriPathTokens.slice());

      for (let j = 0; j < subdirRoutes.length; j++) {
        routes.push(subdirRoutes[j]);
      }
    }
  }

  // looking for direct route handlers in current directory
  for (let i = 0; i < files.length; i++) {
    const verb = files[i].replace(jsFileExt, '').toLowerCase();

    if (!validVerbs.includes(verb)) {
      continue;
    }

    const individualRoute = require(path.resolve(dirpath, files[i]));
    routes.push(individualRoute.expressRouter(verb, '/' + uriPathTokens.join('/')));
  }

  return routes;
}

log.timeEnd('finished setup');

module.exports = {
  routes: {
    views: crawlRoutesDir(true, viewsRoutesDir)
  }
};
