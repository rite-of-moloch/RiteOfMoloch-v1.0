import useWriteContract from "./useWriteContract";

/**
 *
 * @param args [spender: address, amount: uint256]
 * @outputs (none)
 */

const useApproveRaid = (args: [string, number]) => {
  const { write: writeApproveRaid } = useWriteContract(
    "erc20TokenAddress",
    "approve",
    args
  );
  return {
    writeApproveRaid,
  };
};

export default useApproveRaid;
