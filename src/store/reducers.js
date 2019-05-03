let initialState = [];

export default (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'PoL':
      console.log(payload);
      return state;
    default:
      return state;
  }
};
