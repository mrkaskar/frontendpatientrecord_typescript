import React, { ReactNode, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './components/global/context/UserProvider';

interface IPrivateRoute {
  children: ReactNode,

}

function PrivateRoute(
  { children, ...rest }:IPrivateRoute,
): ReactNode {
  const user = useContext(UserContext);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => user.name ? children : <Redirect to="/login"} />
    />
  );
}

export default PrivateRoute;
