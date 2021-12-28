import React, { useContext } from 'react';
import { UserContext } from './components/global/context/UserProvider';

interface IPrivateRoute {

}

function PrivateRoute(
  { children, ...rest }:IPrivateRoute,
) {
  const user = useContext(UserContext);
  return (
    <div />
  );
}

export default PrivateRoute;
