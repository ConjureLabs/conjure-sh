import { Component } from 'react';
import actions from './actions';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';
import Services from '../../../components/Services';

export default class AccountIntegrations extends Component {
  render() {
    // todo: avoid using props.url.query
    const { query } = this.props.url;

    const initialState = {
      account: query.account,
      integrations: query.integrations
    };

    return (
      <ReStore store={initialState} actions={actions}>
        <Header />
        <Services />
      </ReStore>
    );
  }
}
