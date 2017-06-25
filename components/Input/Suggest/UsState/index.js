import SuggestInput from '../index.js';
import stateSuggestions from './states.js';

export default props => {
  return (
    <SuggestInput
      label='State'
      options={stateSuggestions}
      defaultSuggestions={stateSuggestions}
      {...props}
    />
  );
};
