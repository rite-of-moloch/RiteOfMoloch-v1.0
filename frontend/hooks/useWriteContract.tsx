import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../contracts/erc20TokenAddress.json";
import { CONTRACT_ADDRESSES } from "utils/constants";

/**
 *
 * @param contractName - pass in contract name
 * @param functionName - pass name of function
 * @returns
 */

export const useWriteContract = (
  contractName: string,
  functionName: string,
  args?: any
) => {
  // console.log(abi, contractName, functionName, args);

  const { chain } = useNetwork();
  let address = "";
  if (chain?.id) {
    address = CONTRACT_ADDRESSES[chain.id][contractName];
  }

  const { config } = usePrepareContractWrite({
    addressOrName: address || "",
    contractInterface: abi,
    functionName,
    chainId: chain?.id,
    args,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    request: config.request,
    onSuccess(data) {
      console.log("useContractWrite success", data);
    },
    onError(error) {
      console.log("useContractWrite error", error);
    },
  });

  const { data: txData, status } = useWaitForTransaction({
    hash: data?.hash,
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  return { write, txData, status };
};
