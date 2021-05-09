import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../../views/home/Home';
import Users from '../../../views/users/Users';
import UserPostsAlbums from '../../../views/userPostsAlbums/UserPostsAlbums';

const MainContent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/users/:id" component={UserPostsAlbums} />
    </Switch>
  );
};

export default MainContent;