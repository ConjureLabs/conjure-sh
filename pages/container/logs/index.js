import { Component } from 'react';
import io from 'socket.io-client';

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
    console.log(this.props);
    const { host, containerUid, sessionKey } = this.props.url.query;

    console.log(`${config.app.worker.protocol}//${host}:${config.app.worker.port}`);
    const socket = io(`${config.app.worker.protocol}//${host}:${config.app.worker.port}/container/logs`);

    socket.emit('auth', {
      containerUid,
      sessionKey
    });

    socket.on('content', content => {
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
      <div>{this.state.logContent}</div>
    );
  }
}
