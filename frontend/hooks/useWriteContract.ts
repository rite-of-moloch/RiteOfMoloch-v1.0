import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import useContractAddress from "./useContractAddress";
import abiERC20 from "../contracts/erc20TokenAddress.json";
import useAbi from "./useAbi";

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

  const contractAddress = useContractAddress(contractName);

  const abi = useAbi(contractName);

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: abi || abiERC20,
    functionName,
    chainId: chain?.id,
    args,
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

export default useWriteContract;
