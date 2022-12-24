import useReadContract from "./useReadContract";
/**
 *
 * @param args owner: address
 * @param args spender: address
 * @outputs uint256
 */
export const useGetAllowance = (args: [string, string]): string => {
  const { output: allowance } = useReadContract(
    "erc20TokenAddress",
    "allowance",
    args
  );

  return allowance;
};
