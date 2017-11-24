import styles, { classes } from './styles.js';

export default () => (
  <footer className={classes.root}>
    <span>Copyright &copy; 2017 Conjure Labs, Inc.</span>
    <del>|</del>
    <a href='/about'>About</a>
    <del>|</del>
    <a href='/privacy'>Privacy</a>
    <del>|</del>
    <a href='/terms'>Terms</a>
    {styles}
  </footer>
);
