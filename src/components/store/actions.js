import superagent from 'superagent';

export const PoL = payload => dispatch => {
  dispatch(runPoL({messsage: 'Hello World'}))
}

const PoL = payload => { 
  return {
    type: 'PoL', 
    payload: payload
  }
}