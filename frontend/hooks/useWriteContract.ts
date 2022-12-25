import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useTransaction,
} from "wagmi";
import useContractAddress from "./useContractAddress";
import abiERC20 from "../contracts/erc20TokenAddress.json";
import useAbi from "./useAbi";
import { useCustomToast } from "@raidguild/design-system";

/**
 *
 * @param contractName - pass in contract name
 * @param functionName - pass name of function
 * @param args - option array of args
 * @returns
 */

const useWriteContract = (
  contractName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();
  const toast = useCustomToast();
  const contractAddress = useContractAddress(contractName);
  const abi = useAbi(contractName);
  // let output: string;

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: abi || abiERC20,
    functionName,
    chainId: chain?.id,
    args,
    cacheTime: 2_000,
  });

  const { data, write } = useContractWrite({
    ...config,
    request: config.request,
    onError(err) {
      toast.error({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  const {
    data: txData,
    isLoading,
    isSuccess,
    isError,
  } = useWaitForTransaction({
    hash: data?.hash,
    onError(error) {
      console.log("Error", error);
    },
  });

  const { data: txResponse } = useTransaction({
    hash: (txData?.transactionHash as `0x${string}`) || "",
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
    onSuccess(data) {
      console.log("success", data);
      toast.success({
        status: "success",
        title: `Transaction success! ${data?.hash}`,
        size: "base",
      });
    },
    onError(err) {
      toast.success({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  return { write, txResponse, isLoading, isSuccess, isError };
};

export default useWriteContract;
