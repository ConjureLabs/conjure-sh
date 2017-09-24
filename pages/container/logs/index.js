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
    const { hostname, port, containerUid, sessionKey } = this.props.url.query;

    console.log(`//${hostname}:${port}`);
    const socket = io(`//${hostname}:${port}/containerUid/logs`);

    socket.emit('auth', sessionKey);

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
