import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';
import TextInput from '../../../components/Input/Text';
import CreditCardInput from '../../../components/Input/CreditCard';
import Dropdown from '../../../components/Input/Dropdown';

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
                      label='Number'
                      maxLength='19'
                    />
                  </li>
                </ol>
              </section>

              <section>
                <span className={classes.sectionLabel}>Billing Address</span>

                <ol>
                  <li>
                    <Dropdown
                      label='Country'
                      options={[
                        {label: 'United States', value: 'usa'},
                        {label: 'Thailand', value: 'th'}
                      ]}
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
