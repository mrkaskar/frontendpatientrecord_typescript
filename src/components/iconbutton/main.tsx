import React from 'react';
import './styles/index.css';

interface IButton {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  colorOne: string
  colorTwo: string
  disabled?: boolean
}
function Button({
  Icon, colorOne, colorTwo, disabled,
}:IButton):JSX.Element {
  const enabledStyles = {
    background: `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 165%)`,
    boxShadow: `0px 4px 8px -2px ${colorOne}59`,
    borderRadius: '5px',
  };
  const disabledStyles = {
    background: 'linear-gradient(90deg, #636363 0%, #A0A0A0 165%)',
    boxShadow: '0px 4px 8px -2px #63636359',
    borderRadius: '5px',
  };

  return (
    <div
      style={disabled ? disabledStyles : enabledStyles}
      id="button"
    >
      <Icon id="icon" />
    </div>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
