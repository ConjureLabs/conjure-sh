import { Component } from 'react';
import { connect } from 'm/ReStore';
import { post } from 'm/xhr';
import Button from 'c/Button';
import classnames from 'classnames';
import AnchorList from 'c/AnchorList';
import styles from './styles.styl';

const getIntegrationBlock = Symbol('get integration block');

class Services extends Component {
  [getIntegrationBlock](service, details) {
    const detailsJsx = !details ? (
      <span className={classnames(styles.details, styles.pending)}>
        Not Connected

        <Button>
          Connect
        </Button>
      </span>
    ) : (
      <span className={classnames(styles.details, styles.connected)}>
        Connected as {details.username}
      </span>
    );

    return (
      <div className={styles.service}>
        <span className={styles.label}>
          {service}
        </span>

        {detailsJsx}
      </div>
    );
  }

  render() {
    const { integrations } = this.props;

    console.log(this.props);

    return (
      <main className={styles.root}>
        <span className={styles.wrap}>
          {Object.keys(integrations).map(key => {
            const integration = integrations[key];
            return this[getIntegrationBlock](key, integration);
          })}
        </span>
      </main>
    );
  }
};

const selector = store => {
  return {
    integrations: store.integrations
  };
};

export default connect(selector)(Services);
