import useReadContract from "./useReadContract";

/**
 *
 * @outputs uint256
 */
const useMinimumShare = (): string => {
  const { output: useMinimumShare } = useReadContract(
    "riteOfMolochAddress",
    "minimumStake"
  );

  return useMinimumShare;
};

export default useMinimumShare;
