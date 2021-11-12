import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import ThemeProvider from './components/global/context/ThemeProvider';

const queryClient = new QueryClient();

ReactDOM.render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);
