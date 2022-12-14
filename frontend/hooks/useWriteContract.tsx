import React from "react";
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
  const { chain } = useNetwork();

  const address: string = CONTRACT_ADDRESSES?.[chain?.id]?.[contractName];

  const { config, error } = usePrepareContractWrite({
    address,
    abi,
    functionName,
    args,
  });

  const { data, write } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log("Success", data);
      return data;
    },
    onError(error) {
      console.log("Error", error);
      return error;
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { write, isLoading, isSuccess };
};
