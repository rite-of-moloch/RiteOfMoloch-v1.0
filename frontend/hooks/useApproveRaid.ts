import useWriteContract from "./useWriteContract";
/**
 * @remarks erc20 token address contract must approve the ROM contract to spend the erc20 token amount that gets approved
 * @param contractAddress erc20TokenAddress type. Should be dynamic address from subgraphQuery, comes from /stake/[address].tsx component
 * @param args [_to: address, _value: uint256]. _to is the ROM contract
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
