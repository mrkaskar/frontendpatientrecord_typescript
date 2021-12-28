import React, { ReactElement, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserContext } from './components/global/context/UserProvider';

interface IPrivateRoute extends RouteProps{
  children: ReactElement,
}

function PrivateRoute(
  { children, ...rest }:IPrivateRoute,
): ReactElement {
  const user = useContext(UserContext);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => (!user.name ? children : <Redirect to="/login" />)}
    />
  );
}

export default PrivateRoute;
