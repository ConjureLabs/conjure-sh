import { Component } from 'react';
import actions from './actions';
import { ReStore } from '../../shared/ReStore';

import Header from '../../components/Header';

export default class Dashboard extends Component {
  render() {
    // todo: avoid using props.url.query
    const { query } = this.props.url;

    const initialState = {
      account: query.account
    };

    return (
      <ReStore store={initialState} actions={actions}>
        <Header />
      </ReStore>
    );
  }
}
