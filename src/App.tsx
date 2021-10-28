import React, { useContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Colors from './components/global/themes/colors';
import { Toggler, Navbar } from './components';
import { ThemeContext } from './components/global/context/ThemeProvider';
import Dashboard from './screens/large/Dashboard';
import Patient from './screens/large/Patient';
import Medication from './screens/large/Medication';
import Treatment from './screens/large/Treatment';
import Users from './screens/large/Users';

function App():JSX.Element {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className="App"
      style={{
        backgroundColor: Colors.background[theme],
      }}
    >
      <Router>
        <div id="space">
          <div id="nav-space">
            <Navbar />
          </div>
          <div id="body-space">
            <span id="toggler">
              <Toggler />
            </span>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/patient" exact component={Patient} />
              <Route path="/medication" exact component={Medication} />
              <Route path="/treatment" exact component={Treatment} />
              <Route path="/users" exact component={Users} />
            </Switch>
          </div>
        </div>
      </Router>
      {/* <Toggler />
      */}
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
