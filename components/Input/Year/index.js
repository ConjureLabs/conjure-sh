import SuggestInput from '../Suggest';

export default class YearSuggest extends SuggestInput {
  constructor(props) {
    super(props);

    this.options = [];

    if (!props.start) {
      throw new Error('Year input expects a start year');
    }
    if (!props.end) {
      throw new Error('Year input expects an end year');
    }

    this.propKeysPruned.push('start');
    this.propKeysPruned.push('end');

    for (let i = parseInt(props.start, 10); i <= parseInt(props.end, 10); i++) {
      this.options.push({
        label: i,
        value: i
      });
    }

    this.defaultSuggestions = this.options.slice(0, this.suggestionsLimit);
  }
}
