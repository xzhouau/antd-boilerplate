import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import promiseMiddleware from './../utils/promise-middleware';

export const history = createHistory();
const router = routerMiddleware(history);

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, promiseMiddleware(), router)
  );
}
