import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';
import TextInput from '../../../components/Input/Text';
import CreditCardInput from '../../../components/Input/CreditCard';
import CountrySuggestInput from '../../../components/Input/Suggest/Country';
import UsStateSuggest from '../../../components/Input/Suggest/UsState';
import MonthInput from '../../../components/Input/Month';
import YearInput from '../../../components/Input/Year';
import NumberInput from '../../../components/Input/Number';

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
                  <li>
                    <TextInput label='Name' />
                  </li>
                  <li>
                    <MonthInput label='MM' />
                    <YearInput label='YYYY' start={new Date().getFullYear()} end={new Date().getFullYear() + 20} />
                  </li>
                  <li>
                    <NumberInput maxLength='4' label='CVV' />
                  </li>
                </ol>
              </section>

              <section>
                <span className={classes.sectionLabel}>Billing Address</span>

                <ol>
                  <li>
                    <CountrySuggestInput />
                  </li>
                  <li>
                    <NumberInput maxLength='5' label='Zip' />
                  </li>
                  <li>
                    <UsStateSuggest />
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
