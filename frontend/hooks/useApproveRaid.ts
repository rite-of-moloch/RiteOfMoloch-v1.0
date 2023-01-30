import useWriteContract from "./useWriteContract";

/**
 *
 * @param contractAddress erc20TokenAddress type. Should be dynamic address from subgraphQuery, or string of 'erc20TokenAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args [_to: address, _value: uint256]
 * @Returns bool
 */

const useApproveRaid = (contractAddress: string, args: [string, string]) => {
  const {
    write: approveRaid,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWriteContract(contractAddress, "erc20TokenAddress", "approve", args);

  return { approveRaid, isLoadingApprove, isSuccessApprove, isErrorApprove };
};

export default useApproveRaid;
