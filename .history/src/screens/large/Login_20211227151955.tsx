import React, { ReactElement } from 'react';

function Login():ReactElement {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <h3>Login to Shwe La Won Dental Clinic</h3>
      <button
        style={{
          backgroundColor: 'rgb(0,161,123)',
          backgroundImage: 'linear-gradient(32deg, rgba(0,161,123,1) 44%, rgba(2,195,150,1) 100%)',
          border: 'none',
          color: 'white',
          padding: '8px 16px 8px 16px',
          borderRadius: '8px',
        }}
        type="button"
      >
        Login with Authentication

      </button>
    </div>
  );
}

export default Login;
