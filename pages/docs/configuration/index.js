import Layout from '../../../components/Layout';

import styles, { classes } from './styles.js';

export default ({ url }) => {
  return (
    <Layout
      url={url}
      title='Configuration'
      className={classes.root}
    >
      <h2>Project Configuration</h2>

      <p>To get started with Conjure, you first need to add a simple configuration file to your project.</p>
      <p>The file path needs to be <span className={classes.code}>.conjure/config.yml</span>.</p>

      <hr />

      <a href='#example'>
        <h3 id='example'>Simple Example</h3>
      </a>

      <p>A simple example for a Node-based project's <span className={classes.code}>config.yml</span>:</p>

      <div className={classes.codeBlock}>
        <pre>{`machine:
  languages:
    node:
      version: 8.6.0

  pre:
    - npm install
    - npm run build

  start: "node server.js"

  port: 3002`}</pre>
      </div>

      {styles}
    </Layout>
  );
};
