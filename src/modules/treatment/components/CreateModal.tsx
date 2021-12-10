import React, { ReactElement } from 'react';
import {
  Button, Modal,
} from '../../../components';
import { ReactComponent as Save } from '../../../assets/save.svg';
import Textbox from '../../../components/textbox';

interface ICreateModal {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}
function CreateModal({ modal, setModal }:ICreateModal):ReactElement {
  return (
    <div>
      {
      modal
      && (
      <Modal
        width={700}
        header="Create Treatment"
        closeModal={() => { setModal(false); }}
      >
        <div id="create-treament-body">
          <div>
            <Textbox
              label="Treatment Name"
              width={550}
            />
            <div
              style={{
                height: '10px',
              }}
            />
            <Textbox
              label="Treatment Cost"
              width={80}
            />
            <div
              style={{
                height: '10px',
              }}
            />
            <Textbox
              label="Treatment Code"
              width={120}
            />
          </div>
          <div
            style={{
              marginTop: '30px',
            }}
          >
            <Button
              onClick={() => 3}
              Icon={Save}
              color1="#53BB85"
              color2="#61F2A7"
              label="Save"
            />
          </div>
        </div>
      </Modal>
      )
    }
    </div>
  );
}

export default CreateModal;
