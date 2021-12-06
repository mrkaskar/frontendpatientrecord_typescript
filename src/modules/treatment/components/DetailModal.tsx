import React, { ReactElement } from 'react';
import { Modal } from '../../../components';
import { ReactComponent as Userphoto } from '../../../assets/userphoto.svg';
import colors from '../../../components/global/themes/colors';
import { ThemeContext } from '../../../components/global/context/ThemeProvider';
import Gallery from '../../../components/gallery';

interface IDetailModal {
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  treatmentdata : {
    trecode: string;
    name: string;
    charge: string;
  }
}

function DetailModal({ setDetailModal, treatmentdata }: IDetailModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const {
    trecode, name, charge,
  } = treatmentdata;

  const [gallery, setGallery] = React.useState(false);
  const [currentGallery, setCurrentGallery] = React.useState(0);

  return (
    <div>
      <Modal
        width={1100}
        header="Treatment Detail"
        closeModal={() => setDetailModal(false)}
      >
        <div>
          <div id="detail-treatment-body">
            <h1>{trecode}</h1>
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;
