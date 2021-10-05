import React, { useContext, useEffect } from 'react';
import './App.css';
import { Dropdown } from './components';
import Colors from './components/global/themes/colors';
import { ThemeContext } from './components/global/context/ThemeProvider';

function App():JSX.Element {
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    setTimeout(() => {
      toggleTheme();
    }, 5000);
  }, [toggleTheme]);
  return (
    <div
      className="App"
      style={{
        backgroundColor: Colors.background[theme],
      }}
    >
      Hello
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Dropdown
          label="Choose treatment"
          list={[
            {
              label: 'just testing ',
              checked: true,
            },
            {
              label: 'just testing 1',
              checked: false,
            },
            {
              label: 'just testing 2',
              checked: true,
            },
          ]}
        />

      </div>
    </div>

  );
}

export default App;
