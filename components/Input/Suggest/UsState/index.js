import SuggestInput from '../index.js';
import stateSuggestions from './states.js';

export default class UsStateSuggest extends SuggestInput {
  constructor(props) {
    super(props);

    this.options = stateSuggestions;
    this.defaultSuggestions = stateSuggestions.slice(0, this.stateSuggestions);
  }
}
