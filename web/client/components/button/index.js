import { Component, PropTypes } from 'react';
import styles from './styles.styl';
import classnames from 'classnames';

export default class Button extends Component {
  render() {
    const { children, color, size } = this.props;

    return (
      <span className={classnames(styles.root, styles[`color_${color}`], styles[`size_${size}`])}>
        <span className={styles.label}>
          {children}
        </span>
      </span>
    );
  }

  propTypes = {
    color: PropTypes.oneOf([
      'black',
      'peach'
    ]).isRequired,

    size: PropTypes.oneOf([
      'large',
      'small'
    ]).isRequired
  }
}
