import classnames from 'classnames';
import Link from 'next/link';
import { connect } from 'federal';

import styles, { classes } from './styles.js';

const Header = ({ account, children, wrapped = true, limited = false }) => (
  <header className={classes.root}>
    <span className={classnames({
      [classes.content]: true,
      [classes.wrap]: wrapped
    })}>
      <Link href='/'>
        <h1 className={classes.title}>
          <sup>⎔</sup> Conjure
        </h1>
      </Link>

      <sub className={classes.filler} />

      {children}

      {!account ? null : (
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
                <Link href='/account/billing'>
                  <a className={classes.link}>Billing</a>
                </Link>
              </li>
            )}

            <li className={classes.item}>
              <Link href='/logout'>
                <a className={classes.link}>Logout</a>
              </Link>
            </li>
          </ol>
        </nav>
      )}
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
