import React from 'react';
import { ReactComponent as DownArrow } from './assets/arrowicon.svg';
import './styles/index.css';
import Checkbox from '../checkbox';
import colors from '../global/themes/colors';

type Check = {
  label: string;
  checked: boolean;
}

type TDropdown = {
  label: string;
  width?: number;
  list: Check[];
}

function Dropdown({ label, width, list }: TDropdown): JSX.Element {
  const [state, setState] = React.useState(false);

  const { inputback } = colors;

  const theme = 'dark';

  const toggle = (e: React.MouseEvent<HTMLDivElement>):void => {
    e.stopPropagation();
    setState((prev) => !prev);
  };

  const preventClose = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    function listener():void {
      setState(false);
    }
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, []);

  return (
    <div id="drop">
      <div id="dropdown">
        <div aria-hidden="true" onClick={toggle} id="box" style={{ backgroundColor: inputback[theme], width }}>
          <span id="label">
            {label}
          </span>
        </div>
        <div aria-hidden="true" id="arrow" onClick={toggle}>
          <DownArrow />
        </div>
      </div>
      {
        state
      && (
      <div onClick={preventClose} aria-hidden="true" id="boxarea" style={{ width: width && width + 25 }}>

        {
          list.map((ele) => (
            <div onClick={preventClose} aria-hidden="true" className="listarea">
              <Checkbox label={ele.label} checked={ele.checked} />
            </div>
          ))
        }
      </div>
      )

      }
    </div>
  );
}

Dropdown.defaultProps = {
  width: 300,
};

export default Dropdown;
