import Input from '../index.js';
import styles, { classes } from './styles.js';

export default class Suggest extends Input {
  constructor(props) {
    super(props);
    this.type = 'text';
    this.suggestionsLimit = props.suggestionsLimit || 6;
    this.defaultSuggestions = Array.isArray(props.defaultSuggestions) && props.defaultSuggestions.length ? props.defaultSuggestions.slice(0, this.suggestionsLimit) : null;

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
    super.onFocus(...arguments);
    this.updateSuggestions();
  }

  onBlur() {
    super.onBlur(...arguments);
    this.setState({
      suggestionsShown: null
    });
  }

  onKeyUp(event) {
    super.onKeyUp(...arguments);
    this.updateSuggestions();
  }

  updateSuggestions() {
    const value = this.input.value.trim();
    const defaultSuggestions = this.defaultSuggestions;

    if (!value) {
      this.setState({
        suggestionsShown: defaultSuggestions // may be null
      });
      return;
    }
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
