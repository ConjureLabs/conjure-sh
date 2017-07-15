import { Component } from 'react';
import styles, { classes } from './styles.js';
import { ReStore, connect } from '../../../../shared/ReStore';
import classnames from 'classnames';

import Loader from '../../../../components/Loader';

// in seconds
const minute = 60;
const hour = 60 * minute;
const day = 24 * hour;

const Timeline = ({ timeline }) => {
  if (!Array.isArray(timeline)) {
    return (
      <div className={classes.loader}>
        <Loader />

        <span className={classes.text}>hang tight</span>

        {styles}
      </div>
    );
  }

  return (
    <div className={classes.wrap}>
      {
        timeline.map(item => {
          const statusKey = item.status.replace(/\s/g, '').toLowerCase();

          let ms;
          let duration;

          switch (item.status) {
            case 'Spinning Up':
            case 'Running':
              ms = new Date() - new Date(item.start);
              break;

            case 'Spun Down':
              ms = new Date(item.stop) - new Date(item.start);
              break;
          }

          if (typeof ms === 'number') {
            let remainingSeconds = Math.ceil(ms / 1000);
            let durationDays = Math.floor(remainingSeconds / day);
            remainingSeconds %= day;
            let durationHours = Math.floor(remainingSeconds / hour);
            remainingSeconds %= hour;
            let durationMinutes = Math.floor(remainingSeconds / minute);
            let durationSeconds = remainingSeconds % minute;

            if (durationDays === durationHours === durationMinutes === 0) {
              duration = `${durationSeconds} second${durationSeconds === 1 ? '' : 's'}`;
            } else if (durationDays === durationHours === 0) {
              duration = minute / 2 < durationSeconds ? `${durationMinutes + 1} minutes` : `${durationMinutes} minute${durationMinutes === 1 ? '' : 's'}`;
            } else if (durationDays === 0) {
              duration = hour / 2 < (durationMinutes * minute) ? `${durationHours + 1} hours` : `${durationHours} hour${durationHours === 1 ? '' : 's'}`;
            } else {
              duration = day / 2 < (durationHours * hour) ? `${durationDays + 1} days` : `${durationDays} day${durationDays === 1 ? '' : 's'}`;
            }

            if (item.status === 'Spun Down') {
              duration = `Ran ${duration}`;
            } else {
              duration = `Up for ${duration}`;
            }
          }

          return (
            <ol key={item.id}>
              <li className={classnames(classes.status, classes[statusKey])}>
                <sup />
                {item.status}
              </li>

              <li className={classnames({
                [classes.repo]: true,
                [classes.privateRepo]: item.repo_private === true
              })}>
                <sup className={classes.svgIcon} />
                {item.repo}
              </li>

              <li className={classes.branch}>
                <sup className={classes.svgIcon} />
                {item.branch}
              </li>

              <li className={classes.duration}>
                {duration}
              </li>
            </ol>
          );
        })
      }

      {styles}
    </div>
  );
};

const selector = store => {
  return {
    timeline: store.timeline
  };
};

export default connect(selector)(Timeline);
