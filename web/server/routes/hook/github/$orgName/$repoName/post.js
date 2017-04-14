'use strict';

const async = require('async');
const Route = require('classes/Route');
const log = require('modules/log')('github webhook inbound');

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

  // if (type === GitHubWebhookPayload.types.pullRequest) {
  //   return respondOkay();
  // }

  respondOkay();

  const waterfall = [];

  switch (action) {
    case GitHubWebhookPayload.actions.opened:
    case GitHubWebhookPayload.actions.reopened:
      // create vm, comment with link

      waterfall.push(callback => {
        // todo: store github repo key on repo level, since 'sender' may differ
        payload.getGitHubAccount((err, gitHubAccount) => {
          if (err) {
            return callback(err);
          }

          if (!gitHubAccount) {
            return callback(new Error('No github account record found'));
          }

          const github = require('octonode');
          const gitHubClient = github.client(gitHubAccount.access_token);

          callback(null, gitHubClient);
        });
      });

      waterfall.push((gitHubClient, callback) => {
        // todo: not use user's account to post comment
        gitHubClient
          .issue(`${orgName}/${repoName}`, payload.number)
          .createComment({
            body: 'Link should post here'
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

  async.waterfall(waterfall, err => {
    if (err) {
      log.error(err);
    }
  });
});

module.exports = route;
