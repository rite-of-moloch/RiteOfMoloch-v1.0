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

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: abi || abiERC20,
    functionName,
    chainId: chain?.id,
    args,
  });

  const {
    data,
    write,
    status: initStatus,
  } = useContractWrite({
    ...config,
    request: config.request,
    // onSuccess(data) {
    //   toast.success({
    //     status: "loading",
    //     title: `Pending transaction...`,
    //   });
    // },
    onError(err) {
      toast.error({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  const { data: txData, status } = useWaitForTransaction({
    hash: data?.hash,
    onError(error) {
      // console.log("Error", error);
    },
    onSuccess(data) {
      // console.log("Success", data);
    },
  });

  const {
    data: txResponse,
    isError,
    isLoading,
  } = useTransaction({
    hash: (txData?.transactionHash as `0x${string}`) || "",
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
    onSuccess(data) {
      toast.success({
        status: "success",
        title: `Transaction success!`,
      });
    },
    onError(err) {
      toast.success({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  console.log("txResponse", txResponse);

  /**
   * txResponse?.value is output
   */
  return { write, txData, status, txResponse };
};

export default useWriteContract;
