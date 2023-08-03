import { useContractRead } from "wagmi";
import useAbi from "./useAbi";

/**
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
    enabled: !!address,
  });

  return { data, error, isError, isLoading };
};

export default useReadContract;
