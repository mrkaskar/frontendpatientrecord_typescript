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
import { UserContext } from './components/global/context/UserProvider';

function App():JSX.Element {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
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
    </div>

  );
}

export default App;
