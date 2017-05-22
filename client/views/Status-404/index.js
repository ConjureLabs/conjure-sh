import { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.styl';

const checkWebpSupport = Symbol('check webp animation support');

class Gif extends Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
      canUseWebp: false
    };
  }

  componentDidMount() {
    this[checkWebpSupport](webpSupported => {
      this.setState({
        isReady: true,
        canUseWebp: webpSupported
      });
    });
  }

  /*
    Based on `check_webp_feature` from https://developers.google.com/speed/webp/faq
   */
  [checkWebpSupport](callback) {
    const testImage = new Image();

    testImage.onload = () => {
      const result = testImage.width > 0 && testImage.height > 0;
      callback(true);
    };

    testImage.onerror = () => {
      callback(false);
    };

    testImage.src = 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA';
  }

  render() {
    const { isReady, canUseWebp } = this.state;
    const imageUrl = !isReady ? null :
      canUseWebp && staticContent.webpUrl ? staticContent.webpUrl :
      staticContent.gifUrl;

    const gifStyles = imageUrl ? {
      backgroundImage: `url(${imageUrl})`
    } : {};

    return (
      <main
        className={styles.gif}
        style={gifStyles}
      />
    );
  }
}

const Status404 = () => {
  return (
    <div className={styles.root}>
      <Gif />
      <header className={styles.header}>Page Not Found</header>
    </div>
  );
};

ReactDOM.render(
  <Status404 />,
  document.getElementById('container')
);
