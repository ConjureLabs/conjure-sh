import { Component } from 'react';
import { get } from '../../../shared/xhr';
import actions from './actions';
import styles, { classes } from './styles.js';
import { ReStore } from '../../shared/ReStore';

import Header from '../../components/Header';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    // set at render
    this.orgDropdown = null;
  }

  pullTimeline() {
    post(`${config.app.api.url}/api/org/${this.orgDropdown.value}/containers/timeline`, {
      page: 0
    }, (err, data) => {
      if (err) {
        console.error(err);
        alert(err.message);
        return;
      }

      actions.pushTimeline({
        addition: data
      });
    });
  }

  render() {
    // todo: avoid using props.url.query
    const { query } = this.props.url;
    const { account, orgs } = query;

    const initialState = {
      account,
      timeline: null
    };

    return (
      <ReStore store={initialState} actions={actions}>
        <Header>
          <span className={classes.headerContent}>
            <select ref={this.orgDropdown = ref}>
              {orgs.map(org => {
                return (
                  <option value={org.id}>{org.login}</option>
                );
              })}
            </select>
          </span>
        </Header>

        {styles}
      </ReStore>
    );
  }
}
