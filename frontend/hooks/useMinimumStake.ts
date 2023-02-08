import useReadContract from "./useReadContract";

/**
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useMinimumStake = (contractAddress: string): string => {
  const { output: minimumStake } = useReadContract(
    contractAddress,
    "riteOfMolochAddress",
    "minimumStake"
  );

  return minimumStake;
};

export default useMinimumStake;
