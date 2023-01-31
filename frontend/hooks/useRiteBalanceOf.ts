import useReadContract from "./useReadContract";
/**
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args [owner: address]
 * @returns: uint256
 */
const useRiteBalanceOf = (contractAddress: string, args: [string]): string => {
  const { output: riteBalance } = useReadContract(
    contractAddress,
    "riteOfMolochAddress",
    "balanceOf",
    args
  );

  return riteBalance;
};

export default useRiteBalanceOf;
