import styles, { classes } from './styles.js';

import Layout from '../../../../components/Layout';
import EmptyState from '../../../../components/EmptyState';

export default ({ url }) => (
  <Layout
    url={url}
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
  </Layout>
);
