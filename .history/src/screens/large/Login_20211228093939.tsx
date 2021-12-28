import React, { ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../components/global/context/ThemeProvider';
import colors from '../../components/global/themes/colors';
import Logo from '../../assets/logo.jpg';
import './Login.css';
import { baseURL } from '../../helpers/api/backend';
import { UserContext } from '../../components/global/context/UserProvider';

interface ILogin {
  error: string
}

function Login({ error }: ILogin):ReactElement {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  React.useLayoutEffect(() => {
    if (user.name) {
      navigate('/dashboard');
    }
  }, [navigate, user]);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '150px',
    }}
    >
      <div
        style={{
          backgroundColor: 'black',
          borderRadius: '50%',
          width: '170px',
          height: '170px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'white',
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{ width: '150px', borderRadius: '50%' }}
        />
      </div>

      <br />
      <p
        style={{ color: colors.lightText[theme] }}
      >

        Login to Shwe La Won Dental Clinic

      </p>
      <br />
      <button
        onClick={() => {
          window.location.assign(`${baseURL}/auth/google`);
        }}
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
