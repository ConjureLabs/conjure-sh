import styles from './styles.styl';
import classnames from 'classnames';

const Header = () => {
  return (
    <header className={styles.root}>
      <span className={styles.wrap}>
        <span className={styles.navigation}>
          <h1
            className={styles.serviceName}
            onClick={() => {
              window.location = '/';
            }}
          >
            ⎔ Conjure
          </h1>
        </span>

        <nav className={styles.userNav}>
          <span
            className={styles.avatar}
            style={{
              backgroundImage: 'url(' + staticContent.account.photo + ')'
            }}
          />

          <ol className={styles.links}>
            <li className={styles.item}>
              <a
                href='/settings'
                className={styles.link}
              >
                Settings
              </a>
            </li>

            <li className={styles.item}>
              <a
                href='/logout'
                className={styles.link}
              >
                Logout
              </a>
            </li>
          </ol>
        </nav>
      </span>
    </header>
  );
};

export default Header;
