import styles, { classes } from './styles.js';
import { ReStore } from '../../../../shared/ReStore';

import EmptyState from '../../../components/EmptyState';
import Header from '../../../components/Header';

export default ({ query }) => {
  const initialState = {
    account: query.account
  };

  return (
    <ReStore store={initialState}>
      <Header />

      <div className={classes.wrap}>
        <EmptyState
          className={classes.emptyState}
          emoji='🔒'
          headerText='You do not have the correct permissions for this instance'
          bodyText='Contact the org/repo owner to request access'
        />
      </div>

      {styles}
    </ReStore>
  );
};
