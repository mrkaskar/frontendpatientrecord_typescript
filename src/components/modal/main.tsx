import React, { ReactElement } from 'react';
import './styles/index.css';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';
import { ReactComponent as Cross } from './assets/cross.svg';

interface IModal {
  header: string
  closeModal:(e:React.MouseEvent<HTMLDivElement>) => void,
  width: number
  children: JSX.Element
}

function Modal({
  closeModal, children, header, width,
}:IModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div
      aria-hidden="true"
      id="backdrop"
      // onClick={closeModal}
    >
      <div
        aria-hidden="true"
        id="modal"
        style={{
          backgroundColor: colors.level1[theme],
          color: colors.text[theme],
          width: `${width}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div id="modal__header">
          {header}
          <span
            aria-hidden="true"
            onClick={closeModal}
            id="close_modal"
          >
            <Cross />

          </span>
        </div>
        <div
          id="modal__body"
        >
          {children}
        </div>
      </div>

    </div>
  );
}

export default Modal;
