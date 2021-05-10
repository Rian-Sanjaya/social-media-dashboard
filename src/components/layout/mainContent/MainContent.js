import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../../views/home/Home';
import Users from '../../../views/users/Users';
import UserPostsAlbums from '../../../views/userPostsAlbums/UserPostsAlbums';
import UserAlbum from '../../../views/userAlbum/UserAlbum';
import PostDetail from '../../../views/postDetail/PostDetail';

const MainContent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/users/:id" component={UserPostsAlbums} />
      <Route exact path="/users/:id/album/:albumId" component={UserAlbum} />
      <Route exact path="/post/:id" component={PostDetail} />
    </Switch>
  );
};

export default MainContent;