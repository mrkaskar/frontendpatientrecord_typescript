import React, { ReactElement } from 'react';
import { Modal } from '../../../components';

interface IDetailModal {
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  userdata : {
    email: string;
    name: string;
    type : string;
  }
}

function DetailModal({ setDetailModal, userdata }: IDetailModal):ReactElement {
  const {
    email, name, type,
  } = userdata;

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
              User Email

            </h4>
            <p>{email}</p>
            <h4 style={{
              textDecoration: 'underline',
            }}
            >
              User name

            </h4>
            <p>{name}</p>
            <h4 style={{
              textDecoration: 'underline',
            }}
            >
              User type

            </h4>
            <p>{type}</p>
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;
