import React from 'react';
import {Route, Switch} from 'react-router-dom';
import GalleryContainer from './containers/GalleryContainer';
import LoginContainer from './containers/LoginContainer';

export default () =>
  <Switch>
    <Route path="/" exact component={
      localStorage.getItem("KEY_EVENT_ID") === null ? LoginContainer
                                                         : GalleryContainer
    } />
    <Route path="/:eventId" exact component={GalleryContainer} />
  </Switch>;