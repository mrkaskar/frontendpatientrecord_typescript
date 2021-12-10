import React, { ReactElement } from 'react';
import { ThemeContext } from '../../components/global/context/ThemeProvider';
import colors from '../../components/global/themes/colors';
import { ReactComponent as Add } from '../../assets/addpatient.svg';
import './Patient.css';
import PatientTable from '../../modules/patient/components/PatientTable';
import CreateModal from '../../modules/patient/components/CreateModal';

function Patient():ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const [modal, setModal] = React.useState(false);
  return (
    <div>
      {modal && <CreateModal modal={modal} setModal={setModal} />}
      <span
        className="board-title"
        style={{
          color: colors.text[theme],
        }}
      >
        Patient Board
        <span
          aria-hidden="true"
          onClick={() => setModal(true)}
          id="patient-create"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #73B85A 0%, #87E777 165%)',
            boxShadow: '0px 8px 16px -2px rgba(116, 186, 92, 0.35)',
            borderRadius: '5px',
            boxSizing: 'border-box',
            paddingLeft: '8px',
            width: '74px',
            height: '25px',
            color: 'white',
            paddingTop: '4px',
            position: 'relative',
            marginLeft: '20px',
          }}
        >
          <Add />
          <span style={{
            fontSize: '12px',
            position: 'absolute',
            top: '6px',
            left: '26px',
          }}
          >
            Create
          </span>
        </span>
      </span>

      <div id="patient-board-body">
        <PatientTable />
      </div>
    </div>
  );
}

export default Patient;
