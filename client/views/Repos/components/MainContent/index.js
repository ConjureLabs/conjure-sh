getOnboardingMessage() {
  const level = this.level;

  let label, desc;

  switch (level) {
    case 'all':
      label = 'Organization';
      desc = 'Select an Organization to get started';
      break;

    case 'org':
      label = 'Repo';
      desc = 'Select a Repo for Conjure to watch';
      break;

    case 'repo':
      label = 'Repo';
      desc = 'Click "watch repo" to have Conjure listen for changes';
      break;
  }

  return !label ? null : (
    <div className={styles.onboarding}>
      <div className={styles.label}>
        {label}
      </div>

      <div className={styles.description}>
        {desc}
      </div>
    </div>
  );
}

generateActionableContent() {
  const branchNav = this.branchNavContent();
  const level = this.level;

  if (Array.isArray(branchNav)) {
    return (
      <ol className={styles.branchNav}>
        {
          branchNav.map((item, i) => (
            <li
              className={styles.item}
              key={`${level}-${i}`}
            >
              {item}
            </li>
          ))
        }
      </ol>
    );
  }

  if (this.state.branch !== null) {
    return (
      <span>PENDING - SHOULD NOT BE ABLE TO GET HERE</span>
    );
  }

  return (
    <Button
      size='large'
      color='black'
      hallow={true}
      className={styles.listenButton}
      onClick={() => {
        this[enableWatch]();
      }}
    >
      Watch Repo
    </Button>
  );
}

generateMainContent() {
  const actionableContent = this.generateActionableContent();

  if (this.state.onboard === true) {
    return (
      <div className={styles.onboardingContent}>
        {this.getOnboardingMessage()}
        {actionableContent}
      </div>
    );
  }

  return (
    <div>
      <span>
        Normal message
      </span>

      {actionableContent}
    </div>
  );
}

const MainContent = () => {
  return (
    <main className={styles.content}>
      <span className={styles.wrap}>
        <div>Placeholder</div>
      </span>
    </main>
  );
};

export default MainContent;
