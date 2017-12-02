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

  const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').call;
  const reposResult = apiGetRepos(req);

  const { reposByOrg } = (await reposResult);
  const repos = Object.keys(reposByOrg).reduce((allRepos, currentOrg) => {
    return allRepos.concat(
      reposByOrg[currentOrg].map(repo => slimRepoRecord(repo))
    );
  }, []);

  const orgs = (await orgsResult).orgs;

  // making sure the query args are valid
  if (org !== '*' && !orgs.find(org => org.name === org)) {
    return;
  }
  // can not view specific repos if viewing all orgs
  if (org === '*' && repo !== '*') {
    return;
  }
  // if viewing a specific repo, validate it is within the specific org
  if (repo !== '*') {
    const found = repos.find(repo => repo.name === repo);
    if (found.org !== org) {
      return;
    }
  }

  // at this point org & repo values should be valid

  const queryValues = {
    account: {
      photo: (await accountGitHubResult).account.photo // todo: not rely on github...
    },
    orgs,
    repos
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
