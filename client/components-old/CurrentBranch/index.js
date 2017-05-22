import React, { PropTypes } from 'react';

import styles from './styles.styl';

export default const CurrentBranch = ({ org, repo, branch, onSelect }) => {
  return [
    <h1
      className={classnames(styles.treeNav, styles.serviceName, org === null ? styles.current : null)}
      onClick={org === null ? null : () => {
        this[selectNothing]();
      }}
      key='header-content-⎔'
    >
      ⎔
    </h1>,

    org === null ? null : (
      <h2
        className={classnames(styles.treeNav, styles.orgName, repo === null ? styles.current : null)}
        onClick={repo === null ? null : () => {
          this[selectOrg](org);
        }}
        key='header-content-org'
      >
        {org}
      </h2>
    ),

    repo === null ? null : (
      <span
        className={styles.separator}
        key='header-content-org-separator'
      >
        /
      </span>
    ),

    repo === null ? null : (
      <h3
        className={classnames(styles.treeNav, styles.repoName, branch === null ? styles.current : null)}
        onClick={branch === null ? null : () => {
          this[selectRepo](repo);
        }}
        key='header-content-repo'
      >
        {repo.name}
      </h3>
    ),

    branch === null ? null : (
      <span
        className={styles.separator}
        key='header-content-repo-separator'
      >
        /
      </span>
    ),

    branch === null ? null : (
      <h4
        className={classnames(styles.treeNav, styles.branchName, styles.current)}
        key='header-content-branch'
      >
        {branch}
      </h4>
    )
  ];
};
