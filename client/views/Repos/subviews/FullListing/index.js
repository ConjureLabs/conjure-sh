import { Component } from 'react';
import { browserHistory } from 'react-router';

import styles from './styles.styl';

class FullListing extends Component {
  render() {
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.serviceName}>Conjure</h1>

          <nav className={styles.userNav}>
            <span
              className={styles.avatar}
              style={{ backgroundImage: 'url(' + staticContent.account.photo + ')' }}
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
        </header>

        <main className={styles.content}>
          <ol className={styles.orgs}>
            {
              Object.keys(staticContent.reposByOrg).map(org => (
                <li className={styles.item}>
                  <a
                    href={`./${org}`}
                    className={styles.link}
                    onClick={() => {
                      this[selectOrg](org);
                    }}
                    key={org}
                  >
                    {org}
                  </a>
                </li>
              ))
            }
          </ol>
        </main>
      </div>
    );
  }
}

export default FullListing;
