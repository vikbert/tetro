import React from 'react';
import {Route, Switch} from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TimerPage from './containers/TimerPage'

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={TimerPage}/>
      <Route path={routes.HOME} component={HomePage}/>
    </Switch>
  </App>
);
