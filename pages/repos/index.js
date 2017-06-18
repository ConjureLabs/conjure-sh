import { Component } from 'react';
import actions from './actions';
import { ReStore } from '../../shared/ReStore';

import Header from '../../components/Header';
import MainContent from '../../components/MainContent';

export default class Repos extends Component {
  render() {
    // todo: avoid using props.url.query
    const { query } = this.props.url;

    const initialState = {
      org: null,
      repo: null,
      branch: null,
      level: 'none',

      onboard: query.onboard,

      resources: {
        repos: query.reposByOrg
      },

      account: query.account
    };

    return (
      <ReStore store={initialState} actions={actions}>
        <Header />
        <MainContent />
      </ReStore>
    );
  }
}
