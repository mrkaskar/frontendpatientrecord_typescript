import React, { ReactElement } from 'react';
import './styles/index.css';

interface IButton {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  color1: string
  color2: string
  label: string
  onClick: () => void
}
function Button({
  Icon, color1, color2, label, onClick,
}:IButton):ReactElement {
  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      style={{
        width: '84px',
        height: '34px',
        background: `linear-gradient(98.08deg, ${color1} 0%, ${color2} 150.8%)`,
        boxShadow: `0px 8px 16px ${color1}35`,
        borderRadius: '10px',
        color: 'white',
        display: 'inline-flex',
        fontSize: '14px',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '2px',
        paddingRight: '2px',
        gap: '7px',
        marginRight: '10px',
        boxSizing: 'border-box',
      }}
      className="button"
    >

      {Icon
      && (
      <div
        style={{
          paddingTop: '3px',
          boxSizing: 'border-box',
        }}
      >
        <Icon />
      </div>
      )}
      <div>
        {label}
      </div>
    </div>
  );
}

Button.defaultProps = {
  Icon: null,
};

export default Button;
