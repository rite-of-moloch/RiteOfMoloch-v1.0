// import { useContext, useState, useEffect, useCallback } from "react";
// import { providers } from "ethers";
// import Web3 from "web3";
// import Web3Modal from "web3modal";

// import { AppContext } from "../context/AppContext";

// import { WEB3_MODAL_OPTIONS } from "../config";

// const web3Modal =
//   typeof window !== "undefined" ? new Web3Modal(WEB3_MODAL_OPTIONS) : null;

// export const useWallet = () => {
//   const context = useContext(AppContext);
//   const [signaturePending, setSignaturePending] = useState(false);

//   const setWeb3Provider = useCallback(async (modalProvider) => {
//     const ethersProvider = new providers.Web3Provider(modalProvider);
//     const web3 = new Web3(modalProvider);
//     const signerAddress = (
//       await ethersProvider.getSigner().getAddress()
//     ).toLowerCase();
//     const chainId = Number(modalProvider.chainId);

//     context.setWeb3Data({
//       ethersProvider,
//       web3,
//       signerAddress,
//       chainId
//     });
//   }, []);

//   const disconnect = useCallback(async () => {
//     web3Modal?.clearCachedProvider();
//     context.setWeb3Data({
//       ethersProvider: null,
//       web3: null,
//       signerAddress: null,
//       signerEns: null,
//       chainId: null
//     });
//   }, []);

//   const connectWallet = useCallback(async () => {
//     if (!web3Modal) return;

//     try {
//       setSignaturePending(true);

//       const modalProvider = await web3Modal.connect();
//       await setWeb3Provider(modalProvider);
//       setSignaturePending(false);

//       modalProvider.on("accountsChanged", async () => {
//         window.location.reload();
//       });

//       modalProvider.on("chainChanged", (_chainId) => {
//         const chainId = Number(_chainId);
//         const ethersProvider = new providers.Web3Provider(modalProvider);
//         context.setWeb3Data({
//           chainId,
//           ethersProvider
//         });
//       });
//     } catch (err) {
//       setSignaturePending(false);
//     }
//   }, [setWeb3Provider, disconnect]);

//   useEffect(() => {
//     if (web3Modal?.cachedProvider) {
//       connectWallet();
//     }
//   }, []);

//   return { signaturePending, connectWallet, disconnect };
// };
