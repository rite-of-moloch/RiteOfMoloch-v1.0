import { useContractRead, useNetwork } from "wagmi";
import { setAbi } from "utils/general";
import { CONTRACT_ADDRESSES } from "utils/constants";

/**
 *
 * @param contractName - pass in contract name
 * @param functionName - pass name of function
 * @param args - option array of args
 * @returns
 */

export const useReadContract = (
  contractName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();
  let address = "";
  if (chain?.id) {
    address = CONTRACT_ADDRESSES[chain.id][contractName];
  }

  const { data, isLoading } = useContractRead({
    addressOrName: address || "",
    contractInterface: setAbi(contractName),
    functionName,
    args,
    chainId: chain?.id,
    onSuccess(data) {
      // console.log("Success", data);
    },
    onError(err) {
      console.log("Error", err);
    },
  });

  return { data, isLoading };
};
