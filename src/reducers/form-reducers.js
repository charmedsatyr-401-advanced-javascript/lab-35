const initialState = {
  url: '',
  method: 'get',
  requestBody: '',
  username: '',
  password: '',
  token: '',
  header: {},
  body: {},
  headersVisible: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log(`TYPE: ${type}, PAYLOAD: ${payload}`);

  switch (type) {
    case 'UPDATE-FORM-DATA':
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
