import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { store, persistor} from "../store";
import { Provider } from "react-redux"
import { PersistGate} from "redux-persist/integration/react";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#096C3A',
            main: '#096C3A',
            dark: '#096C3A',
        },
        secondary: {
            light: '#5b5b5b',
            main: '#333333',
            grey: '#FFFFFFA1',
        },
        text: {
            light: '#B0B3B8',
            main: '#E4E6EB',
            dark: '#000000',
        },
    },
});


const App = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

const MyApp = (props) => {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
              <title>Mechanical Digital library UNN </title><link rel="icon" href="/assets/favicon/favicon.ico" />
              <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <App Component={Component} pageProps={pageProps} />
          </ThemeProvider>
        </PersistGate>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp