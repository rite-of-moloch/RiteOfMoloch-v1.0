import { QueryClient, QueryClientProvider } from "react-query";
import { RGThemeProvider } from "@raidguild/design-system";
import { theme } from "../theme";
import { Layout } from "../components/Layout";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "../utils/wagmiConfig";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RGThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </RGThemeProvider>
  );
};

export default App;
