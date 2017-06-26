import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';
import classnames from 'classnames';

import Header from '../../../components/Header';
import TextInput from '../../../components/Input/Text';
import CreditCardInput from '../../../components/Input/CreditCard';
import CountrySuggestInput from '../../../components/Input/Suggest/Country';
import UsStateSuggest from '../../../components/Input/Suggest/UsState';
import MonthInput from '../../../components/Input/Month';
import YearInput from '../../../components/Input/Year';
import NumberInput from '../../../components/Input/Number';
import Button from '../../../components/Button';

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
                    <CreditCardInput
                      className={classes.formInput}
                      label='Number'
                    />
                  </li>
                  <li>
                    <TextInput
                      className={classes.formInput}
                      label='Name'
                    />
                  </li>
                  <li>
                    <MonthInput
                      className={classnames(classes.formInput, classes.short)}
                      label='MM'
                    />
                    <YearInput
                      className={classnames(classes.formInput, classes.short)}
                      label='YYYY'
                      start={new Date().getFullYear()}
                      end={new Date().getFullYear() + 20}
                    />
                  </li>
                  <li>
                    <NumberInput
                      className={classes.formInput}
                      maxLength='4'
                      label='CVC'
                    />
                  </li>
                </ol>
              </section>

              <section>
                <span className={classes.sectionLabel}>Billing Address</span>

                <ol>
                  <li>
                    <CountrySuggestInput 
                      className={classes.formInput}
                    />
                  </li>
                  <li>
                    <NumberInput
                      className={classes.formInput}
                      maxLength='5'
                      label='Zip'
                    />
                  </li>
                  <li>
                    <UsStateSuggest 
                      className={classes.formInput}
                    />
                  </li>
                  <li>
                    <TextInput
                      className={classes.formInput}
                      maxLength='200'
                      label='City'
                    />
                  </li>
                  <li>
                    <TextInput
                      className={classes.formInput}
                      maxLength='200'
                      label='Address'
                    />
                  </li>
                  <li>
                    <TextInput
                      className={classes.formInput}
                      maxLength='200'
                      label='Apt / Suite'
                    />
                  </li>
                </ol>
              </section>
            </div>

            <Button
              size='medium'
              color='blue'
              onClick={() => { console.log('hit'); }}
              className={classes.button}
              disabled={true}
            >
              Continue
            </Button>
          </main>

          {styles}
        </div>
      </ReStore>
    );
  }
}
