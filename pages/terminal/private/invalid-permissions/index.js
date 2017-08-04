import styles, { classes } from './styles.js';
import EmptyState from '../../../components/EmptyState';

export default () => {
  return (
    <div className={classes.wrap}>
      <EmptyState
        className={classes.emptyState}
        emoji='🔓'
        headerText='You do not have the correct permissions for this instance'
        bodyText='Contact the org/repo owner to request access'
      />

      {styles}
    </div>
  );
};
