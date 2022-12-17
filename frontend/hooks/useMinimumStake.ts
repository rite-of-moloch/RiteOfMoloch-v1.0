import { useReadContract } from "./useReadContract";

/**
 *
 * @outputs uint256
 */
const useMinimumStake = () => {
  const { data: dataMinimumStake, isLoading: isLoadingMinimumStake } =
    useReadContract("riteOfMolochAddress", "minimumStake");
  return { dataMinimumStake, isLoadingMinimumStake };
};
