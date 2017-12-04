import { Component } from 'react';
import styles, { classes } from './styles.js';
import { post } from '../../../shared/xhr';
import config from '../../../shared/config.js';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import AnchorList from '../../../components/AnchorList';

let submitting = false;

export default class WatchRepos extends Component {
  constructor() {
    super();

    this.anchorList = null; // set by ref

    this.state = {
      repoSelected: false
    };
  }

  isRepoSelected() {
    const listSelected = this.anchorList.selected;
    this.setState({
      repoSelected: listSelected.length > 0
    });
  }

  submit() {
    if (submitting) {
      return;
    }

    submitting = true;

    post(`${config.app.api.url}/api/watch`, this.anchorList.selected.map(selection => selection.value), err => {
      if (err) {
        console.error(err);
        alert(err.message);
        submitting = false;
        return;
      }

      window.location = '/';
    });
  }

  render() {
    const { url } = this.props;
    const { query } = url;
    const { repos, watchedRepos } = query;

    const listedRepos = repos.filter(repo => !watchedRepos.includes(repo.name));

    return (
      <Layout
        url={url}
        limitedHeader={true}
        title='Add Repos'
      >
        <div className={classes.content}>
          <header>
            <sup>🎟</sup>
            <span>Select the GitHub repos you'd like to use with Conjure</span>
          </header>

          <main>
            <div className={classes.listOuterWrap}>
              <span className={classes.listWrap}>
                <AnchorList
                  list={listedRepos.map(repo => {
                    return {
                      label: repo.name,
                      value: repo.id,
                      key: repo.id
                    };
                  })}
                  onSelect={this.isRepoSelected.bind(this)}
                  className={classes.anchorList}
                />

                <Button
                  size='medium'
                  color='blue'
                  onClick={this.submit.bind(this)}
                  className={classes.button}
                  disabled={!this.state.repoSelected}
                >
                  Continue
                </Button>
              </span>
            </div>
          </main>
        </div>

        {styles}
      </Layout>
    );
  }
}
