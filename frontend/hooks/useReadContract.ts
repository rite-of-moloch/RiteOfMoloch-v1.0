import { useContractRead, useNetwork } from "wagmi";
import useAbi from "./useAbi";
import useContractAddress from "./useContractAddress";
import { convertBigNumber } from "utils/general";

/**
 *
 * @param contractName - pass in contract name
 * @param functionName - pass name of function
 * @param args - option array of args
 */

const useReadContract = (
  contractName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();

  let contractAddress = useContractAddress(contractName);
  const abi = useAbi(contractName);
  let output: string;

  const { data } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName,
    args,
    chainId: chain?.id,
    onError(err) {
      console.log(err);
    },
  });

  if (typeof data === "boolean") {
    return data;
  } else if (data) {
    output = convertBigNumber(data || "0");
  } else {
    output = "";
  }

  return { output };
};

export default useReadContract;
