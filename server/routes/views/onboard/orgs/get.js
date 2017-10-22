const Route = require('conjure-core/classes/Route');
const nextApp = require('../../../../next');
const log = require('conjure-core/modules/log')('onboard orgs');

const route = new Route({
  requireAuthentication: true,
  skippedHandler: async (req, res) => {
    nextApp.render(req, res, '/_error');
  }
});

route.push(async (req, res) => {
  // check if account is valid, and should be seeing onboard flow
  const DatabaseTable = require('conjure-core/classes/DatabaseTable');
  const account = new DatabaseTable('account');
  const accountRows = await account.select({
    id: req.user.id
  });

  // record does not exist in our db - force logout
  if (!accountRows.length) {
    return res.redirect(302, '/logout');
  }

  // if already onboarded, then user should not be on this view
  if (accountRows[0].onboarded === true) {
    return res.redirect(302, '/');
  }

  // get github account record
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call;
  const accountGitHubResult = apiGetAccountGitHub(req);

  // get orgs
  const apiGetOrgs = require('conjure-api/server/routes/api/orgs/get.js').call;
  const orgsResult = apiGetOrgs(req);

  nextApp.render(req, res, '/onboard/orgs', {
    account: {
      photo: (await accountGitHubResult).account.photo
    },
    orgs: (await orgsResult).orgs
  });
});

module.exports = route;
