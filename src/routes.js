import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './containers/App/App';
import HomePage from './containers/HomePage/HomePage';
import ConnectedUsersPage from './containers/UsersPage/UsersPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

export default (
  <div>
    <Route component={App} />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="users" component={ConnectedUsersPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </div>
);
