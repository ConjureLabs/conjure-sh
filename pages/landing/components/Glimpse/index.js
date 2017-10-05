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

        <span className={classes.commentWrap}>
          <span className={classes.author} />

          <span className={classes.comment}>
            <div className={classes.header}>
              <span className={classes.handle}>tmarshall</span>

              commented on Oct 4
            </div>

            <span className={classes.body}>This is some text and more text</span>
          </span>
        </span>
      </div>

      {styles}
    </div>
  );
};
