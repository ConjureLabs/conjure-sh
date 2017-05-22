export const selectTreePlacement = (level, value) => {
  return {
    type: 'SET_TREE',
    [level]: value
  };
};
