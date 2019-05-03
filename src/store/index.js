import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import reporter from './reporter.js';

import history from '../reducers/history-reducers';
import formData from '../reducers/form-reducers';

const reducers = combineReducers({
  history,
  formData,
});

const store = () => createStore(reducers, composeWithDevTools(applyMiddleware(thunk, reporter)));

export default store;
