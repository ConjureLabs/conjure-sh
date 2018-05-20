import styles, { classes } from './styles.js'

import Layout from '../../../../components/Layout'
import EmptyState from '../../../../components/EmptyState'

export default ({ url }) => (
  <Layout
    url={url}
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
  </Layout>
)
