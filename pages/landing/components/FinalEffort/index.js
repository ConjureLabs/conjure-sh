import styles, { classes } from './styles.js'

import Button from '../../../../components/Button'

export default ({ submitForm }) => (
  <div className={classes.root}>
    <div className={classes.inner}>
      <ul>
        <li>✓ Get set up in seconds</li>
        <li>✓ Multi-language support</li>
        <li>✓ Test every pull request</li>
        <li>✓ Build with our API & CLI</li>
        <li>✓ Parallel instances</li>
        <li>✓ Simple YML configuration</li>
        <li>✓ Create private share links</li>
        <li>✓ Tail logs</li>
      </ul>

      <div className={classes.ctaContainer}>
        <h2>Start Building With Conjure</h2>

        <Button
          size='large'
          className={classes.cta}
          color='white'
          hallow={false}
          onClick={submitForm}
        >
          <span className={classes.label}>Sign Up</span>
        </Button>
      </div>
    </div>

    {styles}
  </div>
)
