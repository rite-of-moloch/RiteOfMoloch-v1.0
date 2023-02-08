import { useContractRead, useNetwork } from "wagmi";
import useAbi from "./useAbi";
import { convertBigNumber } from "utils/general";

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
  let output: string;

  const { data, isError, isLoading } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName,
    args,
    chainId: chain?.id,
    enabled: Boolean(contractAddress) && Boolean(abiName),
    onError(err) {
      console.log("err:", err);
    },
  });

  // console.log("data, isError, isLoading", data, isError, isLoading);

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
