import styles, { classes } from './styles.js';

export default () => {
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <ins />
        <ins />
        <ins />
      </div>

      <div className={classes.content}>
        <span className={classes.title}>New Sidebar</span>
        <ins>Open</ins>

        <span className={classes.author} />
      </div>

      {styles}
    </div>
  );
};
