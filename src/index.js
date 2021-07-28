import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Provider } from 'react-redux'
import store from 'redux/store/store';
import 'normalize.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHEABLE_KEY)

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Segoe UI"'
    ].join(','),
  },
  palette: {
    primary: {
      // choreado: '#072453',
      background: '#0F3460',
      main: '#272727b3',
      dark: '#2C2E43',
      buttons: '#ffd523',
      contrastText: '#fff',
      marfilWhite: '#fdfbfb',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
      background: '#393939'
    }
  },
  root: {
    '& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)': {
      color:'white',
    },
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

