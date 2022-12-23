import useReadContract from "./useReadContract";

/**
 *
 * @outputs uint256
 */
export const useMinimumStake = () => {
  const { status: statusMinimumStake, output: outputMinimumStake } =
    useReadContract("riteOfMolochAddress", "minimumStake");
  return { statusMinimumStake, outputMinimumStake };
};
