import useReadContract from "./useReadContract";

/**
 *
 * @outputs uint256
 */
export const useMinimumStake = () => {
  const { output: minimumStake } = useReadContract(
    "riteOfMolochAddress",
    "minimumStake"
  );

  return minimumStake;
};
