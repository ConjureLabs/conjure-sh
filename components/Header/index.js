import { connect } from 'federal';
import styles, { classes } from './styles.js';

const Header = ({ account, children, limited = false }) => (
  <header className={classes.root}>
    <span className={classes.wrap}>
      <h1 onClick={() => {
        window.location = '/';
      }}>
        <sup>⎔</sup> Conjure
      </h1>

      {children}

      <nav className={classes.userNav}>
        <span
          className={classes.avatar}
          style={{
            backgroundImage: `url(${account.photo})`
          }}
        />

        <ol className={classes.links}>
          {limited === true ? null : (
            <li className={classes.item}>
              <a
                href='/account/billing'
                className={classes.link}
              >
                Billing
              </a>
            </li>
          )}

          <li className={classes.item}>
            <a
              href='/logout'
              className={classes.link}
            >
              Logout
            </a>
          </li>
        </ol>
      </nav>
    </span>

    {styles}
  </header>
);

const selector = store => {
  return {
    account: store.account
  };
};

export default connect(selector)(Header);
