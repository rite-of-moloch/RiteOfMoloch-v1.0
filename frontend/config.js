import WalletConnectProvider from "@walletconnect/web3-provider";

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;

export const SUPPORTED_NETWORK_IDS = {
  4: "rinkeby",
  100: "gnosis"
};

export const rpcUrls = {
  4: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
  100: "https://rpc.gnosischain.com"
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        4: rpcUrls[4],
        100: rpcUrls[100]
      }
    }
  }
};

export const WEB3_MODAL_OPTIONS = {
  providerOptions,
  network: "mainnet",
  cacheProvider: true
};
