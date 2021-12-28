import React, { ReactElement, ReactNode, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserContext } from './components/global/context/UserProvider';

interface IPrivateRoute extends RouteProps{
  children: ReactElement,
}

function PrivateRoute(
  { children, ...rest }:IPrivateRoute,
): ReactElement {
  const user = useContext(UserContext);
  alert(user);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => (user.name ? children : <Redirect to="/login" />)}
    />
  );
}

export default PrivateRoute;
