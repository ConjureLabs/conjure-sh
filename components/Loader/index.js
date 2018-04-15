import styles, { classes } from './styles.js'
import classnames from 'classnames'

export default ({ className, size = 'medium' }) => (
  <span className={classnames(classes.wrap, classes[`size_${size}`], className)}>
    <span className={classes.loader}>
      {styles}
    </span>
  </span>
)
