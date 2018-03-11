import styles, { classes } from './styles.js'

import Layout from '../../components/Layout'

const Waitlist = ({ url }) => (
  <Layout
    url={url}
    title='Waitlist'
  >
    <div className={classes.content}>
      <h1>Alpha Waitlist</h1>
      <p>Thanks for signing up! Conjure is currently in an Alpha release, and is rolling out full access based on a waitlist.</p>
      <p>The open Beta will be coming soon. We'll be in touch. If you need anything, kick an email to <a href='mailto:info@conjure.sh?subject=Alpha%20Waitlist'>info@conjure.sh</a></p>
      <span>The Conjure Team</span>
    </div>

    {styles}
  </Layout>
)
