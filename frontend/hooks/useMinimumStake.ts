import useReadContract from "./useReadContract";

/**
 *
 * @outputs uint256
 */
export const useMinimumStake = () => {
  const { data: dataMinimumStake, txResponse: respMinimumStake } =
    useReadContract("riteOfMolochAddress", "minimumStake");
  return { dataMinimumStake, respMinimumStake };
};
