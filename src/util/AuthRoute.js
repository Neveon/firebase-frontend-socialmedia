import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// When app loads, if user is authenticated then redirect to homepage
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);

export default AuthRoute;
