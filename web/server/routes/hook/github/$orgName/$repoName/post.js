'use strict';

const Route = require('classes/Route');

const route = new Route();

route.push((req, res, next) => {
  const { orgName, repoName } = req.params;
  const GitHubWebhookPayload = require('classes/GitHub/webhook/payload');

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

  switch (action) {
    case GitHubWebhookPayload.actions.opened:
    case GitHubWebhookPayload.actions.reopened:
      // create vm, comment with link
      break;

    case GitHubWebhookPayload.actions.closed:
    case GitHubWebhookPayload.actions.merged:
      // spin down vm
      break;
  }

  respondOkay();
});

module.exports = route;
