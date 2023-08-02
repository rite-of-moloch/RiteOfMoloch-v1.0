import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useTransaction,
} from "wagmi";
import useAbi from "./useAbi";
import { useChakraToast } from "@raidguild/design-system";
import { BigNumber, BigNumberish } from "ethers";

/**
 * @remarks hook to prepare wagmi hook contract instances
 * @remarks prepareError returns an object containing a message for why a 'prepare transaction' fails. Can extract the error message from here and use it for error handling
 *
 * @param contractAddress - pass in contract name. If contract name is 'riteOfMolochAddress', value should be passed in dynaically from URL query in stake/[address].tsx component. If this address is not a valid cohort, contractAddress will be `riteOfMolochAddress`, which then gets passed into useContractAddress hook and gets RaidGuild default values
 * @param functionName - pass name of function
 * @param args - array of arguments to be passed into smart contract function
 * @returns
 */

const useWriteContract = (
  contractAddress: `0x${string}`,
  abiName: string,
  functionName: string,
  args?: any,
  msgValue?: BigNumberish
) => {
  const abi = useAbi(abiName);
  const toast = useChakraToast();

  const { config, error: prepareError } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName,
    args,
    cacheTime: 2_000,
    enabled: !!contractAddress && !!abi,
    overrides: {
      value: msgValue ? BigNumber.from(msgValue) : undefined,
    },
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
    error,
  } = useWaitForTransaction({
    enabled: !!data,
    hash: data?.hash,
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log(data);
    },
  });

  const { data: txResponse } = useTransaction({
    enabled: !!txData,
    hash: (txData?.transactionHash as `0x${string}`) || "0x",
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
    onSuccess(data) {
      console.log("success", data);
    },
    onError(err) {
      console.log(err);
      toast({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  return {
    write,
    prepareError,
    txResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useWriteContract;
