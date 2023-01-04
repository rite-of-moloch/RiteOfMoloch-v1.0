import useWriteContract from "./useWriteContract";

/**
 *
 * @param args _to: address,
 * @param args _Value: uint256
 * @Returns bool
 */

const useApproveRaid = (args: [string, string]) => {
  const {
    write: approveRaid,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWriteContract("erc20TokenAddress", "approve", args);

  return { approveRaid, isLoadingApprove, isSuccessApprove, isErrorApprove };
};

export default useApproveRaid;
