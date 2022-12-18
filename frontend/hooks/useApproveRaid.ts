import useWriteContract from "./useWriteContract";

/**
 *
 * @param args [spender: address, amount: uint256]
 * @outputs (none)
 */

const useApproveRaid = (args: [string, number]) => {
  const {
    write: writeApproveRaid,
    txData: txDataApprove,
    // status: statusApprove,
  } = useWriteContract("erc20TokenAddress", "approve", args);
  return {
    writeApproveRaid,
    txDataApprove,
    // statusApprove,
  };
};

export default useApproveRaid;
