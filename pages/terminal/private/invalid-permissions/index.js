import styles, { classes } from './styles.js';
import Federal from 'federal';

import EmptyState from '../../../../components/EmptyState';
import Header from '../../../../components/Header';

export default ({ query }) => {
  const initialState = {
    account: query.account
  };

  return (
    <Federal store={initialState}>
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
    </Federal>
  );
};
