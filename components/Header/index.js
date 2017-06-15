import { connect } from '../../shared/ReStore';
import styles, { classes } from './styles.js';
import classnames from 'classnames';

const Header = ({ org, repo, branch, dispatch }) => {
  return (
    <header className={classes.root}>
      <span className={classes.wrap}>
        <span className={classes.treeLocation}>
          {[
            <h1
              className={classnames(classes.treeNav, classes.serviceName, org === null ? classes.current : null)}
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
                className={classnames(classes.treeNav, classes.orgName, repo === null ? classes.current : null)}
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
                className={classes.separator}
                key='header-content-org-separator'
              >
                /
              </span>
            ),

            repo === null ? null : (
              <h3
                className={classnames(classes.treeNav, classes.repoName, branch === null ? classes.current : null)}
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
                className={classes.separator}
                key='header-content-repo-separator'
              >
                /
              </span>
            ),

            branch === null ? null : (
              <h4
                className={classnames(classes.treeNav, classes.branchName, classes.current)}
                key='header-content-branch'
              >
                {branch}
              </h4>
            )
          ]}
        </span>

        <nav className={classes.userNav}>
          <span
            className={classes.avatar}
            style={{
              backgroundImage: 'url(' + /* staticContent.account.photo */ '' + ')'
            }}
          />

          <ol className={classes.links}>
            <li className={classes.item}>
              <a
                href='/settings'
                className={classes.link}
              >
                Settings
              </a>
            </li>

            <li className={classes.item}>
              <a
                href='/logout'
                className={classes.link}
              >
                Logout
              </a>
            </li>
          </ol>
        </nav>
      </span>

      {styles}
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
