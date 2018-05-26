import styles, { classes } from './styles.js'

import Page from 'components/Page'
import EmptyState from 'components/EmptyState'

export default class InvalidPermissions extends Page {
  render() {
    return (
      <this.Layout
        title='Invalid Permissions'
        wrappedHeader={false}
      >
        <EmptyState
          className={classes.emptyState}
          emoji='🔒'
          headerText='You do not have the correct permissions for this instance'
          bodyText='Contact the org/repo owner to request access'
        />

        {styles}
      </this.Layout>
    )
  }
)
