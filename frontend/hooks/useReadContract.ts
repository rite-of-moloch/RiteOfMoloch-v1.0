import { useContractRead, useNetwork } from "wagmi";
import useAbi from "./useAbi";
import useContractAddress from "./useContractAddress";

/**
 *
 * @param contractName - pass in contract name
 * @param functionName - pass name of function
 * @param args - option array of args
 * @returns
 */

const useReadContract = (
  contractName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();
  let contractAddress = useContractAddress(contractName);

  const abi = useAbi(contractName);

  const { data, isLoading } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName,
    args,
    chainId: chain?.id,
    onSuccess(data) {
      console.log("useContractRead success", data);
    },
    onError(err) {
      console.log("useContractRead Error", err);
    },
  });

  return { data, isLoading };
};

export default useReadContract;
