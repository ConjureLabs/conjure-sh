import { Component } from 'react';
import classnames from 'classnames';
import styles, { classes } from './card-ui-styles.js';
import { del } from '../../../shared/xhr';
import config from '../../../shared/config.js';

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
    const { card } = this.props;

    if (this.state.promptConfirm === false) {
      actions.push((
        <a
          key={`action-${card.id}-delete`}
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
          key={`action-${card.id}-confirm-delete`}
          href=''
          className={classes.confirm}
          onClick={e => {
            e.preventDefault();
            this.setState({
              deleting: true,
              promptConfirm: false
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
          key={`action-${card.id}-cancel-delete`}
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

  deleteCard() {
    const { card } = this.props;

    del(`${config.app.api.url}/api/account/card/${card.id}`, null, err => {
      if (err) {
        console.error(err);
        alert(err.message);
        this.setState({
          deleting: false
        });
        return;
      }

      // todo: update the store value, force main view to update...
      console.log('okay');
    });
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
