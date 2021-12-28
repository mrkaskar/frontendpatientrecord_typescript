import React, { ReactElement } from 'react';

function Login():ReactElement {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}
    >
      <h3>Login to Shwe La Won Dental Clinic</h3>
      <button type="button">Login with Authentication</button>
    </div>
  );
}

export default Login;
