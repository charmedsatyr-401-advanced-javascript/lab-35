import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import reporter from './reporter.js';

import history from '../reducers/history-reducers';

const reducers = combineReducers({
  history,
});

const store = () => createStore(reducers, composeWithDevTools(applyMiddleware(thunk, reporter)));

export default store;
