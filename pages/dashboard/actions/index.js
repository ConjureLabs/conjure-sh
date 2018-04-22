const clearTimeline = store => {
  return {
    ...store,
    timeline: null
  }
}

const pushTimeline = (store, { addition, pagingHref }) => {
  const timeline = (store.timeline || []).slice()
  timeline.push(...addition)

  return {
    ...store,
    timeline,
    pagingHref
  }
}

const unshiftTimeline = (store, { addition }) => {
  const timeline = store.timeline.slice()
  timeline.unshift(...addition)

  return {
    ...store,
    timeline
  }
}

const setTimelineDelta = (store, { delta }) => {
  return {
    ...store,
    timelineDelta: +delta
  }
}

const clearTimelineDelta = store => {
  return {
    ...store,
    timelineDelta: null
  }
}

export default {
  clearTimeline,
  pushTimeline,
  unshiftTimeline,
  setTimelineDelta,
  clearTimelineDelta
}
