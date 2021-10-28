import React, { ReactElement } from 'react';
import { Dashcard } from '../../components';
import { ThemeContext } from '../../components/global/context/ThemeProvider';
import colors from '../../components/global/themes/colors';
import { ReactComponent as Users } from '../../assets/user.svg';
import { ReactComponent as Medicine } from '../../assets/medicine.svg';
import { ReactComponent as Money } from '../../assets/money.svg';
import { ReactComponent as Treatment } from '../../assets/treatment.svg';
import { ReactComponent as Patient } from '../../assets/patient.svg';

function Dashboard():ReactElement {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div>
      <span
        className="board-title"
        style={{
          color: colors.text[theme],
        }}
      >
        Welcome Dr.John
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
            count={2}
          />
          <Dashcard
            Icon={Patient}
            color1="#B8FFF6"
            color2="#099EA7"
            label="Total Patient"
            count={10}
          />
          <Dashcard
            Icon={Medicine}
            color1="#FFE1F9"
            color2="#E450C4"
            label="Total Medicine"
            count={100}
          />
          <Dashcard
            Icon={Money}
            color1="#BBFFBE"
            color2="#38C33E"
            label="Revenue"
            count={3000}
          />
          <Dashcard
            Icon={Treatment}
            color1="#F8FFA7"
            color2="#AEB100"
            label="Total Treatment"
            count={30}
          />
        </div>
      </span>
    </div>
  );
}

export default Dashboard;
