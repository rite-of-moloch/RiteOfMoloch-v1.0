import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useTransaction,
} from "wagmi";
import useAbi from "./useAbi";
import { useChakraToast } from "@raidguild/design-system";

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
  const abi = useAbi(abiName);
  const toast = useChakraToast();

  const { config } = usePrepareContractWrite({
    address: (contractAddress as `0x${string}`) || "",
    abi,
    functionName,
    args,
    cacheTime: 2_000,
    enabled: Boolean(contractAddress),
  });

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
    hash: (txData?.transactionHash as `0x${string}`) || "0x",
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
    onSuccess(data) {
      console.log("success", data);
      toast({
        status: "success",
        title: `Transaction success! ${data?.hash}`,
        size: "xs",
      });
    },
    onError(err) {
      console.log(err);
      // toast({
      //   status: "error",
      //   title: `Transaction Error... ${err.message}`,
      // });
    },
  });

  console.log(txResponse);

  return { write, txResponse, isLoading, isSuccess, isError };
};

export default useWriteContract;
