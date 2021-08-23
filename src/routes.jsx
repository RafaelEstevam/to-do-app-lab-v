import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import TaskList from './pages/TaskList'
import DefaultLayout from './templates/default'

const PrivateRoute = ({ component: Component, ...attrs }) => {
  return (
    <Route
      {...attrs}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    >
    </Route>
  )
}

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/tasks" component={TaskList} />
      <Route path="*" component={() => <h1> 404 </h1>} />
    </Switch>
  );
}

export default Routes;