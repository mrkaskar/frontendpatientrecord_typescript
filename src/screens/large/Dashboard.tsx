import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Dashcard } from '../../components';
import { ThemeContext } from '../../components/global/context/ThemeProvider';
import colors from '../../components/global/themes/colors';
import { ReactComponent as Users } from '../../assets/user.svg';
import { ReactComponent as Medicine } from '../../assets/medicine.svg';
import { ReactComponent as Money } from '../../assets/money.svg';
import { ReactComponent as Treatment } from '../../assets/treatment.svg';
import { ReactComponent as Patient } from '../../assets/patient.svg';
import { getDashBoard } from '../../modules/dashboard/api/apiFunctions';
import { UserContext } from '../../components/global/context/UserProvider';

function Dashboard():ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const dashboard = useQuery('dashboard', getDashBoard);
  const { user } = React.useContext(UserContext);
  const [dash, setDash] = React.useState({
    users: 0,
    patients: 0,
    medicine: 0,
    revenue: 0,
    treatment: 0,
  });
  const {
    users, patients, medicine, revenue, treatment,
  } = dash;

  React.useEffect(() => {
    if (dashboard.data) { setDash(dashboard.data[0]); }
  }, [dashboard.data]);

  return (
    <div>
      <span
        className="board-title"
        style={{
          color: colors.text[theme],
        }}
      >
        Welcome
        {' '}
        {user.name}
      </span>
      <div
        className="dashboard-content"
        style={{
          display: 'grid',
          gridTemplateColumns: '342px 342px',
          marginTop: '20px',
          rowGap: '30px',
        }}
      >
        <Dashcard
          Icon={Users}
          color1="#CFDFFF"
          color2="#5B71E4"
          label="Total Users"
          count={users}
        />
        <Dashcard
          Icon={Patient}
          color1="#B8FFF6"
          color2="#099EA7"
          label="Total Patient"
          count={patients}
        />
        <Dashcard
          Icon={Medicine}
          color1="#FFE1F9"
          color2="#E450C4"
          label="Total Medicine"
          count={medicine}
        />
        {user.type === 'admin'
        && (
        <Dashcard
          Icon={Money}
          color1="#BBFFBE"
          color2="#38C33E"
          label="Revenue"
          count={revenue}
        />
        )}
        <Dashcard
          Icon={Treatment}
          color1="#F8FFA7"
          color2="#AEB100"
          label="Total Treatment"
          count={treatment}
        />

      </div>
    </div>
  );
}

export default Dashboard;
