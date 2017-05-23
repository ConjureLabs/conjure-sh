import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/branchTree';
import BranchNav from 'c/BranchNav';
import select from './selector';
import styles from './styles.styl';

const Header = ({  }) => {
  return (
    <main className={styles.root}>
      <span className={styles.wrap}>
        {
          this.generateMainContent()
        }
      </span>
    </main>
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
