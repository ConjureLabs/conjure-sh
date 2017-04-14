'use strict';

const async = require('async');
const Route = require('classes/Route');
const log = require('modules/log');

const route = new Route();

route.push((req, res, next) => {
  const { orgName, repoName } = req.params;
  const GitHubWebhookPayload = require('classes/Repo/GitHub/Webhook/Payload');

  const payload = new GitHubWebhookPayload(req.body);
  const { type, action } = payload;

  function respondOkay() {
    res.send({
      success: true,
      type,
      action
    });
  }

  if (type === GitHubWebhookPayload.types.branch) {
    // todo: if the commit is ontop of a PR, we will have to update the vm
    return respondOkay();
  }

  if (type === GitHubWebhookPayload.types.pullRequest) {
    return respondOkay();
  }

  respondOkay();

  const waterfall = [];

  switch (action) {
    case GitHubWebhookPayload.actions.opened:
    case GitHubWebhookPayload.actions.reopened:
      // create vm, comment with link
      
      // todo: move this logic somewhere to avoid repitition
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
        githubClient
          .pr(`${orgName}/${repoName}`)
          .comment({
            body: 'Link should post here',
            commit_id: payload.sha
          }, err => {
            callback(err);
          });
      });
      break;

    case GitHubWebhookPayload.actions.closed:
    case GitHubWebhookPayload.actions.merged:
      // spin down vm
      break;
  }

  async.waterfall(err => {
    if (err) {
      log.error(err);
    }
  });
});

module.exports = route;
