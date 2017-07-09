import { connect } from '../../shared/ReStore';
import styles, { classes } from './styles.js';
import classnames from 'classnames';

const Header = ({ account }) => {
  return (
    <header className={classes.root}>
      <span className={classes.wrap}>
        <h1 className={classes.serviceName}>
          <sup>⎔</sup> Conjure
        </h1>

        <nav className={classes.userNav}>
          <span
            className={classes.avatar}
            style={{
              backgroundImage: `url(${account.photo})`
            }}
          />

          <ol className={classes.links}>
            <li className={classes.item}>
              <a
                href='/settings'
                className={classes.link}
              >
                Settings
              </a>
            </li>

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
};

const selector = store => {
  return {
    account: store.account
  };
};

export default connect(selector)(Header);
