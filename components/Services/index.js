import { Component } from 'react';
import { connect } from '../../shared/ReStore';
import { post } from '../../shared/xhr';
import Button from '../Button';
import classnames from 'classnames';
import AnchorList from '../AnchorList';
import styles, { classes } from './styles.js';

class Services extends Component {
  getIntegrationBlock(service, details) {
    const detailsJsx = !details ? (
      <span className={classnames(classes.details, classes.pending)}>
        Not Connected

        <Button>
          Connect
        </Button>
      </span>
    ) : (
      <span className={classnames(classes.details, classes.connected)}>
        Connected as {details.username}
      </span>
    );

    return (
      <div className={classes.service}>
        <span className={classes.label}>
          {service}
        </span>

        {detailsJsx}
      </div>
    );
  }

  render() {
    const { integrations, className } = this.props;

    console.log(this.props);

    return (
      <main className={classnames(classes.root, className)}>
        <span className={classes.wrap}>
          {Object.keys(integrations).map(key => {
            const integration = integrations[key];
            return this.getIntegrationBlock(key, integration);
          })}
        </span>

        {styles}
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
