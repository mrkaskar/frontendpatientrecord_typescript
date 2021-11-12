import React from 'react';
import './styles/index.css';

interface IButton {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  colorOne: string
  colorTwo: string
  disabled?: boolean
  onClick?: () => void
}
function Button({
  Icon, colorOne, colorTwo, disabled,
  onClick,
}:IButton):JSX.Element {
  const enabledStyles = {
    background: `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 165%)`,
    boxShadow: `0px 4px 8px -2px ${colorOne}59`,
    borderRadius: '5px',
  };
  const disabledStyles = {
    background: 'linear-gradient(90deg, #CCCCCC 0%, #E4E4E4 165%)',
    borderRadius: '5px',
  };

  return (
    <div
      style={disabled ? disabledStyles : enabledStyles}
      id="button"
      aria-hidden="true"
      onClick={onClick}
    >
      <Icon id="icon" />
    </div>
  );
}

Button.defaultProps = {
  disabled: false,
  onClick: () => null,
};

export default Button;
