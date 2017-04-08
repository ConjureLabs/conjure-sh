'use strict';

const Route = require('classes/Route');

const route = new Route();

route.push((req, res, next) => {
  const DatabaseTable = require('classes/DatabaseTable');

  const {
    service,
    url,
    name,
    githubId,
    isPrivate,
    vm
  } = req.body;

  DatabaseTable.insert('enabled_repos', {
    account: req.user.id,
    service,
    service_repo_id: githubId,
    url,
    name,
    vm,
    private: isPrivate,
    disabled: false,
    added: new Date()
  }, (err, row) => {
    if (err) {
      return next(err);
    }

    res.send(row);
  });
});

module.exports = route;
