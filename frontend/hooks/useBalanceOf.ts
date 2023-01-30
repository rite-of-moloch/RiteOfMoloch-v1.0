import useReadContract from "./useReadContract";
/**
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'erc20TokenAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args account: address
 * @outputs uint256
 *
 */
const useBalanceOf = (contractAddress: string, args: [string]): string => {
  const { output: balanceOf } = useReadContract(
    contractAddress,
    "balanceOf",
    args
  );

  if (!balanceOf) return "0";
  else return balanceOf;
};

export default useBalanceOf;
