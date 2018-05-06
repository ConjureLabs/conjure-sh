import styles, { classes } from './styles.js'

export default () => (
  <footer className={classes.root}>
    <div className={classes.base}>
      <h6>Conjure</h6>

      <div className={classes.links}>
        <section>
          <a href='/'>Home</a>
          <a href='/docs'>Docs</a>
          <a href='/blog'>Blog</a>
        </section>
        <section>
          <a href='/privacy'>Privacy Policy</a>
          <a href='/terms'>Terms of Service</a>
        </section>
      </div>
    </div>

    <div className={classes.moreInfo}>
      <div className={classes.presence}>
        <a
          href='https://github.com/ConjureLabs'
          className={classes.iconGithub}
        >
          on GitHub
        </a>

        <del>|</del>

        <a
          href='https://twitter.com/goconjure'
          className={classes.iconTwitter}
        >
          on Twitter
        </a>

        <del>|</del>

        <a href='mailto:info@conjure.sh'>info@conjure.sh</a>
      </div>

      <span>Copyright &copy; {new Date().getFullYear()} Conjure Labs, Inc. All rights reserved.</span>
    </div>

    {styles}
  </footer>
)
