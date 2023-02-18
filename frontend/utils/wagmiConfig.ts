import { Chain, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import {
  goerli,
  // gnosis
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";

const gnosis: Chain = {
  id: 100,
  name: "Gnosis",
  network: "xdai",
  iconUrl: "https://i.imgur.com/lL4RlAZ.png",
  iconBackground: "white",
  nativeCurrency: {
    decimals: 18,
    name: "Gnosis",
    symbol: "xDAI",
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.gnosischain.com"],
    },
    default: {
      http: ["https://rpc.gnosischain.com"],
    },
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
  [gnosis, goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || "" }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID || "" }),
    publicProvider(),
  ],
  { stallTimeout: 5000 }
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      ledgerWallet({ chains }),
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: "Rite Of Moloch" }),
      walletConnectWallet({ chains }),
      rainbowWallet({ chains }),
    ],
  },
]);

// set autConnect to false in development, true in production
export const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});
