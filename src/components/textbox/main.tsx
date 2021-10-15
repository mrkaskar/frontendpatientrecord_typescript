import React, { ReactElement } from 'react';
import './styles/index.css';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';

interface ITextBox {
  label: string
  width?: number
}

function TextBox({ label, width }: ITextBox):ReactElement {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div id="textbox">
      <div
        style={{
          color: colors.text[theme],
        }}
        id="textlabel"
      >
        {label}

      </div>
      <input
        id="text"
        style={{
          width,
          backgroundColor: colors.inputback[theme],
          color: colors.text[theme],
        }}
      />
    </div>
  );
}
TextBox.defaultProps = {
  width: 100,
};

export default TextBox;
