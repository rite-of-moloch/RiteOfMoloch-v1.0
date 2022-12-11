import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  chain,
  Chain,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
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
    default: "https://rpc.gnosischain.com",
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
  [gnosis, chain.goerli, chain.sepolia],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_INFURA_ID }),
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
