import Input from '../index.js';

export default class Suggest extends Input {
  constructor(props) {
    super(props);
    this.type = 'text';

    this.state.suggestionsShown = [{
      label: 'Test AAA',
      value: 'aaa'
    }, {
      label: 'Test BBB',
      value: 'bbb'
    }];
  }

  onFocus() {
  }

  onBlur() {

  }

  onKeyUp(event) {

  }

  afterInput() {
    const { suggestionsShown } = this.state;

    return !Array.isArray(suggestionsShown) || !suggestionsShown.length ? null : (
      <ol>
        {suggestionsShown.map((suggestion, i) => {
          return (
            <li key={`suggestion-${i}`}>
              {suggestion.label}
            </li>
          );
        })}
      </ol>
    );
  }
}
