const clearTimeline = store => {
  return Object.assign({}, store, {
    timeline: null
  });
};

const pushTimeline = (store, { addition }) => {
  const timeline = (store.timeline || []).slice();
  timeline.push(...addition);

  return Object.assign({}, store, {
    timeline
  });
};

const unshiftTimeline = (store, { addition }) => {
  const timeline = store.timeline.slice();
  timeline.unshift(...addition);

  return Object.assign({}, store, {
    timeline
  });
};

export default {
  clearTimeline,
  pushTimeline,
  unshiftTimeline
};
