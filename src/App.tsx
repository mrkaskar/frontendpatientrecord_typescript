import React from 'react';
import './App.css';
import { Dropdown } from './components';
import Colors from './components/global/themes/colors';
import ThemeProvider from './components/global/context/ThemeProvider';

function App():JSX.Element {
  return (
    <ThemeProvider>
      <div
        className="App"
        style={{
          backgroundColor: Colors.background.dark,
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

    </ThemeProvider>
  );
}

export default App;
