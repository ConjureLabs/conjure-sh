import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';
import TextInput from '../../../components/Input/Text';

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
            <section>
              <h3>Card</h3>

              <ol>
                <li>
                  <TextInput maxLength='19' label='Number' />
                </li>
              </ol>
            </section>
          </main>

          {styles}
        </div>
      </ReStore>
    );
  }
}
