import Layout from '../../../components/Layout';

import styles, { classes } from './styles.js';

import ExpandableList from './components/expandable-list';

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

      <a href='#languages'>
        <h3 id='languages'>Languages Supported</h3>
      </a>

      <p>The following languages, and versions, are supported out-of-the-box:</p>

      <a href='#languages-node'>
        <h3 id='languages-node'>Node</h3>
      </a>

      <ExpandableList
        className={classes.list}
        items={[
          { suppress: false, content: '8.x' },
          { suppress: true, content: '8.8.1' },
          { suppress: true, content: '8.8.0' },
          { suppress: true, content: '8.7.0' },
          { suppress: true, content: '8.6.0' },
          { suppress: true, content: '8.5.0' },
          { suppress: true, content: '8.4.0' },
          { suppress: true, content: '8.3.0' },
          { suppress: true, content: '8.2.1' },
          { suppress: true, content: '8.2.0' },
          { suppress: true, content: '8.1.4' },
          { suppress: true, content: '8.1.3' },
          { suppress: true, content: '8.1.2' },
          { suppress: true, content: '8.1.1' },
          { suppress: true, content: '8.1.0' },
          { suppress: true, content: '8.0.0' },
          { suppress: false, content: '7.x' },
          { suppress: true, content: '7.10.1' },
          { suppress: true, content: '7.10.0' },
          { suppress: true, content: '7.9.0' },
          { suppress: true, content: '7.8.0' },
          { suppress: true, content: '7.7.4' },
          { suppress: true, content: '7.7.3' },
          { suppress: true, content: '7.7.2' },
          { suppress: true, content: '7.7.1' },
          { suppress: true, content: '7.7.0' },
          { suppress: true, content: '7.6.0' },
          { suppress: true, content: '7.5.0' },
          { suppress: true, content: '7.4.0' },
          { suppress: true, content: '7.2.1' },
          { suppress: true, content: '7.2.0' },
          { suppress: true, content: '7.1.0' },
          { suppress: true, content: '7.0.0' },
          { suppress: false, content: '6.x' },
          { suppress: true, content: '6.11.3' },
          { suppress: true, content: '6.11.2' },
          { suppress: true, content: '6.11.1' },
          { suppress: true, content: '6.11.0' },
          { suppress: true, content: '6.10.3' },
          { suppress: true, content: '6.10.2' },
          { suppress: true, content: '6.10.1' },
          { suppress: true, content: '6.10.0' },
          { suppress: true, content: '6.9.5' },
          { suppress: true, content: '6.9.4' },
          { suppress: true, content: '6.9.3' },
          { suppress: true, content: '6.9.2' },
          { suppress: true, content: '6.9.1' },
          { suppress: true, content: '6.9.0' },
          { suppress: true, content: '6.8.1' },
          { suppress: true, content: '6.8.0' },
          { suppress: true, content: '6.7.0' },
          { suppress: true, content: '6.6.0' },
          { suppress: true, content: '6.5.0' },
          { suppress: true, content: '6.4.0' },
          { suppress: true, content: '6.3.1' },
          { suppress: true, content: '6.3.0' },
          { suppress: true, content: '6.2.2' },
          { suppress: true, content: '6.2.1' },
          { suppress: true, content: '6.2.0' },
          { suppress: true, content: '6.1.0' },
          { suppress: true, content: '6.0.0' },
          { suppress: false, content: '5.x' },
          { suppress: true, content: '5.12.0' },
          { suppress: true, content: '5.11.1' },
          { suppress: true, content: '5.11.0' },
          { suppress: true, content: '5.10.1' },
          { suppress: true, content: '5.10.0' },
          { suppress: true, content: '5.9.1' },
          { suppress: true, content: '5.9.0' },
          { suppress: true, content: '5.8.0' },
          { suppress: true, content: '5.7.1' },
          { suppress: true, content: '5.7.0' },
          { suppress: true, content: '5.6.0' },
          { suppress: true, content: '5.5.0' },
          { suppress: true, content: '5.4.1' },
          { suppress: true, content: '5.4.0' },
          { suppress: true, content: '5.3.0' },
          { suppress: true, content: '5.2.0' },
          { suppress: true, content: '5.1.1' },
          { suppress: true, content: '5.1.0' },
          { suppress: true, content: '5.0.0' },
          { suppress: false, content: '4.x' },
          { suppress: true, content: '4.8.4' },
          { suppress: true, content: '4.8.3' },
          { suppress: true, content: '4.8.2' },
          { suppress: true, content: '4.8.1' },
          { suppress: true, content: '4.8.0' },
          { suppress: true, content: '4.7.3' },
          { suppress: true, content: '4.7.2' },
          { suppress: true, content: '4.7.1' },
          { suppress: true, content: '4.7.0' },
          { suppress: true, content: '4.6.2' },
          { suppress: true, content: '4.6.1' },
          { suppress: true, content: '4.6.0' },
          { suppress: true, content: '4.5.0' },
          { suppress: true, content: '4.4.7' },
          { suppress: true, content: '4.4.6' },
          { suppress: true, content: '4.4.5' },
          { suppress: true, content: '4.4.4' },
          { suppress: true, content: '4.4.3' },
          { suppress: true, content: '4.4.2' },
          { suppress: true, content: '4.4.1' },
          { suppress: true, content: '4.4.0' },
          { suppress: true, content: '4.3.2' },
          { suppress: true, content: '4.3.1' },
          { suppress: true, content: '4.3.0' },
          { suppress: true, content: '4.2.6' },
          { suppress: true, content: '4.2.5' },
          { suppress: true, content: '4.2.4' },
          { suppress: true, content: '4.2.3' },
          { suppress: true, content: '4.2.2' },
          { suppress: true, content: '4.2.1' },
          { suppress: true, content: '4.2.0' },
          { suppress: true, content: '4.1.2' },
          { suppress: true, content: '4.1.1' },
          { suppress: true, content: '4.1.0' },
          { suppress: true, content: '4.0.0' }
        ]}
      />

      {styles}
    </Layout>
  );
};
