import styles, { classes } from './styles.js';
import EmptyState from '../../../components/EmptyState';

export default () => {
  return (
    <div className={classes.wrap}>
      <EmptyState
        className={classes.emptyState}
        emoji='🔓'
        headerText='This container is private'
        bodyText='You must log into Conjure to view this content'
      />

      {styles}
    </div>
  );
};
