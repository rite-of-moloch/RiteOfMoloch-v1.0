import { useContractRead } from "wagmi";
import useAbi from "./useAbi";
import { convertBigNumber } from "utils/general";
import { TxHash } from "utils/types/TxHash";
// import { TxHash } from "utils/types/TxHash";

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
  contractAddress: `0x${string}`,
  abiName: string,
  functionName: string,
  args?: any
) => {
  const { data, error, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: useAbi(abiName),
    functionName,
    args,
    enabled: Boolean(contractAddress),
    onError(err) {
      console.log("err:", err);
    },
  });
  console.log("error:", error, "isError:", isError);
  console.log("data:", data);

  // let output;
  // if (typeof data === "boolean") {
  //   output = data;
  //   return output;
  // } else if (data) {
  //   //TODO is forced type casting correct?
  //   output = convertBigNumber(data as TxHash);
  // } else if (!data) {
  //   output = "";
  // }

  return { data, error, isError, isLoading };
};

export default useReadContract;
