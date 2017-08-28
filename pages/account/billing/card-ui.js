import { Component } from 'react';
import classnames from 'classnames';
import styles, { classes } from './card-ui-styles.js';

import CreditCardSummary from '../../../components/CreditCardSummary';

export default class AccountBilling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleting: false,
      promptConfirm: false
    };
  }

  getActions() {
    if (this.state.deleting === true) {
      return null;
    }

    const actions = [];

    if (this.state.promptConfirm === false) {
      actions.push((
        <a
          href=''
          className={classes.delete}
          onClick={e => {
            e.preventDefault();
            this.setState({
              promptConfirm: true
            });
          }}
        >
          Delete Card
        </a>
      ));
    } else {
      actions.push((
        <a
          href=''
          className={classes.confirm}
          onClick={e => {
            e.preventDefault();
            this.setState({
              deleting: true
            }, () => {
              this.deleteCard();
            });
          }}
        >
          Confirm
        </a>
      ));

      actions.push((
        <a
          href=''
          className={classes.cancel}
          onClick={e => {
            e.preventDefault();
            this.setState({
              promptConfirm: false
            });
          }}
        >
          Cancel
        </a>
      ));
    }

    return (
      <span className={classes.actions}>
        {actions}
      </span>
    );
  }

  render() {
    const { card, className } = this.props;

    return (
      <div className={classnames(classes.root, className)}>
        {this.getActions()}

        <CreditCardSummary
          {...card}
        />

        {styles}
      </div>
    );
  }
}
