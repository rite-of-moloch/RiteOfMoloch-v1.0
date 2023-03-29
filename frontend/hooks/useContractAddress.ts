import { useNetwork } from "wagmi";
import { CONTRACT_ADDRESSES } from "utils/contractAddresses";

/**
 * @remarks hook is used to get RaidGuild address if user visits `/stake' or 'stake/[address].tsx' and doens't provide valid address
 *
 * @param contract string that represents correct smart contract address
 * @returns string of address
 */

const useContractAddress = (contract: string): string => {
  const { chain } = useNetwork();
  let contractAddress: string = "";
  if (typeof chain?.id === "number") {
    contractAddress = CONTRACT_ADDRESSES[chain.id][contract];
    return contractAddress;
  } else return "";
};

export default useContractAddress;
