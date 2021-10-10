import React, { useContext } from 'react';
import './App.css';
import { Table, Toggler } from './components';
import Colors from './components/global/themes/colors';
import { ThemeContext } from './components/global/context/ThemeProvider';

function App():JSX.Element {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className="App"
      style={{
        backgroundColor: Colors.background[theme],
      }}
    >
      <Toggler />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <Table
        data={{
          headers: ['Registration no', 'Name', 'Phone Number', 'Age', 'Address', 'Actions'],
          body: [
            [
              '01001', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon',
            ],
            [
              '01001', 'John Doe Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon',
            ],
            [
              '01001', 'John Doe Doe Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon',
            ],
          ],
        }}
      />

    </div>

  );
}

export default App;
