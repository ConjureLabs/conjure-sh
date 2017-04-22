import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import styles from './styles.styl';

class Status404 extends Component {
  render() {
    return (
      <div className={styles.root}>
        
      </div>
    );
  }
}

const routes = [{
  path: '/',
  indexRoute: {
    component: Status404
  }
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('container')
);
