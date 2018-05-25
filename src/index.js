/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import routes from './routes';
import configureStore, { history } from './store/configureStore';

// load favicon.ico
require('./favicon.ico');

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history} children={routes} />
  </Provider>,
  document.getElementById('app')
);
