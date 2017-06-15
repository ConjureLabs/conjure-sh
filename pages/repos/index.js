import { Component } from 'react';
import ReactDOM from 'react-dom';
import styles, { classes } from './styles.js';
import globalStyles from './styles.global.js';
import actions from './actions';
import { ReStore } from '../../shared/ReStore';

import Header from '../../components/Header';
import MainContent from '../../components/MainContent';

export default class Repos extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.initialState = {
      org: null,
      repo: null,
      branch: null,
      level: 'none',

      onboard: staticContent.onboard,

      resources: {
        repos: staticContent.reposByOrg
      }
    };
  }

  render() {
    return (
      <ReStore store={this.initialStore} actions={actions}>
        <Header />
        <MainContent />

        {styles}
        {globalStyles}
      </ReStore>
    );
  }
}
