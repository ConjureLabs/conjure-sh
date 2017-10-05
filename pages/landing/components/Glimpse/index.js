import { Component } from 'react';
import styles, { classes } from './styles.js';
import classnames from 'classnames';

export default class Glimpse extends Component {
  constructor(props) {
    super(props);

    this.conjureContent = null; // component ref, set via render

    this.state = {
      inViewport: false // once true, will not be set back
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.checkIfInViewport.bind(this));
    }
  }

  checkIfInViewport() {
    if (!this.conjureContent) {
      return;
    }

    const rect = this.conjureContent.getBoundingClientRect();
    const html = document.documentElement;

    console.log('yes?', rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth));

    if (
      !(
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth)
      )
    ) {
      return;
    }

    window.removeEventListener('scroll', this.checkIfInViewport);

    this.setState({
      inViewport: true
    });
  }

  render() {
    const { inViewport } = this.state;

    return (
      <div
        className={classes.root}
        ref={ref => this.conjureContent = ref}
      >
        <div className={classes.toolbar}>
          <ins />
          <ins />
          <ins />
        </div>

        <div className={classes.content}>
          <span className={classes.title}>New Sidebar</span>
          <ins>Open</ins>

          <span className={classes.commentWrap}>
            <span className={classes.author} />

            <span className={classes.comment}>
              <div className={classes.header}>
                <span className={classes.handle}>tmarshall</span>

                commented one minute ago
              </div>

              <span className={classes.body}>Updated the sidebar so that it's easier for users to get to settings</span>
            </span>
          </span>

          <ol className={classes.timeline}>
            <li>
              <span className={classes.author} />
              <span className={classes.commit}>added new dropdown</span>
            </li>
            <li>
              <span className={classes.author} />
              <span className={classes.commit}>styled sidebar changes</span>
            </li>
            <li>
              <span className={classes.author} />
              <span className={classes.commit}>tweaks from design</span>
            </li>
            <li>
              <span className={classes.author} />
              <span className={classes.commit}>changed some label text</span>
            </li>
          </ol>

          <span className={classes.commentWrap}>
            <span
              className={classnames(classes.comment, classes.fromConjure, {
                [classes.inViewport]: inViewport
              })}
            >
              <div className={classes.header}>
                <span className={classes.handle}>Conjure</span>

                commented just now
              </div>

              <span className={classes.body}>
                <span className={classes.simulateLink}>You can view this branch on Conjure</span>
              </span>
            </span>
          </span>
        </div>

        {styles}
      </div>
    );
  }
};
