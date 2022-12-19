import useReadContract from "./useReadContract";

/**
 *
 * @outputs uint256
 */
export const useMinimumStake = () => {
  const {
    data: dataMinimumStake,
    isLoading: isLoadingMinimumStake,
    txResponse: respMinimumStake,
  } = useReadContract("riteOfMolochAddress", "minimumStake");
  return { dataMinimumStake, isLoadingMinimumStake, respMinimumStake };
};
