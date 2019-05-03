export const pol = payload => dispatch => dispatch(polSync(payload));

const polSync = payload => {
  return {
    type: 'PoL',
    payload,
  };
};
