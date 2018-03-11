import classnames from 'classnames'

import styles, { classes } from './styles.js'

export default ({ className }) => (
  <ol className={classnames(classes.root, className)}>
    <li>
      <ins />

      <div className={classes.cost}>
        <h3>$50</h3>
        <p>per month</p>
      </div>

      <div className={classes.label}>
        <h4>Boostrap</h4>
        <p>For small projects</p>
      </div>

      <ul>
        <li><span className={classes.gotIt}>✓</span> <strong>1</strong> container</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited build minutes</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited repositories</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited collaborators</li>
      </ul>
    </li>

    <li>
      <ins />

      <div className={classes.cost}>
        <h3>$200</h3>
        <p>per month</p>
      </div>

      <div className={classes.label}>
        <h4>Startup</h4>
        <p>For small teams</p>
      </div>

      <ul>
        <li><span className={classes.gotIt}>✓</span> <strong>4</strong> Parallel containers</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited build minutes</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited repositories</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited collaborators</li>
      </ul>
    </li>

    <li>
      <ins />

      <div className={classes.cost}>
        <h3>$500</h3>
        <p>per month</p>
      </div>

      <div className={classes.label}>
        <h4>Business</h4>
        <p>For growing companies</p>
      </div>

      <ul>
        <li><span className={classes.gotIt}>✓</span> <strong>10</strong> Parallel containers</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited build minutes</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited repositories</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited collaborators</li>
      </ul>
    </li>

    <li>
      <ins />

      <div className={classes.cost}>
        <h3>$900</h3>
        <p>per month</p>
      </div>

      <div className={classes.label}>
        <h4>Premium</h4>
        <p>For larger teams</p>
      </div>

      <ul>
        <li><span className={classes.gotIt}>✓</span> <strong>20</strong> Parallel containers</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited build minutes</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited repositories</li>
        <li><span className={classes.gotIt}>✓</span> Unlimited collaborators</li>
      </ul>
    </li>

    {styles}
  </ol>
)
