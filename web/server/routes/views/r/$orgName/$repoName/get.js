'use strict';

const Route = require('classes/Route');

const route = new Route();

/*
  Repo view
 */
route.push((req, res, next) => {
  const { orgName, repoName } = req.params;

  const DatabaseTable = require('classes/DatabaseTable');
  const accountGithub = new DatabaseTable('account_github');

  // todo: assumes account has a github record in our db - we should have more handlers for services like bitbucket
  // todo: this is shared logic (also in dashboard render) - should consolidate into one shared resource
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

    githubClient.repo(`${orgName}/${repoName}`).info((err, info) => { 
      if (err) {
        return next(err);
      }

      if (!info || !info.permissions) {
        return next(new Error('Unexpected payload'));
      }

      if (info.permissions.admin !== true) {
        return next(new Error('Must be admin to enable voyant'));
      }

      listen(githubClient, orgName, repoName, err => {
        if (err) {
          return next(err);
        }

        res.send('Okay, listening');
      });
    });
  });
});

module.exports = route;

function listen(githubClient, orgName, repoName, callback) {
  const config = require('modules/config');

  console.log(`${config.app.protocol}://${config.app.host}/hook/github/${orgName}/${repoName}`);

  githubClient.org(orgName).repo(repoName).hook({
    name: 'Voyant Listener',
    active: true,
    events: ['push', 'pull_request'],
    config: {
      content_type: 'json',
      insecure_ssl: 1, // todo: config this - see https://developer.github.com/v3/repos/hooks/#create-a-hook
      secret: config.services.github.inboundWebhookScret,
      url: `${config.app.protocol}://${config.app.host}/hook/github/${orgName}/${repoName}`
    }
  }, callback);
}
