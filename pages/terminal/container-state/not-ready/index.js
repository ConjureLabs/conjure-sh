import styles, { classes } from './styles.js'

import Page from 'components/Page'
import EmptyState from 'components/EmptyState'

export default class NotReady extends Page {
  render() {
    return (
      <this.Layout
        title='Not Available'
        wrappedHeader={false}
      >
        <EmptyState
          className={classes.emptyState}
          emoji='😵'
          headerText='The Pull Request specified is not in a ready state for Conjure'
          bodyText='Check that the PR is open and that the Conjure bot has commented on it'
        />

        {styles}
      </this.Layout>
    )
  }
)
