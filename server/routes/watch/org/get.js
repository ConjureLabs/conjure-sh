const Route = require('@conjurelabs/route');
const nextApp = require('../../../next');

const route = new Route({
  requireAuthentication: true,
  skippedHandler: async (req, res) => {
    return nextApp.render(req, res, '/_error');
  }
});

route.push(async (req, res) => {
  // get github account record
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call;
  const accountGitHubResult = apiGetAccountGitHub(req);

  // get orgs
  const apiGetOrgs = require('conjure-api/server/routes/api/orgs/get.js').call;
  const orgsResult = apiGetOrgs(req);

  const apiWatchedOrgs = require('conjure-api/server/routes/api/watched/orgs/get.js').call;
  const watchedOrgs = apiWatchedOrgs(req);

  return nextApp.render(req, res, '/watch/org', {
    account: {
      photo: (await accountGitHubResult).account.photo
    },
    orgs: (await orgsResult).orgs,
    watchedOrgs: (await watchedOrgs)
  });
});

module.exports = route;
