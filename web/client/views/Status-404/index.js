import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import styles from './styles.styl';

class Gif extends Component {
  render() {
    const gifStyles = {
      backgroundImage: `url(${staticContent.gifUrl})`
    };

    return (
      <main
        className={styles.gif}
        style={gifStyles}
      />
    );
  }
}

class Status404 extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Gif />
        <header className={styles.header}>404 - Not Found</header>
      </div>
    );
  }
}

const routes = [{
  path: '*',
  indexRoute: {
    component: Status404
  }
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('container')
);
