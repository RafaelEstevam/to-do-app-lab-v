import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'

function Routes() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="*" component={() => <h1> 404 </h1>} />
      </Switch>
    );
  }
  
  export default Routes;