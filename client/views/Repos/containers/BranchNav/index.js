import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions';
import BranchNav from 'c/BranchNav';
import select from './selector';

const Header = ({ org, repo, branch, onSelect }) => {
  return (
    <header className={styles.root}>
      <span className={styles.wrap}>
        <span className={styles.treeLocation}>
          <BranchNav
            org={org}
            repo={repo}
            branch={branch}
            onSelect={onSelect}
          />
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

const mapDispatchToProps = dispatch => {
  return {
    onSelect: (level, value) => {
      dispatch(selectTreePlacement(level, value));
    }
  };
};

export default connect(
  selector,
  mapDispatchToProps
)(Header);
