import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import BranchNav from 'c/BranchNav';

const mapStateToProps = (state, ownProps) => {
  return {
    org: state.org,
    
  };
};

let Header = ({ dispatch }) => {
  return (
    <header className={styles.header}>
      <span className={styles.wrap}>
        <span className={styles.treeLocation}>
          <BranchNav
            org, repo, branch, onSelect
          />
        </span>

        <nav className={styles.userNav}>
          <span
            className={styles.avatar}
            style={{ backgroundImage: 'url(' + staticContent.account.photo + ')' }}
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