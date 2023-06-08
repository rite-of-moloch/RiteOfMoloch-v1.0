import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormProvider } from "context/FormContext";
import { theme } from "../theme";
import { Layout } from "../components/layout/Layout";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "../utils/wagmiConfig";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@raidguild/design-system";

const queryClient = new QueryClient();

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
                <FormProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </FormProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
