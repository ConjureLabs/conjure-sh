import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';
import TextInput from '../../../components/Input/Text';
import CreditCardInput from '../../../components/Input/CreditCard';
import SuggestInput from '../../../components/Input/Suggest';


import countryList from 'country-list';
// const countrySuggestions = countryCodes.map(country => {
//   return {
//     label: country.name,
//     value: country.iso2
//   };
// });

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

export default class OnboardBilling extends Component {
  render() {
    const { query } = this.props.url;

    const initialState = {
      account: query.account
    };

    return (
      <ReStore store={initialState}>
        <Header />

        <div className={classes.wrap}>
          <header>
            <sup>💳</sup>
            <span>The first N of bandwidth will be free.</span>
          </header>

          <article>
            <sup>2</sup>
            <span>Billing</span>
          </article>

          <main>
            <div className={classes.sectionsParent}>
              <section>
                <span className={classes.sectionLabel}>Card</span>

                <ol>
                  <li>
                    <CreditCardInput label='Number' />
                  </li>
                </ol>
              </section>

              <section>
                <span className={classes.sectionLabel}>Billing Address</span>

                <ol>
                  <li>
                    <SuggestInput
                      label='Country'
                      options={countrySuggestions}
                      defaultSuggestions={defaultSuggestions}
                    />
                  </li>
                </ol>
              </section>
            </div>
          </main>

          {styles}
        </div>
      </ReStore>
    );
  }
}
