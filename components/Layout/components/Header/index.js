import classnames from 'classnames'
import { connect } from '@conjurelabs/federal'
import config from 'client.config.js'

import styles, { classes } from './styles.js'

const Header = ({ account, children, wrapped = true, limited = false }) => (
  <header className={classes.root}>
    <span className={classnames({
      [classes.content]: true,
      [classes.wrap]: wrapped
    })}>
      <a href='/'>
        <h1 className={classes.title}>Conjure</h1>
      </a>

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
            {limited === true || config.stripe.enabled !== true ? null : (
              <li className={classes.item}>
                <a
                  href='/account/subscriptions'
                  className={classes.link}
                >
                  Subscriptions
                </a>
              </li>
            )}

            {limited === true || config.stripe.enabled !== true ? null : (
              <li className={classes.item}>
                <a
                  href='/account/payment'
                  className={classes.link}
                >
                  Payment
                </a>
              </li>
            )}

            <li className={classes.item}>
              <a href='/logout' className={classes.link}>Logout</a>
            </li>
          </ol>
        </nav>
      )}
    </span>

    {styles}
  </header>
)

const selector = store => {
  return {
    account: store.account
  }
}

export default connect(selector)(Header)
