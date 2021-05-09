import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../../views/home/Home';
import Users from '../../../views/users/Users';

const MainContent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
    </Switch>
  );
};

export default MainContent;