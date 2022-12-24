import useReadContract from "./useReadContract";

/**
 *
 * @outputs uint256
 */
export const useMinimumStake = (): string => {
  const { output: minimumStake } = useReadContract(
    "riteOfMolochAddress",
    "minimumStake"
  );

  return minimumStake;
};
