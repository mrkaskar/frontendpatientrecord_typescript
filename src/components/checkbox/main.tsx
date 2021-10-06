import React from 'react';
import { ReactComponent as Checked } from './assets/checked.svg';
import { ReactComponent as Unchecked } from './assets/unchecked.svg';
import colors from '../global/themes/colors';
import './styles/index.css';
import { ThemeContext } from '../global/context/ThemeProvider';

type TCheckbox = {
  checked?: boolean;
  label: string
}
function Checkbox({ checked, label }:TCheckbox): JSX.Element {
  const [check, setCheck] = React.useState(checked);
  const { theme } = React.useContext(ThemeContext);
  const { text } = colors;
  function toggleCheck():void {
    setCheck((prev) => !prev);
  }
  return (
    <div id="checkbox">
      {
      check
        ? (
          <div className="checkwrap" aria-hidden="true" onClick={toggleCheck}>
            <Checked />
          </div>
        )
        : (
          <div className="checkwrap" aria-hidden="true" onClick={toggleCheck}>
            <Unchecked />
          </div>
        )
    }
      <span
        id="clabel"
        aria-hidden="true"
        onClick={toggleCheck}
        style={{ color: text[theme] }}
      >
        {label}
      </span>
    </div>
  );
}

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
