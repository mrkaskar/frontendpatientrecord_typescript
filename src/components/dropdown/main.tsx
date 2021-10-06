import React from 'react';
import { ReactComponent as DownArrow } from './assets/arrowicon.svg';
import './styles/index.css';
import Checkbox from '../checkbox';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';

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
  const { theme } = React.useContext(ThemeContext);

  const [showlist, setShowlist] = React.useState(list);
  const [search, setSearch] = React.useState('');
  const inputRef = React.useRef<null|HTMLInputElement>(null);

  React.useEffect(() => {
    if (search) {
      setShowlist(list.filter((l) => l.label.includes(search)));
    } else {
      setShowlist(list);
    }
  }, [search, list]);

  React.useEffect(() => {
    inputRef?.current?.focus();
  }, [state]);

  const { inputback, text } = colors;

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
      <div onClick={preventClose} aria-hidden="true" id="boxarea" style={{ backgroundColor: inputback[theme], width: width && width + 10 }}>
        <div onClick={preventClose} aria-hidden="true" className="listarea">
          <div>
            <input
              ref={inputRef}
              style={{ backgroundColor: inputback[theme], color: text[theme] }}
              id="searchlist"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        {
          showlist.map((ele) => (
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
