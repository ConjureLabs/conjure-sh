import Input from '../index.js';
import styles, { classes } from './styles.js';
import sortInsensitive from 'conjure-core/modules/utils/Array/sort-insensitive';
import classnames from 'classnames';

export default class Suggest extends Input {
  constructor(props) {
    super(props);
    this.type = 'text';
    this.options = props.options;
    this.suggestionsLimit = props.suggestionsLimit || 6;
    
    this.defaultSuggestions = Array.isArray(props.defaultSuggestions) && props.defaultSuggestions.length ? props.defaultSuggestions.slice(0, this.suggestionsLimit) : null;

    // tracking user-inputted value, in case it clears, and we need to re-fill the input
    this.shadowValue = null;

    // tracking selection
    this.selection = null;

    // [{ label: 'X', value: 'x' }, ...]
    this.state.suggestionsShown = null;

    // highlighted option (does not need to be selected)
    this.state.highlightedSelection = null;
  }

  get value() {
    return this.selection ? this.selection.value : null;
  }

  onFocus() {
    if (this.shadowValue) {
      this.input.value = this.shadowValue;
    }
    super.onFocus(...arguments);
    this.updateSuggestions();
  }

  onBlur() {
    if (!this.selection) {
      this.input.value = '';
    } else {
      this.input.value = this.selection.label;
    }
    super.onBlur(...arguments);
    this.setState({
      suggestionsShown: null,
      highlightedSelection: null
    });
  }

  onKeyUp() {
    super.onKeyUp(...arguments);
    this.updateSuggestions();
  }

  onKeyDown(event) {
    super.onKeyDown(...arguments);

    const { highlightedSelection, suggestionsShown } = this.state;

    switch (event.key) {
      case 'ArrowDown':
        if (typeof highlightedSelection !== 'number') {
          this.setState({
            highlightedSelection: 0
          });
          break;
        }

        if (highlightedSelection >= suggestionsShown.length - 1) {
          break;
        }

        this.setState({
          highlightedSelection: highlightedSelection + 1
        });
        break;

      case 'ArrowUp':
        if (typeof highlightedSelection !== 'number' || highlightedSelection === 0) {
          break;
        }

        this.setState({
          highlightedSelection: highlightedSelection - 1
        });
        break;

      case 'Enter':
        if (typeof highlightedSelection !== 'number') {
          break;
        }

        this.makeSelection(suggestionsShown[highlightedSelection]);
        // todo: right now Enter blurs, and we need the next input to focus
        break;

      case 'Tab':
        if (typeof highlightedSelection === 'number') {
          this.makeSelection(suggestionsShown[highlightedSelection]);
          break;
        }

        if (!Array.isArray(suggestionsShown)) {
          break;
        }

        this.makeSelection(suggestionsShown[0]);
        break;
    }
  }

  onChange() {
    super.onChange(...arguments);

    const value = this.input.value.trim();

    // if the user manually types out a match, then we should honor it
    if (Array.isArray(this.state.suggestionsShown) && value.toLowerCase() === this.state.suggestionsShown[0].label.toString().toLowerCase()) {
      this.selection = this.state.suggestionsShown[0];
      this.shadowValue = this.selection.label;
      return;
    }

    this.shadowValue = this.input.value.trim();
    this.selection = null;
  }

  updateSuggestions() {
    const value = this.input.value.trim().toLowerCase();
    const defaultSuggestions = this.defaultSuggestions;

    if (!value) {
      this.setState({
        suggestionsShown: defaultSuggestions // may be null
      });
      return;
    }

    const topSuggestions = this.options.filter(option => {
      return option.label.toString().toLowerCase().indexOf(value) === 0;
    });
    sortInsensitive(topSuggestions, 'label');
    const lowerSuggestions = topSuggestions.length >= this.suggestionsLimit ? [] : this.options.filter(option => {
      return option.label.toString().toLowerCase().indexOf(value) > 0 && !topSuggestions.includes(option);
    });
    sortInsensitive(lowerSuggestions, 'label');
    const filteredSuggestions = topSuggestions.concat(lowerSuggestions);

    if (filteredSuggestions.length === 0) {
      return this.setState({
        suggestionsShown: null
      });
    }

    this.setState({
      suggestionsShown: filteredSuggestions.slice(0, this.suggestionsLimit)
    });
  }

  makeSelection(option) {
    this.selection = option;
    this.shadowValue = option.label;
    this.input.value = option.label;
    this.input.blur();
    super.onChange();
  }

  afterInput() {
    const { suggestionsShown } = this.state;

    return !Array.isArray(suggestionsShown) || !suggestionsShown.length ? null : (
      <ol className={classes.suggestions}>
        {suggestionsShown.map((suggestion, i) => {
          return (
            <li
              className={classnames({
                [classes.highlighted]: i === this.state.highlightedSelection
              })}
              key={`suggestion-${i}`}
              onMouseOver={() => {
                this.setState({
                  highlightedSelection: i
                });
              }}
              onMouseDown={() => {
                this.makeSelection.bind(this)(suggestion);
              }}
            >
              {suggestion.label}
            </li>
          );
        })}

        {styles}
      </ol>
    );
  }
}
