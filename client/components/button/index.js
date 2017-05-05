import { Component, PropTypes } from 'react';
import styles from './styles.styl';
import classnames from 'classnames';

const handleOnClick = Symbol('handle defined onClick');

export default class Button extends Component {
  [handleOnClick]() {
    const { onClick } = this.props;

    if (onClick) {
      onClick(new Event('Button Clicked'));
    }
  }

  render() {
    const { className, children, color, size } = this.props;

    const rootClasses = classnames(
      styles.root,
      styles[`color_${color}`],
      styles[`size_${size}`],
      className
    );

    return (
      <span
        className={rootClasses}
        onClick={this[handleOnClick].bind(this)}
      >
        <span className={styles.label}>
          {children}
        </span>
      </span>
    );
  }

  static propTypes = {
    color: PropTypes.oneOf([
      'black',
      'peach',
      'pink',
      'purple'
    ]).isRequired,

    onClick: PropTypes.func,

    size: PropTypes.oneOf([
      'large',
      'small'
    ]).isRequired
  }
}
