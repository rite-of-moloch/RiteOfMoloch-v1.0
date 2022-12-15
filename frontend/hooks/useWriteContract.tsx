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

  const { config, error } = usePrepareContractWrite({
    addressOrName: address || "",
    contractInterface: abi,
    functionName,
    chainId: chain?.id,
    args,
    onSuccess(data) {
      console.log("usePrepareContractWrite Success", data);
    },
    onError(err) {
      console.log("usePrepareContractWrite error", err);
    },
  });

  const { data, write } = useContractWrite({
    ...config,
    request: config.request,
    onSuccess(data) {
      console.log("useContractWrite success", data);
    },
    onError(error) {
      console.log("useContractWrite error", error);
    },
  });

  const {
    data: txData,
    isLoading,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
    onError(error) {
      console.log("Error", error);
    },
  });

  // console.log(isSuccess);

  return { write, txData, isLoading, isSuccess };
};
