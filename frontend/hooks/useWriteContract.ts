import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useTransaction,
} from "wagmi";
import useContractAddress from "./useContractAddress";
import useAbi from "./useAbi";
import { useCustomToast } from "@raidguild/design-system";

/**
 * @remarks hook to prepare wagmi hook contract instances
 *
 * @param contractName - pass in contract name. If contract name is 'riteOfMolochAddress', value should be passed in dynaically from URL query in stake/[address].tsx component. If this address is not a valid cohort, contractName will be `riteOfMolochAddress`, which then gets passed into useContractAddress hook and gets RaidGuild default values
 * @param functionName - pass name of function
 * @param args - array of arguments to be passed into smart contract function
 * @returns
 */

const useWriteContract = (
  contractName: string,
  abiName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();
  const toast = useCustomToast();
  const contractAddress = useContractAddress(contractName);
  const abi = useAbi(abiName);

  const { config } = usePrepareContractWrite({
    addressOrName: contractName || contractAddress,
    contractInterface: abi,
    functionName,
    chainId: chain?.id,
    args,
    cacheTime: 2_000,
  });

  const { data, write } = useContractWrite({
    ...config,
    request: config.request,
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });

  // console.log(data);

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
    onSuccess(data) {
      console.log(data);
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
