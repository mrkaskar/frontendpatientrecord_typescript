import React, { ReactElement } from 'react';
import { Modal } from '../../../components';
import { UserContext } from '../../../components/global/context/UserProvider';

interface IDetailModal {
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  treatmentdata : {
    trecode: string;
    name: string;
    charge: string;
  }
}

function DetailModal({ setDetailModal, treatmentdata }: IDetailModal):ReactElement {
  const { user } = React.useContext(UserContext);
  const {
    trecode, name, charge,
  } = treatmentdata;

  return (
    <div>
      <Modal
        width={1100}
        header="Treatment Detail"
        closeModal={() => setDetailModal(false)}
      >
        <div>
          <div
            id="detail-treatment-body"
            style={{
              paddingLeft: '100px',
            }}
          >
            <h4 style={{
              textDecoration: 'underline',
            }}
            >
              Treatement Code

            </h4>
            <p>{trecode}</p>
            <h4 style={{
              textDecoration: 'underline',
            }}
            >
              Treatement Name

            </h4>
            <p>{name}</p>
            {
              user.type === 'admin'
              && (
              <>
                <h4 style={{
                  textDecoration: 'underline',
                }}
                >
                  Charge Amount
                </h4>
                <p>{charge}</p>
              </>
              )
            }
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;
