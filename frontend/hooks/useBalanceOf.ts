import useReadContract from "./useReadContract";
/**
 * @param contractAddress Should be dynamic address from subgraphQuery from /stake/[address].tsx component
 * @param args account: address
 * @outputs uint256
 *
 */
const useBalanceOf = (contractAddress: string, args: [string]): string => {
  const { output: balanceOf } = useReadContract(
    contractAddress,
    "erc20TokenAddress",
    "balanceOf",
    args
  );

  if (!balanceOf) return "0";
  else return balanceOf;
};

export default useBalanceOf;
