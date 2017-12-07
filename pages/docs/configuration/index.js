import Layout from '../../../components/Layout';

import styles, { classes } from './styles.js';

import nodeVersions from './language-versions/node';
import rubyVersions from './language-versions/ruby';
import pythonVersions from './language-versions/python';
import phpVersions from './language-versions/php';
import javaVersions from './language-versions/java';

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
        <pre>{`languages:
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

      <div className={classes.columns}>
        <article className={classes.column}>
          <a href='#languages-node'>
            <h4 id='languages-node'>Node</h4>
          </a>
          <ExpandableList
            className={classes.list}
            items={nodeVersions}
          />
        </article>

        <article className={classes.column}>
          <a href='#languages-ruby'>
            <h4 id='languages-ruby'>Ruby</h4>
          </a>
          <ExpandableList
            className={classes.list}
            items={rubyVersions}
          />
        </article>

        <article className={classes.column}>
          <a href='#languages-python'>
            <h4 id='languages-python'>Python</h4>
          </a>
          <ExpandableList
            className={classes.list}
            items={pythonVersions}
          />
        </article>
      </div>

      <div className={classes.columns}>
        <article className={classes.column}>
          <a href='#languages-php'>
            <h4 id='languages-php'>PHP</h4>
          </a>
          <ExpandableList
            className={classes.list}
            items={phpVersions}
          />
        </article>

        <article className={classes.column}>
          <a href='#languages-java'>
            <h4 id='languages-java'>Java</h4>
          </a>
          <ExpandableList
            className={classes.list}
            items={javaVersions}
          />
        </article>
      </div>

      <p>You can specify any specific language in your <span className={classes.code}>config.yml</span>.</p>

      <div className={classes.codeBlock}>
        <pre>{`languages:
  python:
    version: 3.7.0a1`}</pre>
      </div>

      <hr/>

      <a href='#env-vars'>
        <h3 id='env-vars'>Environment Variables</h3>
      </a>

      <p>You can add any environment variables (api keys, etc) by adding <span className={classes.code}>environment</span> attributes to the <span className={classes.code}>config.yml</span>.</p>

      <div className={classes.codeBlock}>
        <pre>{`environment:
  THIRD_PARTY_KEY: dAwyY3Qxt7YNYczA2WSOTtUt
  NODE_ENV: test`}</pre>
      </div>

      {styles}
    </Layout>
  );
};
