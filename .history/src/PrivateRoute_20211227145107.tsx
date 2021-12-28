import React, { useContext } from 'react';
import { UserContext } from './components/global/context/UserProvider';

function PrivateRoute(
  { children, ...rest },
) {
  const user = useContext(UserContext);
  return (
    <div />
  );
}

export default PrivateRoute;
