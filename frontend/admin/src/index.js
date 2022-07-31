import { ThemeProvider } from '@mui/material';
import { theme } from 'config/MuiTheme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'
import { admin } from 'constants/index'
axios.defaults.headers.common['Authorization'] = admin || ""

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);