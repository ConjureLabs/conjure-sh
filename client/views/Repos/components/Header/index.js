import { connect } from 'm/ReStore';
import styles from './styles.styl';
import classnames from 'classnames';

const Header = ({ org, repo, branch, dispatch }) => {
  return (
    <header className={styles.root}>
      <span className={styles.wrap}>
        <span className={styles.treeLocation}>
          {[
            <h1
              className={classnames(styles.treeNav, styles.serviceName, org === null ? styles.current : null)}
              onClick={org === null ? null : () => {
                dispatch.selectPlacementInBranchTree({
                  level: 'none'
                });
              }}
              key='header-content-⎔'
            >
              ⎔
            </h1>,

            org === null ? null : (
              <h2
                className={classnames(styles.treeNav, styles.orgName, repo === null ? styles.current : null)}
                onClick={repo === null ? null : () => {
                  dispatch.selectPlacementInBranchTree({
                    level: 'org',
                    value: org
                  });
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
                  dispatch.selectPlacementInBranchTree({
                    level: 'repo',
                    value: repo
                  });
                }}
                key='header-content-repo'
              >
                {repo}
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
          ]}
        </span>

        <nav className={styles.userNav}>
          <span
            className={styles.avatar}
            style={{
              backgroundImage: 'url(' + staticContent.account.photo + ')'
            }}
          />

          <ol className={styles.links}>
            <li className={styles.item}>
              <a
                href='/settings'
                className={styles.link}
              >
                Settings
              </a>
            </li>

            <li className={styles.item}>
              <a
                href='/logout'
                className={styles.link}
              >
                Logout
              </a>
            </li>
          </ol>
        </nav>
      </span>
    </header>
  );
};

const selector = store => {
  return {
    org: store.org,
    repo: store.repo,
    branch: store.branch
  };
};

export default connect(selector)(Header);
