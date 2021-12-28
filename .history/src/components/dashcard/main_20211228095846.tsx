import React, { ReactElement } from 'react';
import './styles/index.css';
import { relative } from 'path';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';
import { ReactComponent as Refresh } from '../../assets/refresh.svg';

interface IDashcard {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  color1: string
  color2: string
  label: string
  count: number
}

function Dashcard({
  Icon, color1, color2, label, count,
}: IDashcard): ReactElement {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div
      className="dashcard"
      style={{
        backgroundColor: colors.level1[theme],
        position: 'relative',
      }}
    >
      <div
        className="icon-wrapper"
        style={{
          backgroundColor: color1,
          ...theme === 'dark' && { boxShadow: `0px 8px 16px -2px ${color1}35` },
        }}
      >
        <Icon className={label.split(' ')[0]} />
      </div>
      <div className="right-dash">
        <div
          className="dash-label"
          style={{
            color: colors.text[theme],
          }}
        >
          {label}
          {label === 'Revenue' && (
          <span style={{
            position: 'absolute',
            right: '5px',
            top: '1px',
          }}
          >
            <Refresh
              style={{
                filter: `${theme === 'dark' ? 'invert(100%) sepia(0%) saturate(8%) hue-rotate(236deg) brightness(104%) contrast(105%)' : ''}`,
                width: '20px',
              }}
            />
          </span>
          )}
        </div>
        <div
          className="dash-count"
          style={{
            color: color2,
          }}
        >
          {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          {' '}
          {label === 'Revenue' && 'MMK'}
        </div>
      </div>

    </div>
  );
}

export default Dashcard;
