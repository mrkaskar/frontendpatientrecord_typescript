import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeProvider from './components/global/context/ThemeProvider';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
