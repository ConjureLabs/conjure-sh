import Input from '../index.js';
import styles, { classes } from './styles.js';
import sortInsensitive from 'conjure-core/modules/utils/Array/sort-insensitive';

export default class Suggest extends Input {
  constructor(props) {
    super(props);
    this.type = 'text';
    this.suggestionsLimit = props.suggestionsLimit || 6;
    this.defaultSuggestions = Array.isArray(props.defaultSuggestions) && props.defaultSuggestions.length ? props.defaultSuggestions.slice(0, this.suggestionsLimit) : null;

    // tracking user-inputted value, in case it clears, and we need to re-fill the input
    this.shadowValue = null;

    // tracking selection
    this.selection = null;

    this.state.suggestionsShown = null;

     /*[{
      label: 'Test AAA',
      value: 'aaa'
    }, {
      label: 'Test BBB',
      value: 'bbb'
    }]; */
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
    }
    super.onBlur(...arguments);
    this.setState({
      suggestionsShown: null
    });
  }

  onKeyUp() {
    super.onKeyUp(...arguments);
    this.updateSuggestions();
  }

  onChange() {
    super.onChange(...arguments);
    this.shadowValue = this.input.value.trim();
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

    const filteredSuggestions = this.props.options.filter(option => {
      return option.label.toLowerCase().indexOf(value) === 0;
    });

    if (filteredSuggestions.length === 0) {
      return this.setState({
        suggestionsShown: null
      });
    }

    sortInsensitive(filteredSuggestions, 'label');

    this.setState({
      suggestionsShown: filteredSuggestions.slice(0, this.suggestionsLimit)
    });
  }

  afterInput() {
    const { suggestionsShown } = this.state;

    return !Array.isArray(suggestionsShown) || !suggestionsShown.length ? null : (
      <ol className={classes.suggestions}>
        {suggestionsShown.map((suggestion, i) => {
          return (
            <li key={`suggestion-${i}`}>
              {suggestion.label}
            </li>
          );
        })}

        {styles}
      </ol>
    );
  }
}
