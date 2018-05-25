// This file merely configures the store for hot reloading.
// With Redux, the actual stores are in /reducers.

import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from './../utils/promise-middleware';

export const history = createHistory();

const logger = createLogger();
const router = routerMiddleware(history);

const enhancer = compose(
  applyMiddleware(thunk, promiseMiddleware(), logger, router),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
