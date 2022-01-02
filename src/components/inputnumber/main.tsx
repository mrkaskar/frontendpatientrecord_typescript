import React, { ReactElement, useContext } from 'react';
import { ReactComponent as Increase } from './assets/increase.svg';
import { ReactComponent as Decrease } from './assets/decrease.svg';
import './styles/index.css';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';

interface IInputNumber {
  value: number;
  onIncrease: ()=>void;
  onDecrease: ()=>void;
}
function InputNumber({
  value, onIncrease, onDecrease,
}:IInputNumber):ReactElement {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="number-wrapper">
      <button
        onClick={onDecrease}
        type="button"
        className="decrease"
      >
        <Decrease style={{ pointerEvents: 'none' }} />
      </button>
      <div
        className="input-number"
        style={{
          color: colors.text[theme],
        }}
      >
        {value}
      </div>
      <button
        onClick={onIncrease}
        type="button"
        className="increase"
      >
        <Increase style={{ pointerEvents: 'none' }} />
      </button>
    </div>
  );
}

export default InputNumber;
