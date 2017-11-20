import { Component } from 'react';
import styles, { classes } from './styles.js';
import Federal from 'federal';
import classnames from 'classnames';
import { post } from '../../../shared/xhr';
import config from '../../../shared/config.js';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

let submitting = false;

export default class OnboardPlan extends Component {
  submit(parallelContainerLimit) {
    if (submitting) {
      return;
    }

    submitting = true;

    post(`${config.app.api.url}/api/onboard/plan/selection`, {
      containerLimit: parallelContainerLimit
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

    console.log(query);

    const initialState = {
      account: query.account
    };

    return (
      <Federal store={initialState}>
        <Header limited={true} />

        <div className={classes.wrap}>
          <header>
            <sup>📦</sup>
            <span>2 containers free, for 2 weeks.</span>
          </header>

          <article>
            <sup>2</sup>
            <span>Choose a Plan</span>
          </article>

          <main>
            <ol>
              <li>
                <ins />

                <div className={classes.cost}>
                  <h3>$50</h3>
                  <p>per month</p>
                </div>

                <div className={classes.label}>
                  <h4>Boostrap</h4>
                  <p>Ideal for small projects</p>
                </div>

                <ul>
                  <li><span className={classes.gotIt}>✓</span> <strong>1</strong> container</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited build minutes</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited repositories</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited collaborators</li>
                </ul>

                <Button
                  size='small'
                  color='blue'
                  hallow={true}
                  onClick={() => {
                    this.submit(1);
                  }}
                  className={classes.button}
                >
                  Select
                </Button>
              </li>

              <li>
                <ins />

                <div className={classes.cost}>
                  <h3>$200</h3>
                  <p>per month</p>
                </div>

                <div className={classes.label}>
                  <h4>Startup</h4>
                  <p>Ideal for small teams</p>
                </div>

                <ul>
                  <li><span className={classes.gotIt}>✓</span> <strong>4</strong> Parallel containers</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited build minutes</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited repositories</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited collaborators</li>
                </ul>

                <Button
                  size='small'
                  color='blue'
                  hallow={false}
                  onClick={() => {
                    this.submit(4);
                  }}
                  className={classes.button}
                >
                  Select
                </Button>
              </li>

              <li>
                <ins />

                <div className={classes.cost}>
                  <h3>$500</h3>
                  <p>per month</p>
                </div>

                <div className={classes.label}>
                  <h4>Business</h4>
                  <p>Ideal for growing companies</p>
                </div>

                <ul>
                  <li><span className={classes.gotIt}>✓</span> <strong>10</strong> Parallel containers</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited build minutes</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited repositories</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited collaborators</li>
                </ul>

                <Button
                  size='small'
                  color='blue'
                  hallow={true}
                  onClick={() => {
                    this.submit(10);
                  }}
                  className={classes.button}
                >
                  Select
                </Button>
              </li>

              <li>
                <ins />

                <div className={classes.cost}>
                  <h3>$900</h3>
                  <p>per month</p>
                </div>

                <div className={classes.label}>
                  <h4>Premium</h4>
                  <p>Ideal for larger teams</p>
                </div>

                <ul>
                  <li><span className={classes.gotIt}>✓</span> <strong>20</strong> Parallel containers</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited build minutes</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited repositories</li>
                  <li><span className={classes.gotIt}>✓</span> Unlimited collaborators</li>
                </ul>

                <Button
                  size='small'
                  color='blue'
                  hallow={true}
                  onClick={() => {
                    this.submit(20);
                  }}
                  className={classes.button}
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
