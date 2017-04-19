'use strict';

const async = require('async');
const Route = require('classes/Route');
const log = require('modules/log')('github webhook inbound');

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

  const uid = require('uid');
  const containerUid = uid(24);

  const containerName = containerUid; // `${orgName}-${repoName}-${payload.sha}`;
  const hostPort = workerPort++;
  const waterfall = [];

  switch (action) {
    // spin up vm
    case GitHubWebhookPayload.actions.opened:
    case GitHubWebhookPayload.actions.reopened:
      // get watched repo record
      waterfall.push(callback => {
        payload.watchedRepoRecord(callback);
      });

      // make sure the repo/branch is not already spun up
      waterfall.push((watchedRepo, callback) => {
        const DatabaseTable = require('classes/DatabaseTable');
        // todo: detect correct server host, but on develop / test keep localhost
        DatabaseTable.select('container_proxies', {
          repo: watchedRepo.id,
          commit_sha: payload.sha
        }, (err, records) => {
          if (err) {
            return callback(err);
          }

          if (records.length) {
            return callback(asyncBreak);
          }

          callback(null, watchedRepo);
        });
      });

      // create container
      waterfall.push((watchedRepo, callback) => {
        const exec = require('child_process').exec;
        // todo: handle non-github repos
        // todo: properly populate setup comamnd
        // todo: use uid for container names, instead of branch name
        exec(`bash ./build.sh "git@github.com:${orgName}/${repoName}.git" ${payload.sha} ${containerName} "npm install"`, {
          cwd: process.env.VOYANT_WORKER_DIR
        }, (err, stdout, stderr) => {
          if (err) {
            return callback(err);
          }

          if (stderr) {
            return callback(new Error(stderr));
          }

          callback(null, watchedRepo);
        });
      });

      // run container
      waterfall.push((watchedRepo, callback) => {
        const exec = require('child_process').exec;
        // todo: handle ports properly
        // todo: handle command properly
        exec(`docker run --cidfile /tmp/${containerName}.cid -i -t -d -p ${hostPort}:4000 ${containerName} node ./`, {
          cwd: process.env.VOYANT_WORKER_DIR
        }, (err, stdout, stderr) => {
          if (err) {
            return callback(err);
          }

          if (stderr) {
            return callback(new Error(stderr));
          }

          callback(null, watchedRepo, stdout.trim());
        });
      });

      // save reference for container
      waterfall.push((watchedRepo, containerId, callback) => {
        const DatabaseTable = require('classes/DatabaseTable');
        // todo: detect correct server host, but on develop / test keep localhost
        DatabaseTable.insert('container_proxies', {
          repo: watchedRepo.id,
          host: 'localhost',
          port: hostPort,
          container_id: containerId,
          url_uid: containerUid,
          added: new Date()
        }, err => {
          callback(err);
        });
      });

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
        const config = require('modules/config');
        const {
          protocol,
          host
        } = config.app;

        // todo: not use user's account to post comment (may not be possible, unless can get integration access from github)
        gitHubClient
          .issue(`${orgName}/${repoName}`, payload.number)
          .createComment({
            body: `${protocol}://${host}:${hostPort}` // `${protocol}://${publicHost}/c/${containerUid}`
          }, err => {
            callback(err);
          });
      });
      break;

    // spin down vm
    case GitHubWebhookPayload.actions.closed:
    case GitHubWebhookPayload.actions.merged:
      const waterfall = [];

      // get watched repo record
      waterfall.push(callback => {
        payload.watchedRepoRecord(callback);
      });

      // need to add sha
      waterfall.push((watchedRepo, callback) => {
        const DatabaseTable = require('classes/DatabaseTable');
        DatabaseTable.select('container_proxies', {
          repo: watchedRepo.id
        }, (err, records) => {
          if (err) {
            return callback(err);
          }

          if (!records.length)
        });
      });
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
