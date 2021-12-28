import React, { ReactElement, useContext } from 'react';
import { ThemeContext } from '../../components/global/context/ThemeProvider';
import colors from '../../components/global/themes/colors';
import Logo from '../../assets/logo.jpg';
import './Login.css';

interface ILogin {
  error: string
}

function Login({ error }: ILogin):ReactElement {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '200px',
    }}
    >
      <img
        src={Logo}
        alt="logo"
        style={{ width: '150px', borderRadius: '50%' }}
      />

      <p
        style={{ color: colors.lightText[theme] }}
      >

        Login to Shwe La Won Dental Clinic

      </p>
      <br />
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
      <br />
      {
          error && (
          <p
            style={{
              color: '#ff6e6e',
              fontSize: '14px',
            }}
            className="fadeout"
          >
            {error}
          </p>
          )
        }
    </div>
  );
}

export default Login;
