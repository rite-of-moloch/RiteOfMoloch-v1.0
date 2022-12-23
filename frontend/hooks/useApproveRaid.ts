import useWriteContract from "./useWriteContract";

/**
 *
 * @param args spender: address,
 * @param args amount: uint256
 * @outputs (none)
 */

export const useApproveRaid = (args: [string, number]) => {
  const { write: writeApproveRaid } = useWriteContract(
    "erc20TokenAddress",
    "approve",
    args
  );

  return {
    writeApproveRaid,
  };
};
