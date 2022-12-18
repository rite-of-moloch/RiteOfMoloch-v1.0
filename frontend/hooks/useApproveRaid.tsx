import useWriteContract from "./useWriteContract";

/**
 *
 * @param args [spender: address, amount: uint256]
 * @outputs (none)
 */

export const useApproveRaid = (args: [string, number]) => {
  const {
    write: writeApprove,
    txData: txDataApprove,
    status: statusApprove,
  } = useWriteContract("erc20TokenAddress", "approve", args);
  return {
    writeApprove,
    txDataApprove,
    statusApprove,
  };
};
