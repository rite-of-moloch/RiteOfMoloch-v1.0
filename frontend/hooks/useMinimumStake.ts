import useReadContract from "./useReadContract";

/**
 *
 * @outputs uint256
 */
export const useMinimumStake = () => {
  const {
    txResponse: txResponseMinimumStake,
    status: statusMinimumStake,
    output: outputMinimumStake,
  } = useReadContract("riteOfMolochAddress", "minimumStake");

  return { txResponseMinimumStake, statusMinimumStake, outputMinimumStake };
};
