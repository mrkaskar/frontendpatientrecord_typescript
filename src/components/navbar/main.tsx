import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Navitem from './nav-item';
import './styles/index.css';
import { ReactComponent as User } from './assets/user.svg';
import { ReactComponent as Home } from './assets/home.svg';
import { ReactComponent as Patient } from './assets/patient.svg';
import { ReactComponent as Treatment } from './assets/treatment.svg';
import { ReactComponent as Medicine } from './assets/medicine.svg';
import { ReactComponent as Users } from './assets/users.svg';
import { ReactComponent as Logout } from './assets/logout.svg';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';

const paths = {
  dashboard: '/',
  patient: '/patient',
  treatment: '/treatment',
  medication: '/medication',
  users: '/users',
};
function Navbar():ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const { pathname } = useLocation();
  const {
    dashboard, patient, treatment, medication, users,
  } = paths;
  return (
    <div
      id="nav-wrapper"
      style={{
        backgroundColor: colors.level1[theme],
      }}
    >
      <div id="nav-header">
        <span id="title">
          Shwe La Won Dental Clinic
        </span>
        <span id="usericon">
          <User />
        </span>
        <span id="username">
          Dr.John
        </span>
      </div>
      <div
        id="nav-body"
        style={{
          color: colors.text[theme],
        }}
      >

        <Link to={dashboard}>
          <Navitem
            Icon={Home}
            label="Dashboard"
            active={pathname === dashboard}
            theme={theme}
          />
        </Link>
        <Link to={patient}>
          <Navitem
            Icon={Patient}
            label="Patient"
            theme={theme}
            active={pathname === patient}
          />
        </Link>
        <Link to={treatment}>
          <Navitem
            Icon={Treatment}
            label="Treatment"
            theme={theme}
            active={pathname === treatment}
          />
        </Link>
        <Link to={medication}>
          <Navitem
            Icon={Medicine}
            label="Medication"
            theme={theme}
            active={pathname === medication}
          />
        </Link>
        <Link to={users}>
          <Navitem
            Icon={Users}
            label="Users"
            theme={theme}
            active={pathname === users}
          />
        </Link>
        <div style={{
          height: '150px',
        }}
        />
        <Navitem
          Icon={Logout}
          label="Logout"
          theme={theme}
        />

      </div>
    </div>
  );
}

export default Navbar;
