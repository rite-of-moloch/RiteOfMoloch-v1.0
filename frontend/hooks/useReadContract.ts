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
  address: `0x${string}`,
  abi: string,
  functionName: string,
  args?: any
) => {
  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi: useAbi(abi),
    functionName,
    args,
    watch: true,
    enabled: Boolean(address),
  });
  // console.log("error:", error, "isError:", isError);
  // console.log("data:", data);

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
