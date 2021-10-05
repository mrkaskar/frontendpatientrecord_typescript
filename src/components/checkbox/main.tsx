import React from 'react';
import { ReactComponent as Checked } from './assets/checked.svg';
import { ReactComponent as Unchecked } from './assets/unchecked.svg';
import './styles/index.css';

type TCheckbox = {
  checked?: boolean;
  label: string
}
function Checkbox({ checked, label }:TCheckbox): JSX.Element {
  const [check, setCheck] = React.useState(checked);
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
      <span id="clabel" aria-hidden="true" onClick={toggleCheck}>
        {label}
      </span>
    </div>
  );
}

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
