const nextApp = require('../../next');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;

const handlers = [];

/*
  Repos listing
 */
handlers.push((req, res, next) => {
  const UniqueArray = require('conjure-core/classes/Array/UniqueArray');
  const GitHubRepo = require('conjure-core/classes/Repo/GitHub');
  const DatabaseTable = require('conjure-core/classes/DatabaseTable');
  const accountGithub = new DatabaseTable('account_github');

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').direct;
  apiGetAccountGitHub(req, (err, result) => {
    if (err) {
      return next(err);
    }

    const githubAccount = result.account;

    const github = require('octonode');
    const githubClient = github.client(githubAccount.access_token);

    const async = require('async');
    const allRepos = new UniqueArray('fullName');
    const allOrgs = [];
    const pullRepos = [];
    let somethingWatched = false;

    // getting all (possibly private) org repos
    pullRepos.push(callback => {
      githubClient.get('/user/orgs', {}, (err, status, body) => {
        if (err) {
          return callback(err);
        }

        for (let i = 0; i < body.length; i++) {
          allOrgs.push(body[i]);
        }

        const pullOrgRepos = body.map(org => {
          return cb => {
            githubClient
              .org(org.login)
              .repos((err, repos) => {
                if (err) {
                  return cb(err);
                }

                repos = repos.map(repo => new GitHubRepo(repo));

                for (let i = 0; i < repos.length; i++) {
                  allRepos.push(repos[i]);
                }

                cb();
              });
          };
        });

        async.parallelLimit(pullOrgRepos, 4, callback);
      });
    });

    // user repos
    pullRepos.push(callback => {
      githubClient.user(githubAccount.username).repos((err, repos) => {
        if (err) {
          return callback(err);
        }

        repos = repos.map(repo => new GitHubRepo(repo));

        for (let i = 0; i < repos.length; i++) {
          // filter out repos where the user does not have the correct permissions
          // todo: possibly make it apparent via the UI that repos were not shown?
          if (repos[i].permissions.admin !== true) {
            continue;
          }

          allRepos.push(repos[i]);
        }

        callback();
      });
    });

    // -- beginning series setup

    const series = [];

    // run the `pullRepos` parallel logic defined above
    series.push(callback => {
      async.parallel(pullRepos, callback);
    });

    // checking if any repos are already watched
    series.push(callback => {
      const database = require('conjure-core/modules/database');

      const serviceIds = allRepos.native.map(repo => repo.id);
      const serviceIdPlaceholders = serviceIds
        .map((_, i) => {
          return `$${i + 1}`;
        })
        .join(', ');

      // todo: check at org level - or user level - this is likely to fail if github api has pagination
      database.query(`SELECT COUNT(*) num FROM watched_repo WHERE service = 'github' AND service_repo_id IN (${serviceIdPlaceholders})`, serviceIds, (err, result) => {
        if (err) {
          return callback(err);
        }

        // this should not happen
        if (!Array.isArray(result.rows) || !result.rows.length) {
          return callback(new UnexpectedError('No count returned for table'));
        }

        if (parseInt(result.rows[0].num, 10) !== 0) {
          somethingWatched = true;
        }

        callback();
      });
    });

    async.series(series, err => {
      if (err) {
        return next(err);
      }

      // todo: pagination - should pull org names, then drill in via UI with api calls, which pages (in UI too)
      const finalRepos = allRepos.native;

      const sortInsensitive = require('conjure-core/modules/utils/Array/sort-insensitive');
      sortInsensitive(finalRepos, 'fullName');

      const reposByOrg = finalRepos.reduce((mapping, current) => {
        const orgRepos = mapping[ current.org ];

        if (!Array.isArray(orgRepos)) {
          mapping[ current.org ] = [ current ];
        } else {
          orgRepos.push(current);
        }

        return mapping;
      }, {});

      nextApp.render(req, res, '/repos', {
        reposByOrg: reposByOrg,
        account: {
          photo: githubAccount.photo
        },
        onboard: !somethingWatched
      });
    });
  });
});

module.exports = handlers;
