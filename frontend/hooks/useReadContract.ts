import { useContractRead, useNetwork } from "wagmi";
import useAbi from "./useAbi";
// import useContractAddress from "./useContractAddress";
import { convertBigNumber } from "../utils/general";

/**
 *
 * @remarks prepare wagmi hook read contract instance
 *
 * @param contractAddress - pass in contract name
 * @param abi - name of abi
 * @param functionName - pass name of function
 * @param args - option array of args
 *
 * @returns output of contract function
 */

const useReadContract = (
  contractAddress: string,
  abiName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();
  const abi = useAbi(abiName);
  let output: any;

  const { data } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName,
    args,
    chainId: chain?.id,
    enabled: Boolean(contractAddress),
    onError(err) {
      // console.log(err);
    },
  });

  console.log(contractAddress, abiName, functionName, "data", data);
  console.log("data", data);

  if (typeof data === "boolean" || typeof data === "string") {
    output = data;
  } else output = "";
  // else if (data) output = convertBigNumber(data);

  return { output };
};

export default useReadContract;
