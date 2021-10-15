import React, { ReactElement } from 'react';
import './styles/index.css';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';

interface IModal {
  closeModal:(e:React.MouseEvent<HTMLDivElement>) => void,
}

function Modal({ closeModal }:IModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div
      aria-hidden="true"
      id="backdrop"
      onClick={closeModal}
    >
      <div
        aria-hidden="true"
        id="modal"
        style={{
          backgroundColor: colors.level1[theme],
          color: colors.text[theme],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div id="modal__header">
          Create a patient
        </div>
        <div
          id="modal__body"
        >
          Modal body
        </div>
      </div>

    </div>
  );
}

export default Modal;
