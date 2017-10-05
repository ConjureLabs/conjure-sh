import styles, { classes } from './styles.js';
import classnames from 'classnames';

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

              commented one minute ago
            </div>

            <span className={classes.body}>Updated the sidebar so that it's easier for users to get to settings</span>
          </span>
        </span>

        <ol className={classes.timeline}>
          <li>
            <span className={classes.author} />
            <span className={classes.commit}>added new dropdown</span>
          </li>
          <li>
            <span className={classes.author} />
            <span className={classes.commit}>styled sidebar changes</span>
          </li>
          <li>
            <span className={classes.author} />
            <span className={classes.commit}>tweaks from design</span>
          </li>
          <li>
            <span className={classes.author} />
            <span className={classes.commit}>changed some label text</span>
          </li>
        </ol>

        <span className={classes.commentWrap}>
          <span className={classnames(classes.comment, classes.fromConjure)}>
            <div className={classes.header}>
              <span className={classes.handle}>Conjure</span>

              commented just now
            </div>

            <span className={classes.body}>
              <span className={classes.simulateLink}>You can view this branch on Conjure</span>
            </span>
          </span>
        </span>
      </div>

      {styles}
    </div>
  );
};
