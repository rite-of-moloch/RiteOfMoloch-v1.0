import useReadContract from "./useReadContract";
/**
 *
 * @param args _owner: address
 * @param args _spender: address
 * @outputs uint256 (string)
 */
const useGetAllowance = (args: [string, string]): string => {
  const { output: allowance } = useReadContract(
    "erc20TokenAddress",
    "allowance",
    args
  );

  if (allowance) return allowance;
  else return "0";
};

export default useGetAllowance;
