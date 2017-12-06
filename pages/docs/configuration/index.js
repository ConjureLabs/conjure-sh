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

      <hr />

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

      <a href='#languages-ruby'>
        <h3 id='languages-ruby'>Ruby</h3>
      </a>

      <ExpandableList
        className={classes.list}
        items={[
          { suppress: false, content: '2.4.2' },
          { suppress: true, content: '2.4.1' },
          { suppress: true, content: '2.4.0' },
          { suppress: true, content: '2.4.0-rc1' },
          { suppress: true, content: '2.4.0-preview3' },
          { suppress: true, content: '2.4.0-preview2' },
          { suppress: true, content: '2.4.0-preview1' },
          { suppress: false, content: '2.3.5' },
          { suppress: true, content: '2.3.4' },
          { suppress: true, content: '2.3.3' },
          { suppress: true, content: '2.3.2' },
          { suppress: true, content: '2.3.1' },
          { suppress: true, content: '2.3.0' },
          { suppress: true, content: '2.3.0-preview2' },
          { suppress: true, content: '2.3.0-preview1' },
          { suppress: false, content: '2.2.8' },
          { suppress: true, content: '2.2.7' },
          { suppress: true, content: '2.2.6' },
          { suppress: true, content: '2.2.5' },
          { suppress: true, content: '2.2.4' },
          { suppress: true, content: '2.2.3' },
          { suppress: true, content: '2.2.2' },
          { suppress: true, content: '2.2.1' },
          { suppress: true, content: '2.2.0' },
          { suppress: true, content: '2.2.0-rc1' },
          { suppress: true, content: '2.2.0-preview2' },
          { suppress: true, content: '2.2.0-preview1' },
          { suppress: false, content: '2.1.10' },
          { suppress: true, content: '2.1.9' },
          { suppress: true, content: '2.1.8' },
          { suppress: true, content: '2.1.7' },
          { suppress: true, content: '2.1.6' },
          { suppress: true, content: '2.1.5' },
          { suppress: true, content: '2.1.4' },
          { suppress: true, content: '2.1.3' },
          { suppress: true, content: '2.1.2' },
          { suppress: true, content: '2.1.1' },
          { suppress: true, content: '2.1.0' },
          { suppress: true, content: '2.1.0-rc1' },
          { suppress: true, content: '2.1.0-preview2' },
          { suppress: true, content: '2.1.0-preview1' },
          { suppress: false, content: '2.0.0' },
          { suppress: true, content: '2.0.0-rc2' },
          { suppress: true, content: '2.0.0-p648' },
          { suppress: true, content: '2.0.0-p647' },
          { suppress: true, content: '2.0.0-p645' },
          { suppress: true, content: '2.0.0-p643' },
          { suppress: true, content: '2.0.0-p598' },
          { suppress: true, content: '2.0.0-p594' },
          { suppress: true, content: '2.0.0-p576' },
          { suppress: true, content: '2.0.0-p481' },
          { suppress: true, content: '2.0.0-p451' },
          { suppress: true, content: '2.0.0-p353' },
          { suppress: true, content: '2.0.0-p247' },
          { suppress: true, content: '2.0.0-p194' },
          { suppress: false, content: '1.9.3' },
          { suppress: true, content: '1.9.3-rc1' },
          { suppress: true, content: '1.9.3-preview1' },
          { suppress: true, content: '1.9.3-p551' },
          { suppress: true, content: '1.9.3-p550' },
          { suppress: true, content: '1.9.3-p547' },
          { suppress: true, content: '1.9.3-p545' },
          { suppress: true, content: '1.9.3-p484' },
          { suppress: true, content: '1.9.3-p448' },
          { suppress: true, content: '1.9.3-p429' },
          { suppress: true, content: '1.9.3-p392' },
          { suppress: true, content: '1.9.3-p385' },
          { suppress: true, content: '1.9.3-p374' },
          { suppress: true, content: '1.9.3-p362' },
          { suppress: true, content: '1.9.3-p327' },
          { suppress: true, content: '1.9.3-p286' },
          { suppress: true, content: '1.9.3-p125' },
          { suppress: false, content: '1.9.2' },
          { suppress: true, content: '1.9.2-rc2' },
          { suppress: true, content: '1.9.2-rc1' },
          { suppress: true, content: '1.9.2-preview1' },
          { suppress: true, content: '1.9.2-p330' },
          { suppress: true, content: '1.9.2-p320' },
          { suppress: true, content: '1.9.2-p290' },
          { suppress: true, content: '1.9.2-p136' },
          { suppress: false, content: '1.9.1' },
          { suppress: true, content: '1.9.1-preview1' },
          { suppress: true, content: '1.9.1-p430' },
          { suppress: true, content: '1.9.1-p429' },
          { suppress: true, content: '1.9.1-p376' },
          { suppress: true, content: '1.9.1-p243' },
          { suppress: true, content: '1.9.1-p129' },
          { suppress: false, content: '1.9.0' },
          { suppress: true, content: '1.8.7' },
          { suppress: true, content: '1.8.7-p374' },
          { suppress: true, content: '1.8.7-p370' },
          { suppress: true, content: '1.8.7-p352' },
          { suppress: true, content: '1.8.7-p330' },
          { suppress: true, content: '1.8.7-p302' },
          { suppress: true, content: '1.8.7-p299' },
          { suppress: true, content: '1.8.7-p248' },
          { suppress: true, content: '1.8.7-p160' },
          { suppress: true, content: '1.8.7-p72' },
          { suppress: true, content: '1.8.6' },
          { suppress: true, content: '1.8.6-p368' },
          { suppress: true, content: '1.8.6-p287' },
          { suppress: true, content: '1.8.5' },
          { suppress: true, content: '1.8.4' },
          { suppress: true, content: '1.8.4-preview2' },
          { suppress: true, content: '1.8.3' },
          { suppress: true, content: '1.8.2' },
          { suppress: true, content: '1.8.2-preview4' },
          { suppress: true, content: '1.8.2-preview3' },
          { suppress: true, content: '1.8.2-preview2' },
          { suppress: true, content: '1.8.2-preview1' },
          { suppress: true, content: '1.8.0' },
          { suppress: true, content: '1.6.7' }
        ]}
      />

      {styles}
    </Layout>
  );
};
