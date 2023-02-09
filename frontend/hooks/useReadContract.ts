import { useContractRead } from "wagmi";
import useAbi from "./useAbi";
import { convertBigNumber } from "utils/general";
import { TxHash } from "utils/types/TxHash";

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
  let output;

  const { data, isError, isLoading } = useContractRead({
    addressOrName: contractAddress || "",
    contractInterface: useAbi(abiName),
    functionName,
    args,
    enabled: Boolean(contractAddress),
    onError(err) {
      console.log("err:", err);
    },
  });

  console.log("data:", data);

  if (typeof data === "boolean") {
    output = data;
    return output;
  } else if (data) {
    output = convertBigNumber(data);
  } else if (!data) {
    output = "";
  }

  return { output };
};

export default useReadContract;
