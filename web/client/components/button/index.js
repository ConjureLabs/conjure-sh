import { Component, PropTypes } from 'react';
import styles from './styles.styl';
import classnames from 'classnames';

export default class Button extends Component {
  render() {
    const { className, children, color, size } = this.props;

    const rootClasses = classnames(
      styles.root,
      styles[`color_${color}`],
      styles[`size_${size}`],
      className
    );

    return (
      <span className={rootClasses}>
        <span className={styles.label}>
          {children}
        </span>
      </span>
    );
  }

  static propTypes = {
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
