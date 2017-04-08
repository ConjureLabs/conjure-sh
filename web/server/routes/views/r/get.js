'use strict';

const Route = require('classes/Route');

const route = new Route();

/*
  Repos listing
 */
route.push((req, res, next) => {
  const UniqueArray = require('classes/Array/UniqueArray');
  const GitHubRepo = require('classes/Repo/GitHub');
  const DatabaseTable = require('classes/DatabaseTable');
  const accountGithub = new DatabaseTable('account_github');

  // todo: assumes account has a github record in our db - we should have more handlers for services like bitbucket
  accountGithub.select({
    account: req.user.id
  }, (err, rows) => {
    if (err) {
      return next(err);
    }

    // should not be possible
    if (!rows.length) {
      return next(new Error('Could not find github account record'));
    }

    // should not be possible
    if (rows.length > 1) {
      return next(new Error('Expected a single row for github account record, received multiple'));
    }

    const githubAccount = rows[0];

    const github = require('octonode');
    const githubClient = github.client(githubAccount.access_token);

    const async = require('async');
    const allRepos = new UniqueArray('fullName');
    const allOrgs = [];
    const pullRepos = [];

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
      githubClient.me().repos((err, repos) => {
        if (err) {
          return callback(err);
        }

        repos = repos.map(repo => new GitHubRepo(repo));

        for (let i = 0; i < repos.length; i++) {
          allRepos.push(repos[i]);
        }

        callback();
      });
    });

    async.parallel(pullRepos, err => {
      if (err) {
        return next(err);
      }

      res.render('repos', {
        name: 'repos',
        repos: allRepos
      });
    });
  });
});

module.exports = route;
