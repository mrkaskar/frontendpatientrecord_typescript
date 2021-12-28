import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import ThemeProvider from './components/global/context/ThemeProvider';
import UserProvider from './components/global/context/UserProvider';

const queryClient = new QueryClient();

ReactDOM.render(
  <ThemeProvider>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UserProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);
