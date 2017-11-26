import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ClickOutside from 'react-click-outside';

import styles, { classes } from './styles';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    const { value, options } = props;

    const selectedOption = typeof value === undefined ? null : options.find(opt => opt.value === value);

    this.state = {
      open: false,
      selectedOption: selectedOption
    };
  }

  get value() {
    const { selectedOption } = this.state;

    if (!selectedOption) {
      return null;
    }

    return selectedOption.value;
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  select(option) {
    this.setState({
      open: false,
      selectedOption: option
    });
  }

  render() {
    const { label, options, className } = this.props;
    const { open, selectedOption } = this.state;

    return (
      <ClickOutside
        className={classnames({
          [classes.root]: true,
          [classes.initialPlaceholder]: !selectedOption && !open
        })}
        onClickOutside={this.close.bind(this)}
      >
        <div
          className={classnames(classes.dropdown, className)}
          onClick={this.toggleOpen.bind(this)}
        >
          {!label ? null : (<label>{label}</label>)}

          <span className={classes.selection}>
            <span className={classes.text}>
              {selectedOption ? selectedOption.label : null}
            </span>
            &nbsp;
            <span className={classes.arrow}>▼</span>
          </span>

          {!open ? null : (
            <div className={classes.options}>
              {options
                .filter(option => {
                  return !selectedOption ? true : option.value !== selectedOption.value;
                })
                .map(option => (
                  <span
                    className={classnames(classes.option, option.className)}
                    onClick={this.select.bind(this, option)}
                  >
                    {option.label}
                  </span>
                ))
              }
            </div>
          )}


          {styles}
        </div>

      </ClickOutside>
    );
  }

  static propTypes = {
    label: PropTypes.string,

    options: props => {
      const { options } = props;

      if (!Array.isArray(options)) {
        return new Error('Dropdown options must be an array');
      }

      if (!options.length) {
        return new Error('Dropdown must have at least one option');
      }

      const validOptions = options.every(opt => {
        return typeof opt.label === 'string' &&
          (
            typeof opt.value === 'string' ||
            typeof opt.value === 'number'
          );
      });

      if (!validOptions) {
        return new Error('Dropdown options are missing necessary attributes');
      }

      const uniqueValues = options.reduce((values, opt) => {
        if (!values.includes(opt.value)) {
          values.push(opt.value);
        }
        return values;
      }, []);

      if (uniqueValues.length !== options.length) {
        return new Error('Dropdown options must have unique values');
      }
    },

    value: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number
    ])
  }
}
