import { Component, PropTypes } from 'react';
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
    const { className, children, color, size, hallow } = this.props;

    const rootClasses = classnames(
      styles.root,
      styles[`color_${color}`],
      styles[`size_${size}`],
      hallow === true ? styles.hallow : null,
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

    hallow: PropTypes.bool,

    onClick: PropTypes.func,

    size: PropTypes.oneOf([
      'large',
      'small'
    ]).isRequired
  }
}
