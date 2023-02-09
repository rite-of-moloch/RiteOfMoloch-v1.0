import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useTransaction,
} from "wagmi";
import useAbi from "./useAbi";
import { useCustomToast } from "@raidguild/design-system";

/**
 * @remarks hook to prepare wagmi hook contract instances
 *
 * @param contractAddress - pass in contract name. If contract name is 'riteOfMolochAddress', value should be passed in dynaically from URL query in stake/[address].tsx component. If this address is not a valid cohort, contractAddress will be `riteOfMolochAddress`, which then gets passed into useContractAddress hook and gets RaidGuild default values
 * @param functionName - pass name of function
 * @param args - array of arguments to be passed into smart contract function
 * @returns
 */

const useWriteContract = (
  contractAddress: string,
  abiName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();
  const abi = useAbi(abiName);
  const toast = useCustomToast();

  console.log("address:", contractAddress);

  const { config, error } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName,
    chainId: chain?.id,
    args,
    cacheTime: 2_000,
    enabled: Boolean(contractAddress),
  });
  console.log("error", error);
  console.log("config", config);

  const { data, write } = useContractWrite({
    ...config,
    request: config.request,
    onSuccess(data) {
      console.log("data", data);
    },
    onError(err) {
      console.log("err:", err);
    },
  });

  console.log("data", data, "write", write);

  const {
    data: txData,
    isLoading,
    isSuccess,
    isError,
  } = useWaitForTransaction({
    enabled: Boolean(data),
    hash: data?.hash,
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log(data);
    },
  });

  const { data: txResponse } = useTransaction({
    enabled: Boolean(txData),
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
      console.log(err);
      toast.success({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  console.log(txResponse);

  return { write, txResponse, isLoading, isSuccess, isError };
};

export default useWriteContract;
