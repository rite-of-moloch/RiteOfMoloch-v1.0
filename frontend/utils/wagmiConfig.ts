import { Chain, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, mainnet } from "wagmi";
import { goerli, sepolia } from "wagmi/chains";
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
  [mainnet, gnosis, sepolia, goerli],

  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || "" }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID || "" }),
    publicProvider(),
  ],
  { stallTimeout: 5000 }
);

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || "";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      ledgerWallet({ chains, projectId: PROJECT_ID }),
      metaMaskWallet({ chains, projectId: PROJECT_ID }),
      coinbaseWallet({ chains, appName: "Rite Of Moloch" }),
      walletConnectWallet({ chains, projectId: PROJECT_ID }),
      rainbowWallet({ chains, projectId: PROJECT_ID }),
    ],
  },
]);

// set autConnect to false in development, true in production
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
