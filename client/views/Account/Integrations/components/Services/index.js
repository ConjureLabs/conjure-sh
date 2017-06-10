import { Component } from 'react';
import { connect } from 'm/ReStore';
import { post } from 'm/xhr';
import Button from 'c/Button';
import AnchorList from 'c/AnchorList';
import styles from './styles.styl';

const getIntegrationBlock = Symbol('get integration block');

class Services extends Component {
  [getIntegrationBlock](integration) {
    console.log(integration);
    return <div />;
  }

  render() {
    const { integrations } = this.props;

    console.log(this.props);

    return (
      <main className={styles.root}>
        <span className={styles.wrap}>
          {Object.keys(integrations).map(key => {
            const integration = integrations[key];
            return this[getIntegrationBlock](integration);
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
