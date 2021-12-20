import React, { ReactElement } from 'react';
import { Modal } from '../../components';

interface IDeleteModal {
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  confirm: () => void;
}

function DeleteModal({ setDeleteModal, confirm }: IDeleteModal):ReactElement {
  return (
    <div>
      <Modal
        width={600}
        header="Delete Confirmation"
        closeModal={() => setDeleteModal(false)}
      >
        <div
          id="delete-body"
          style={{
            paddingLeft: '100px',
          }}
        >
          <h3
            style={{ marginBottom: '50px' }}
          >
            Are you sure you want to delete?

          </h3>

          <button
            style={{
              border: 'none',
              padding: '5px 10px 5px 10px',
              background: '#ed3333',
              backgroundImage: 'linear-gradient(49deg, #ed3333 44%, rgba(235,94,94,1) 100%)',
              borderRadius: '5px',
              color: 'white',
            }}
            type="button"
            onClick={confirm}
          >
            Confirm

          </button>
          <button
            style={{
              border: 'none',
              padding: '5px 10px 5px 10px',
              background: '#828282',
              backgroundImage: 'linear-gradient(49deg, #828282 44%, #797979 100%)',
              borderRadius: '5px',
              color: 'white',
              marginLeft: '10px',
            }}
            type="button"
            onClick={() => setDeleteModal(false)}
          >
            Cancel

          </button>
        </div>

      </Modal>
    </div>
  );
}

export default DeleteModal;
