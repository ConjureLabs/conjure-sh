import { Component } from 'react';
import io from 'socket.io-client';
import styles, { classes } from './styles.js';

import config from '../../../shared/config.js';

export default class ContainerLogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logsContent: ''
    };

    this.socket = null;
  }

  componentDidMount() {
    const { host, containerUid, sessionKey } = this.props.url.query;

    console.log(`${config.app.worker.protocol}//${host}:${config.app.worker.port}`);
    const socket = io(`//localhost:${config.app.worker.port}/container/logs`);

    socket.emit('auth', {
      containerUid,
      sessionKey
    });

    socket.on('out', content => {
      this.setState({
        logsContent: this.state.logsContent + content
      });
    });

    socket.on('err', content => {
      this.setState({
        logsContent: this.state.logsContent + content
      });
    });

    this.socket = socket;
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className={classes.root}>
        <pre dangerouslySetInnerHTML={{ __html: styledContent(this.state.logsContent) }} />
        {styles}
      </div>
    );
  }
}

import AnsiConverter from 'ansi-to-html';
const converter = new AnsiConverter({
  fg: '#000',
  bg: '#FFF'
});

function styledContent(content) {
  return converter.toHtml(content);
}
