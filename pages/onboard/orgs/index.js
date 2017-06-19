import { Component } from 'react';

export default class OnboardOrgs extends Component {
  render() {
    return (
      <div>
        <header>
          <sup id='xyz'>👋</sup>
          <span>Welcome to Conjure! Let's get started.</span>
        </header>

        <article>
          <sub>1</sub>
          <span>Select the GitHub org You'd like to use with Conjure.</span>
        </article>

        <main>
          asdf
        </main>

        <style jsx>{`
          #xyz {
            font-size: 6rem;
          }
        `}</style>
      </div>
    );
  }
}
