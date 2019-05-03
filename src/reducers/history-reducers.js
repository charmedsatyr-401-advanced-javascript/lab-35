let initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log(`TYPE: ${type}, PAYLOAD: ${payload}`);

  switch (type) {
    case 'SET-HISTORY':
      return Object.assign({}, payload.history);
    default:
      return state;
  }
};
