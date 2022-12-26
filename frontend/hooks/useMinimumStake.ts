import useReadContract from "./useReadContract";

/**
 *
 * @outputs uint256
 */
const useMinimumStake = (): string => {
  const { output: minimumStake } = useReadContract(
    "riteOfMolochAddress",
    "minimumStake"
  );

  return minimumStake;
};

export default useMinimumStake;
