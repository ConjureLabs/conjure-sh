'use strict';

// todo: should the dirname be capitalized? (`Payload`, since it is a class)

const TYPE_BRANCH = Symbol('is related to a branch');
const TYPE_COMMIT = Symbol('is related to a commit');
const TYPE_PULL_REQUEST = Symbol('is related to a pull request');
const TYPE_UNKNOWN = Symbol('is of unknown type');

const ACTION_ADDED = Symbol('addition');
const ACTION_CLOSED = Symbol('close');
const ACTION_DELETED = Symbol('deletion');
const ACTION_MERGED = Symbol('merge');
const ACTION_OPENED = Symbol('open');
const ACTION_REOPENED = Symbol('re-open');
const ACTION_RESTORED = Symbol('resotration');
const ACTION_UNKOWN = Symbol('uknown action');
const ACTION_UPDATED = Symbol('update');

class WebhookPayload {
  constructor(payload) {
    this.payload = payload;
  }

  static get types() {
    return {
      branch: TYPE_BRANCH,
      commit: TYPE_COMMIT,
      pullRequest: TYPE_PULL_REQUEST,
      uknown: TYPE_UNKNOWN
    };
  }

  static get actions() {
    return {
      added: ACTION_ADDED,
      closed: ACTION_CLOSED,
      deleted: ACTION_DELETED,
      merged: ACTION_MERGED,
      opened: ACTION_OPENED,
      reopened: ACTION_REOPENED,
      restored: ACTION_RESTORED,
      uknown: ACTION_UNKOWN,
      updated: ACTION_UPDATED
    };
  }

  get type() {
    const { payload } = this;

    if (payload.pull_request) {
      return TYPE_PULL_REQUEST;
    }

    if (Array.isArray(payload.commits)) {
      if (isAllZeros(payload.after) || isAllZeros(payload.before)) {
        return TYPE_BRANCH;
      }

      return TYPE_COMMIT;
    }

    return TYPE_UNKNOWN;
  }

  get action() {
    const { payload } = this;
    const type = this.type;

    switch (type) {
      case TYPE_BRANCH:
        if (isAllZeros(payload.after)) {
          return ACTION_CLOSED;
        } else if (isAllZeros(payload.before)) {
          return ACTION_RESTORED;
        }
        return ACTION_UNKOWN;

      case TYPE_COMMIT:
        return ACTION_ADDED;

      case TYPE_PULL_REQUEST:
        switch (payload.action) {
          case 'closed':
            if (typeof payload.pull_request.merged_at === 'string') {
              return ACTION_MERGED;
            }
            return ACTION_CLOSED;

          case 'opened':
            return ACTION_OPENED;

          case 'reopened':
            return ACTION_REOPENED;

          case 'synchronize':
            return ACTION_UPDATED;

          default:
            return ACTION_UNKOWN;
        }

      default:
        return ACTION_UNKOWN;
    }
  }
}

const exprAllZeros = /0/g;
function isAllZeros(str) {
  if (
    str &&
    typeof str === 'string' &&
    str.includes('0') &&
    str.replace(exprAllZeros, '').length === 0
  ) {
    return true;
  }

  return false;
}

module.exports = WebhookPayload;
