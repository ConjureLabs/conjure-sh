import React from 'react';
import { connect } from 'react-redux';
import { setOrgs, setRepos } from '../../actions/resources';
import { setReady } from '../../actions/preparation';
import { get } from 'm/xhr';
import selector from './selector';
import styles from './styles.styl';

class Prepare extends React.Component {
  render() {
    return (
      if (ready) {
        return [ children ];
      }

      return (
        <div className={styles.root}>
          <sup className={styles.loader} />
        </div>
      );
    );
  }

  componentDidMount() {
    get('/api/account/resources', (err, data) => {
      if (err) {
        // todo: need to deal with client errors
        throw err;
      }

      const { dispatch } = this.props;

      dispatch(setOrgs(data.orgs)).then(() => {
        dispatch(setRepos(data.repos)).then(() => {
          dispatch(setReady());
        });
      });
    });
  }
}

export default connect(
  selector
)(Prepare);
