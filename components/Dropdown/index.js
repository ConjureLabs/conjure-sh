import { Component } from 'react';
import classnames from 'classnames';

import styles, { classes } from './styles';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open
    });
  }

  get value() {
    return this.props.options[0].value;
  }

  render() {
    const { placeholder, options } = this.props;
    const { open } = this.state;

    return (
      <div
        className={classes.root}
        onClick={this.toggleOpen.bind(this)}
      >
        <span className={classes.placeholder}>{placeholder || 'Select a value'}</span>

        {!open ? null : (
          <div className={classes.options}>
          {options.map(option => (
            <span className={classnames(classes.option, option.className)}>
              {option.label}
            </span>
          ))}
          </div>
        )}

        {styles}
      </div>
    );
  }
}
