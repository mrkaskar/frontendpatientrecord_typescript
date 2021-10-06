import React, { CSSProperties } from 'react';
import { ThemeContext } from '../context/ThemeProvider';
import { ReactComponent as Moon } from './assets/moon.svg';
import { ReactComponent as Sun } from './assets/sun.svg';

function Toggler():JSX.Element {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const styles :CSSProperties = {
    width: 80,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div>
      {
        theme === 'light'
          ? (
            <div style={styles} aria-hidden="true" onClick={toggleTheme}>
              <Sun />
            </div>
          )
          : (
            <div style={styles} aria-hidden="true" onClick={toggleTheme}>
              <Moon />
            </div>
          )
      }
    </div>
  );
}

export default Toggler;
