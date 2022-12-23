import { useNetwork } from "wagmi";
import { CONTRACT_ADDRESSES } from "utils/constants";

export const useContractAddress = (contract: string): string => {
  const { chain } = useNetwork();
  let contractAddress: string = "";
  if (typeof chain?.id === "number") {
    contractAddress = CONTRACT_ADDRESSES[chain.id][contract];
    return contractAddress;
  } else return "";
};
