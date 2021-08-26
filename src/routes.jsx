import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {getTokenInStorage, decodeToken} from 'services/api'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Kanban from './pages/Kanban'
import Task from './pages/Task'
import Profile from './pages/Profile'
import TaskList from './pages/TaskList'
import UserList from './pages/UserList'
import CategoriesList from './pages/CategoriesList'
import DefaultLayout from './templates/default'

const AdminRoutes = ({ component: Component, auth,  ...attrs }) => {

  const token = getTokenInStorage();
  const permission = decodeToken(token).permission === auth;

  return token && permission ? (
    <Route
      {...attrs}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  ) : (
    <Redirect to="/404" />
  )
}

const PrivateRoute = ({ component: Component, auth,  ...attrs }) => {

  const token = getTokenInStorage();

  return token ? (
    <Route
      {...attrs}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
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
      <AdminRoutes path="/users" auth="ROLE_ADMIN" component={UserList} />
      <AdminRoutes path="/users/new" auth="ROLE_ADMIN" component={Task} />
      <PrivateRoute path="/users/edit/:id" component={Task} />
      <PrivateRoute path="/tasks/new" component={Task} />
      <PrivateRoute path="/tasks/edit/:id" component={Task} />
      <PrivateRoute path="/profile/edit" component={Profile} />
      <PrivateRoute path="/tasks" component={TaskList} />
      <Route path="*" component={() => <h1> 404 </h1>} />
    </Switch>
  );
}

export default Routes;