import React, { ReactElement } from 'react';
import './styles/index.css';

function Loader():ReactElement {
  return (

    <div className="lds-grid">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Loader;
