import React, { ReactElement } from 'react';

interface ILogin {
  error: string
}

function Login({ error }: ILogin):ReactElement {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '200px',
    }}
    >
      <p
        style={{ color: '#3a3a3a' }}
      >
        Login to Shwe La Won Dental Clinic

      </p>
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
      {
          error && (
          <p
            style={{
              color: '#ff6e6e',
            }}
          >
            {error}
          </p>
          )
        }
    </div>
  );
}

export default Login;
