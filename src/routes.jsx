import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {getTokenInStorage} from 'services/api'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Kanban from './pages/Kanban'
import Task from './pages/Task'
import TaskList from './pages/TaskList'
import CategoriesList from './pages/CategoriesList'
import DefaultLayout from './templates/default'

const PrivateRoute = ({ component: Component, ...attrs }) => {

  const token = getTokenInStorage();

  return token ? (
    <Route
      {...attrs}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    >
    </Route>
  ) : (
    <Redirect to="/404" />
  )
}

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/kanban" component={Kanban} />
      <PrivateRoute path="/categories" component={CategoriesList} />
      <PrivateRoute path="/tasks/new" component={Task} />
      <PrivateRoute path="/tasks/edit/:id" component={Task} />
      <PrivateRoute path="/tasks" component={TaskList} />
      <Route path="*" component={() => <h1> 404 </h1>} />
    </Switch>
  );
}

export default Routes;