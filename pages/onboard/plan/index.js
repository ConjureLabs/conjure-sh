import { Component } from 'react';
import styles, { classes } from '../styles.js';
import Federal from 'federal';
import classnames from 'classnames';
import { post } from '../../../shared/xhr';
import config from '../../../shared/config.js';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

let submitting = false;

export default class OnboardPlan extends Component {
  submit(planName) {
    if (submitting) {
      return;
    }

    submitting = true;

    post(`${config.app.api.url}/api/onboard/plan/selection`, {
      name: planName
    }, err => {
      if (err) {
        console.error(err);
        alert(err.message);
        submitting = false;
        return;
      }

      window.location = '/onboard/billing';
    });
  }

  render() {
    const { query } = this.props.url;

    const initialState = {
      account: query.account
    };

    return (
      <Federal store={initialState}>
        <Header />

        <div className={classes.wrap}>
          <header>
            <sup>📦</sup>
            <span>2 containers free, for 2 weeks.</span>
          </header>

          <article>
            <sup>2</sup>
            <span>Conjure Plan</span>
          </article>

          <main>
            <ol>
              <li>
                <header>
                  <h3>$100</h3>
                  <span>per month</span>
                </header>

                <div className={classes.label}>
                  <h4>Boostrap</h4>
                  <span>Ideal for small projects</span>
                </div>

                <ul>
                  <li><strong>2</strong> Parallel containers</li>
                  <li>Unlimited build minutes</li>
                  <li>Unlimited repositories</li>
                  <li>Unlimited collaborators</li>
                </ul>

                <Button
                  size='small'
                  color='blue'
                  hallow={true}
                  onClick={() => {
                    this.submit('boostrap');
                  }}
                  className={classes.button}
                  disabled={!this.state.formFilledIn}
                >
                  Select
                </Button>
              </li>

              <li>
                <header>
                  <h3>$200</h3>
                  <span>per month</span>
                </header>

                <div className={classes.label}>
                  <h4>Startup</h4>
                  <span>Ideal for small teams</span>
                </div>

                <ul>
                  <li><strong>4</strong> Parallel containers</li>
                  <li>Unlimited build minutes</li>
                  <li>Unlimited repositories</li>
                  <li>Unlimited collaborators</li>
                </ul>

                <Button
                  size='small'
                  color='blue'
                  hallow={false}
                  onClick={() => {
                    this.submit('startup');
                  }}
                  className={classes.button}
                  disabled={!this.state.formFilledIn}
                >
                  Select
                </Button>
              </li>

              <li>
                <header>
                  <h3>$500</h3>
                  <span>per month</span>
                </header>

                <div className={classes.label}>
                  <h4>Business</h4>
                  <span>Ideal for growing companies</span>
                </div>

                <ul>
                  <li><strong>10</strong> Parallel containers</li>
                  <li>Unlimited build minutes</li>
                  <li>Unlimited repositories</li>
                  <li>Unlimited collaborators</li>
                </ul>

                <Button
                  size='small'
                  color='blue'
                  hallow={true}
                  onClick={() => {
                    this.submit('business');
                  }}
                  className={classes.button}
                  disabled={!this.state.formFilledIn}
                >
                  Select
                </Button>
              </li>

              <li>
                <header>
                  <h3>$900</h3>
                  <span>per month</span>
                </header>

                <div className={classes.label}>
                  <h4>Premium</h4>
                  <span>Ideal for larger teams</span>
                </div>

                <ul>
                  <li><strong>20</strong> Parallel containers</li>
                  <li>Unlimited build minutes</li>
                  <li>Unlimited repositories</li>
                  <li>Unlimited collaborators</li>
                </ul>

                <Button
                  size='small'
                  color='blue'
                  hallow={true}
                  onClick={() => {
                    this.submit('premium');
                  }}
                  className={classes.button}
                  disabled={!this.state.formFilledIn}
                >
                  Select
                </Button>
              </li>
            </ol>
          </main>

          {styles}
        </div>
      </Federal>
    );
  }
}
