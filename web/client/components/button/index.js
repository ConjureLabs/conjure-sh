import { Component, PropTypes } from 'react';
import styles from './styles.styl';

export default class Button extends Component {
  render() {
    const { children } = this.props;
    return (
      <span className={styles.root}>
        <span className={styles.label}>
          {children}
        </span>
      </span>
    );
  }
}
