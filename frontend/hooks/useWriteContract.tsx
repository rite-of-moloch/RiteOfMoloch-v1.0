import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../contracts/erc20TokenAddress.json";
import { CONTRACT_ADDRESSES } from "utils/constants";
import { TransactionDescription } from "ethers/lib/utils";

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
  const address: string = CONTRACT_ADDRESSES?.[chain?.id]?.[contractName];

  const {
    config,
    error,
    // isSuccess: prepareSuccess,
  } = usePrepareContractWrite({
    addressOrName: address || "",
    contractInterface: abi,
    functionName,
    chainId: chain?.id,
    args,
  });

  const { data, write } = useContractWrite({
    ...config,
    request: config.request,
    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
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
