import React, { ReactNode, useContext } from 'react';
import { UserContext } from './components/global/context/UserProvider';

interface IPrivateRoute {
  children: ReactNode,

}

function PrivateRoute(
  { children, ...rest }:IPrivateRoute,
): ReactNode {
  const user = useContext(UserContext);
  return (
    <div />
  );
}

export default PrivateRoute;
