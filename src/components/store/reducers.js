let initialState = [];

export default (state = initialState, action) => {
  let { type, payload = {} } = action ;

  
  switch (type) {
    case 'PoL':
      return[...state, payload];
    default:
      return state;  
  }
}