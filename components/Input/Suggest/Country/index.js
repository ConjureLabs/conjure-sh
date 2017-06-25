import SuggestInput from '../index.js';

import countryList from 'country-list';

// see https://stripe.com/docs/currencies#charge-currencies - todo: may want to filter to only currencies supported by stripe?
/*
  countryList().getCodeList() looks like:
  {af: "Afghanistan", ax: "Åland Islands", al: "Albania", dz: "Algeria", as: "American Samoa"…}
 */
const countryCodeList = countryList().getCodeList();
const countrySuggestions = Object.keys(countryCodeList).map(code => {
  return {
    label: countryCodeList[code],
    value: code
  };
});

const defaultSuggestions = [{
  label: 'United States',
  value: 'us'
}, {
  label: 'United Kingdom',
  value: 'gb'
}, {
  label: 'Canada',
  value: 'ca'
}, {
  label: 'Australia',
  value: 'au'
}];

export default props => {
  return (
    <SuggestInput
      label='Country'
      options={countrySuggestions}
      defaultSuggestions={defaultSuggestions}
      {...props}
    />
  );
};
