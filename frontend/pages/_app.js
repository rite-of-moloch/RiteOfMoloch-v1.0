import { ChakraProvider } from '@chakra-ui/react';

import AppContextProvider from '../context/AppContext';
import { theme } from '../styles/theme';
import { Layout } from '../shared/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AppContextProvider>
  );
}

export default MyApp;
