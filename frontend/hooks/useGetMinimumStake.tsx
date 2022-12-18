import useReadContract from "./useReadContract";
/**
 *
 * @outputs uint256
 */
export const useGetMinimumStake = () => {
  const { data: dataMinimumStake, isLoading: isLoadingMinimumStake } =
    useReadContract("riteOfMolochAddress", "minimumStake");
  return { dataMinimumStake, isLoadingMinimumStake };
};
