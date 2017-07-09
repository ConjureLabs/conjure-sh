import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import AnchorMultiList from '../../../components/AnchorList/MultiSelect';

export default class OnboardRepos extends Component {
  constructor() {
    super();

    this.anchorList; // set by ref

    this.state = {
      repoSelected: false
    };
  }

  isRepoSelected() {
    const listSelected = this.anchorList.selected;
    console.log(listSelected);
    this.setState({
      repoSelected: listSelected.length > 0
    });
  }

  submit() {

  }

  render() {
    const { query } = this.props.url;

    const initialState = {
      account: query.account
    };

    // repos are listed by org top-level key
    const orgs = Object.keys(query.repos);
    const repos = [];
    for (let i = 0; i < orgs.length; i++) {
      const org = orgs[i];

      if (org !== query.org.label) {
        continue;
      }

      for (let j = 0; j < query.repos[org].length; j++) {
        const repo = query.repos[org][j];

        repos.push({
          label: repo.name,
          value: repo.id,
          key: repo.id
        });
      }
    }

    return (
      <ReStore store={initialState}>
        <Header />

        <div className={classes.wrap}>
          <header>
            <sup>🎟</sup>
            <span>Almost there!</span>
          </header>

          <article>
            <sup>3</sup>
            <span>What repos should Conjure bring to life?</span>
          </article>

          <main>
            <div className={classes.listOuterWrap}>
              <span className={classes.listWrap}>
                <AnchorMultiList
                  list={repos}
                  className={classes.anchorList}
                  onSelect={this.isRepoSelected.bind(this)}
                  ref={ref => this.anchorList = ref}
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

          {styles}
        </div>
      </ReStore>
    );
  }
}
