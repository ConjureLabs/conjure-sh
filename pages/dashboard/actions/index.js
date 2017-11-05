const setOrg = (store, { org }) => {
  return Object.assign({}, store, {
    timeline: null, // clearing timeline, which will cause loader and xhr
    org
  });
};

const clearTimeline = store => {
  return Object.assign({}, store, {
    timeline: null
  });
};

const pushTimeline = (store, { addition, pagingHref }) => {
  const timeline = (store.timeline || []).slice();
  timeline.push(...addition);

  return Object.assign({}, store, {
    timeline,
    pagingHref
  });
};

const unshiftTimeline = (store, { addition }) => {
  const timeline = store.timeline.slice();
  timeline.unshift(...addition);

  return Object.assign({}, store, {
    timeline
  });
};

const setTimelineDelta = (store, { delta }) => {
  return Object.assign({}, store, {
    timelineDelta: +delta
  });
};

const clearTimelineDelta = store => {
  return Object.assign({}, store, {
    timelineDelta: null
  });
};

export default {
  setOrg,
  clearTimeline,
  pushTimeline,
  unshiftTimeline,
  setTimelineDelta,
  clearTimelineDelta
};
