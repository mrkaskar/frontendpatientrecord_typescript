import React, { useContext } from 'react';
import './App.css';
import {
  Modal, Table, TextBox, Toggler, Image,
} from './components';
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
      <Image />
      <Toggler />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      {/* <Table
        data={{
          headers: ['Reg No.', 'Name', 'Phone', 'Age', 'Address', 'Actions'],
          body: [
            [
              '01001', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01002', 'John Doe 2', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01003', 'John Doe 3', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01004', 'John Doe 4', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01005', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01001', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01002', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01003', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01004', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01005', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01001', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01002', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01003', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01004', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01005', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01001', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01002', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01003', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01004', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01005', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
          ],
        }}
      /> */}

    </div>

  );
}

export default App;
