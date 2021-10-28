import React, { ReactElement } from 'react';
import './styles/index.css';

interface INavItem{
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  label: string
  active?: boolean
  theme: 'dark' | 'light'
}

function Navitem({
  Icon, label, active, theme,
}:INavItem):ReactElement {
  return (
    <div
      className={`nav-item-wrapper ${active ? 'nav-active' : null}`}
      style={{
        // eslint-disable-next-line no-nested-ternary
        backgroundColor: active ? (theme === 'light' ? '#EEF0F6' : '#35363B') : '',

      }}
    >
      <div className={`nav-icon ${label}-icon`}>
        <Icon
          style={{
            filter: `${theme === 'dark' ? 'invert(100%) sepia(0%) saturate(8%) hue-rotate(236deg) brightness(104%) contrast(105%)' : ''}`,
          }}
        />
      </div>
      <div className={`nav-label ${label}`}>
        {label}
      </div>
    </div>
  );
}

Navitem.defaultProps = {
  active: false,
};

export default Navitem;
