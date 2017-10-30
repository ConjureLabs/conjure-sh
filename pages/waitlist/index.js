import { Component } from 'react';
import styles, { classes } from './styles.js';
import Federal from 'federal';
import Header from '../../components/Header';

class Waitlist extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className={classes.wrap}>
          <div className={classes.content}>
            <h1>Alpha Waitlist</h1>
            <p>Thanks for signing up! Conjure is currently in an Alpha release, and is rolling out full access based on a waitlist.</p>
            <p>The open Beta will be coming soon. We'll be in touch. If you need anything, kick an email to <a href='mailto:info@conjure.sh?subject=Alpha%20Waitlist'>info@conjure.sh</a></p>
            <span>The Conjure Team</span>
          </div>
        </div>
        {styles}
      </div>
    );
  }
}

export default ({ url, children }) => {
  const { account } = url.query;

  const initialState = {
    account
  };

  return (
    <Federal store={initialState}>
      <Waitlist />
    </Federal>
  );
};
