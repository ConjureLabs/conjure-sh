const Route = require('conjure-core/classes/Route');
const nextApp = require('../../../../next');

const route = new Route({
  requireAuthentication: true,
  skippedHandler: async (req, res) => {
    return nextApp.render(req, res, '/_error');
  }
});

route.push(async (req, res) => {
  const orgSelected = req.query.org;

  if (!orgSelected) {
    return;
  }

  // get github account record
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call;
  const accountGitHubResult = apiGetAccountGitHub(req);

  // get repos currently watching
  const apiWatchedSummary = require('conjure-api/server/routes/api/watched/summary/get.js').call;
  const watchedSummary = await apiWatchedSummary(req);
  const { watched } = watchedSummary;

  // get all repos
  const apiGetRepos = require('conjure-api/server/routes/api/org/$orgSelected/repos/get.js').call;
  const reposResult = await apiGetRepos(req, {}, {
    orgSelected
  });

  if (!reposResult || !Array.isArray(reposResult[orgSelected]) || !reposResult[orgSelected].length) {
    return;
  }

  return nextApp.render(req, res, '/watch/org', {
    account: {
      photo: (await accountGitHubResult).account.photo
    },
    repos: reposResult[orgSelected],
    watchedRepos: watched.repos
  });
});

module.exports = route;
