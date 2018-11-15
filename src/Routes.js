import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GalleryContainer from './containers/GalleryContainer';
import AdminContainer from './containers/AdminContainer';

export default () =>
  <Switch>
    <Route path="/" exact component={GalleryContainer} />
    <Route path="/admin" exact component={AdminContainer} />
  </Switch>;