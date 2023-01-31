import { useContractRead, useNetwork } from "wagmi";
import useAbi from "./useAbi";
import useContractAddress from "./useContractAddress";
import { convertBigNumber } from "../utils/general";

/**
 *
 * @remarks prepare wagmi hook read contract instance
 *
 * @param contractName - pass in contract name
 * @param functionName - pass name of function
 * @param args - option array of args
 *
 * @returns output of contract function
 */

const useReadContract = (
  contractName: string,
  abiName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();

  // let contractAddress = useContractAddress(abiName);
  const abi = useAbi(abiName);
  let output: string;

  const { data } = useContractRead({
    addressOrName: contractName || "0x",
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
    output = convertBigNumber(data);
  } else {
    output = "";
  }

  return { output };
};

export default useReadContract;
