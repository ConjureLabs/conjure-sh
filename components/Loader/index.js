import styles, { classes } from './styles.js';
import classnames from 'classnames';

export default ({ className }) => (
  <span className={classnames(classes.wrap, className)}>
    <span className={classes.loader}>
      {styles}
    </span>
  </span>
);
