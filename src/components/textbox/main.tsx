import React, { ReactElement } from 'react';
import './styles/index.css';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';

interface ITextBox {
  label: string
  width?: number
  onInput?: (text: string) => void
  value?: string
}

function TextBox({
  label, width, onInput, value,
}: ITextBox):ReactElement {
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
        spellCheck={false}
        autoComplete="off"
        onChange={(e) => onInput && onInput(e.target.value)}
        value={value}
      />
    </div>
  );
}
TextBox.defaultProps = {
  width: 100,
  // eslint-disable-next-line no-console
  onInput: () => { console.log('Input'); },
  value: '',
};

export default TextBox;
