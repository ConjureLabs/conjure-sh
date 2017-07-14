import { Component } from 'react';
import styles, { classes } from './styles.js';
import { ReStore, connect } from '../../../../shared/ReStore';

import Loader from '../../../../components/Loader';

const Timeline = ({ timeline }) => {
  return (
      <Loader />
    );
  
  if (!Array.isArray(timeline)) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      {
        timeline.map(item => {
          return (
            <ol>
              <li>{item.status}</li>
              <li>{item.branch}</li>
              <li>{item.start}</li>
            </ol>
          );
        })
      }
    </div>
  );
};

const selector = store => {
  return {
    timeline: store.timeline
  };
};

export default connect(selector)(Timeline);
