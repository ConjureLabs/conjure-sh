'use strict';

const async = require('async');
const Route = require('classes/Route');

// todo: move port logic into a class, and use available ports that are free'd
let workerPort = process.env.PORT;

// todo: set up a module that handles cases like this
const asyncBreak = {};

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

  respondOkay();

  const Container = require('classes/Container');
  const container = new Container(orgName, repoName, payload);

  function finish() {
    if (err) {
      log.error(err);
    }
  }

  // todo: what to do if a container is still starting and the pr is closed?

  switch (action) {
    // spin up vm
    case GitHubWebhookPayload.actions.opened:
    case GitHubWebhookPayload.actions.reopened:
      container.start(finish);
      break;

    // spin down vm
    case GitHubWebhookPayload.actions.closed:
    case GitHubWebhookPayload.actions.merged:
      container.kill(finish);
      break;

    // update running vm
    case GitHubWebhookPayload.actions.updated:
      container.update(finish);
      break;
  }

  async.waterfall(waterfall, err => {
    if (err) {
      if (err === asyncBreak) {
        return;
      }

      log.error(err);
    }
  });
});

module.exports = route;
