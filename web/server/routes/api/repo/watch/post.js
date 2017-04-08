'use strict';

const Route = require('classes/Route');

const route = new Route();

route.push((req, res, next) => {
  const DatabaseTable = require('classes/DatabaseTable');
  const async = require('async');

  const {
    service,
    url,
    name,
    fullName,
    orgName,
    repoName,
    githubId,
    isPrivate,
    vm
  } = req.body;

  const waterfall = [];

  waterfall.push(callback => {
    const accountGithub = new DatabaseTable('account_github');

    // todo: assumes account has a github record in our db - we should have more handlers for services like bitbucket
    // todo: this is shared logic (also in dashboard render) - should consolidate into one shared resource
    accountGithub.select({
      account: req.user.id
    }, (err, rows) => {
      if (err) {
        return callback(err);
      }

      // should not be possible
      if (!rows.length) {
        return callback(new Error('Could not find github account record'));
      }

      // should not be possible
      if (rows.length > 1) {
        return callback(new Error('Expected a single row for github account record, received multiple'));
      }

      const githubAccount = rows[0];

      const github = require('octonode');
      const githubClient = github.client(githubAccount.access_token);

      callback(null, githubClient);
    });
  });

  waterfall.push((githubClient, callback) => {
    githubClient.repo(`${orgName}/${repoName}`).info((err, info) => { 
      if (err) {
        return callback(err);
      }

      if (!info || !info.permissions) {
        return callback(new Error('Unexpected payload'));
      }

      if (info.permissions.admin !== true) {
        return callback(new Error('Must be admin to enable voyant'));
      }

      callback(null, githubClient, orgName, repoName);
    });
  });

  waterfall.push((githubClient, orgName, repoName, callback) => {
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
    }, err => {
      callback(err);
    });
  });

  waterfall.push(callback => {
    DatabaseTable.insert('watched_repos', {
      account: req.user.id,
      service,
      service_repo_id: githubId,
      url,
      name,
      vm,
      private: isPrivate,
      disabled: false,
      added: new Date()
    }, err => {
      callback(err);
    });
  });

  async.waterfall(waterfall, err => {
    if (err) {
      return next(err);
    }

    res.send({
      success: true
    });
  });
});

module.exports = route;
