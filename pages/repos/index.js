import { Component } from 'react';
import ReactDOM from 'react-dom';
import styles, { classes } from './styles.js';
import actions from './actions';
import { ReStore } from '../../shared/ReStore';

import Header from '../../components/Header';
import MainContent from '../../components/MainContent';

/*
{ url: 
   { query: { reposByOrg: [Object], account: [Object], onboard: true },
     pathname: '/repos',
     back: [Function: back],
     push: [Function: push],
     pushTo: [Function: pushTo],
     replace: [Function: replace],
     replaceTo: [Function: replaceTo] } }
 */
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

        {styles}
      </ReStore>
    );
  }
}
