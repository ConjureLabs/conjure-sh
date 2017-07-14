import styles, { classes } from './styles.js';

export default () => {
  return (
    <span className={classes.wrap}>
      <span className={classes.loader}>
        {styles}
      </span>
    </span>
  );
};
