import styles, { classes } from './styles.js';

import EmptyState from '../../../../components/EmptyState';
import Button from '../../../../components/Button';

export default () => {
  return (
    <div className={classes.wrap}>
      <EmptyState
        className={classes.emptyState}
        emoji='🔒'
        headerText='This container is private'
        bodyText='You must sign into Conjure to view this content'
      />

      <div className={classes.actionWrap}>
        <Button
          color='purple'
          size='medium'
          onClick={() => {}}
        >
          Sign In
        </Button>
      </div>

      {styles}
    </div>
  );
};
