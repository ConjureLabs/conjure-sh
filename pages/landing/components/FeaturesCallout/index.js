import styles, { classes } from './styles.js'

export default () => (
  <div className={classes.root}>
    <div className={classes.inner}>
      <section className={classes.moveFast}>
        <ins />
        <div className={classes.content}>
          <h3>
            <span>Move faster. Code more.</span>
            <sub/>
          </h3>
          <p>Conjure gives quick access to view working changes,</p>
          <p>so your team can focus on shipping code.</p>
        </div>
      </section>

      <section className={classes.pricing}>
        <ins />
        <div className={classes.content}>
          <h3>
            <span>Pay for what you use</span>
            <sub/>
          </h3>
          <p>$0.50 <span>/ build</span></p>
          <p>$0.15 <span>/ hr running</span></p>
        </div>
      </section>

      <section className={classes.privateRepos}>
        <ins />
        <div className={classes.content}>
          <h3>
            <span>Private instances</span>
            <sub/>
          </h3>
          <p>Private repos require users to log in with</p>
          <p>GitHub before viewing changes.</p>
        </div>
      </section>

      <section className={classes.githubIntegration}>
        <ins />
        <div className={classes.content}>
          <h3>
            <span>GitHub integration</span>
            <sub/>
          </h3>
          <p>Enable GitHub hooks and Conjure will</p>
          <p>spin up every PR.</p>
        </div>
      </section>
    </div>

    {styles}
  </div>
)
