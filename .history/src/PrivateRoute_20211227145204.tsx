import React, { ReactNode, useContext } from 'react';
import { Route } from 'react-router-dom';
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
      {...rest}
    />
  );
}

export default PrivateRoute;
