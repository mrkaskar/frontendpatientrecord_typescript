import React from 'react';
import colors from '../global/themes/colors';

import { ThemeContext } from '../global/context/ThemeProvider';

import './styles/index.css';

interface ITable {
  data: {
    headers: string[],
    body: string[][]
  }
}

function Table({ data }:ITable):JSX.Element {
  const { theme } = React.useContext(ThemeContext);

  const { headers, body } = data;
  return (
    <div
      id="table"
      style={{
        backgroundColor: colors.level1[theme],
      }}
    >
      <div id="headback" />
      {
        headers.map((head, index) => (
          <div className={`columns ${head} ${index === 0 && 'head'}`}>
            <div className="header">
              {head}
            </div>
            <div className="bodies">
              {
              body.map((_, i) => (
                <div
                  className="body"
                  style={{
                    color: colors.text[theme],
                  }}
                >
                  {body[i][index]}
                </div>
              ))
            }
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Table;
