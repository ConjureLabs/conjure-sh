'use strict';

// todo: set up a module that handles cases like this
const asyncBreak = {};

function createContainer(orgName, repoName, payload, containerName, callback) {
  const waterfall = [];

  // get watched repo record
  waterfall.push(cb => {
    payload.watchedRepoRecord(cb);
  });

  // make sure the repo/branch is not already spun up
  waterfall.push((watchedRepo, cb) => {
    const DatabaseTable = require('classes/DatabaseTable');
    // todo: detect correct server host, but on develop / test keep localhost
    DatabaseTable.select('container_proxies', {
      repo: watchedRepo.id,
      commit_sha: payload.sha
    }, (err, records) => {
      if (err) {
        return cb(err);
      }

      if (records.length) {
        return cb(asyncBreak);
      }

      cb(null, watchedRepo);
    });
  });

  // create container
  waterfall.push((watchedRepo, cb) => {
    const exec = require('child_process').exec;
    // todo: handle non-github repos
    // todo: properly populate setup comamnd
    exec(`bash ./build.sh "git@github.com:${orgName}/${repoName}.git" ${payload.sha} ${containerName} "npm install"`, {
      cwd: process.env.VOYANT_WORKER_DIR
    }, (err, stdout, stderr) => {
      if (err) {
        return cb(err);
      }

      if (stderr) {
        return cb(new Error(stderr));
      }

      cb(null, watchedRepo);
    });
  });

  // run container
  waterfall.push((watchedRepo, cb) => {
    const exec = require('child_process').exec;
    // todo: handle ports properly
    // todo: handle command properly
    exec(`docker run --cidfile /tmp/${containerName}.cid -i -t -d -p ${hostPort}:4000 ${containerName} node ./`, {
      cwd: process.env.VOYANT_WORKER_DIR
    }, (err, stdout, stderr) => {
      if (err) {
        return cb(err);
      }

      if (stderr) {
        return cb(new Error(stderr));
      }

      cb(null, watchedRepo, stdout.trim());
    });
  });

  // save reference for container
  waterfall.push((watchedRepo, containerId, cb) => {
    const DatabaseTable = require('classes/DatabaseTable');
    // todo: detect correct server host, but on develop / test keep localhost
    DatabaseTable.insert('container_proxies', {
      repo: watchedRepo.id,
      commit_sha: payload.sha,
      host: 'localhost',
      port: hostPort,
      container_id: containerId,
      url_uid: containerUid,
      added: new Date()
    }, err => {
      cb(err);
    });
  });

  waterfall.push(cb => {
    // todo: store github repo key on repo level, since 'sender' may differ
    payload.getGitHubAccount((err, gitHubAccount) => {
      if (err) {
        return cb(err);
      }

      if (!gitHubAccount) {
        return cb(new Error('No github account record found'));
      }

      const github = require('octonode');
      const gitHubClient = github.client(gitHubAccount.access_token);

      cb(null, gitHubClient);
    });
  });

  waterfall.push((gitHubClient, cb) => {
    const config = require('modules/config');
    const {
      protocol,
      domain
    } = config.app;

    // todo: not use user's account to post comment (may not be possible, unless can get integration access from github)
    gitHubClient
      .issue(`${orgName}/${repoName}`, payload.number)
      .createComment({
        body: `${protocol}://${domain}:${hostPort}`
      }, err => {
        cb(err);
      });
  });

  async.waterfall(waterfall, err => {
    callback(err);
  });
}