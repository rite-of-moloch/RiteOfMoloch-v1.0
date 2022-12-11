import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { mainnet, goerli, Chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const gnosis: Chain = {
  id: 100,
  name: "Gnosis",
  network: "xdai",

  nativeCurrency: {
    decimals: 18,
    name: "Gnosis",
    symbol: "xDAI",
  },
  rpcUrls: {
    default: { http: ["https://rpc.gnosischain.com"] },
  },
  blockExplorers: {
    blockscount: {
      name: "BlockScout",
      url: "https://blockscout.com/xdai/mainnet",
    },
    default: { name: "BlockScout", url: "https://blockscout.com/xdai/mainnet" },
  },
  testnet: false,
};

export const { chains, provider } = configureChains(
  [gnosis, mainnet, goerli],
  [
    // alchemyProvider({ apiKey: process.env.REACT_APP_INFURA_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Rite Of Moloch",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});
