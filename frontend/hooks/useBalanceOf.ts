import useReadContract from "./useReadContract";
/**
 *
 * @param args account: address
 * @outputs uint256
 *
 */
export const useBalanceOf = (args: [string]): string => {
  const { output: balanceOf } = useReadContract(
    "erc20TokenAddress",
    "balanceOf",
    args
  );

  console.log("balanceOf:", balanceOf);
  if (!balanceOf) return "0";
  else return balanceOf;
};
