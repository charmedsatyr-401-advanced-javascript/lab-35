import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import reporter from './reporter.js'

import recordsReducer from './reducers.js';

let reducers = combineReducers({
  records: 'records'
  /* this is where we will place all of the different reducers  */
});

const store = () => 
  createStore (reducers, composeWithDevTools(applyMiddleware(thunk, reporter)));
export default store;