const Route = require('conjure-core/classes/Route');
const nextApp = require('../../next');

const route = new Route();

/*
  Logged-out landing page
 */
route.push(async (req, res) => {
  if (!req.isAuthenticated()) {
    return nextApp.render(req, res, '/landing', req.query);
  }
});

/*
  May be logged into an account that no longer exists in our system
  This will kick them out, back to the generic / landing
 */
route.push(async (req, res) => {
  // assuming req.isAuthenticated() === true, based on previous .get('/')
  const DatabaseTable = require('conjure-core/classes/DatabaseTable');
  const account = new DatabaseTable('account');
  const accountRows = await account.select({
    id: req.user.id
  });

  // record does not exist in our db - force logout
  if (!accountRows.length) {
    return res.redirect(302, '/logout');
  }

  // checking if user needs onboarding
  if (accountRows[0].onboarded === false) {
    return res.redirect(302, '/onboard');
  }

  // next...
});

/*
  Must be logged in, kick user to conjure dashboard
 */
route.push(async (req, res) => {
  const { org, repo } = req.query;

  if (!org && !repo) {
    return res.redirect('/?org=*&repo=*');
  }

  if (!org || !repo) {
    return;
  }

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call;
  const accountGitHubResult = apiGetAccountGitHub(req);

  const apiGetOrgs = require('conjure-api/server/routes/api/orgs/get.js').call;
  const orgsResult = apiGetOrgs(req);

  const apiGetRepos = require(`conjure-api/server/routes/api/${org === '*' ? '' : `org/${org}/`}repos/get.js`).call;
  const reposResult = apiGetRepos(req);

  const repos = (await reposResult).reposByOrg;

  const queryValues = {
    account: {
      photo: (await accountGitHubResult).account.photo // todo: not rely on github...
    },
    orgs: (await orgsResult).orgs,
    repos: Object.keys(repos).reduce((allRepos, currentOrg) => {
      return allRepos.concat(
        repos[currentOrg].map(repo => slimRepoRecord(repo))
      );
    }, [])
  };

  return nextApp.render(req, res, '/dashboard', queryValues);
});

// reducing the information sent to client
function slimRepoRecord(record) {
  return {
    id: record.id,
    fullName: record.fullName,
    name: record.name,
    org: record.org
  };
}

module.exports = route;
