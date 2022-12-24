import useWriteContract from "./useWriteContract";

/**
 *
 * @param args _to: address,
 * @param args _Value: uint256
 */

export const useApproveRaid = (
  args: [string, string]
): Function | undefined => {
  const { write: approveRaid } = useWriteContract(
    "erc20TokenAddress",
    "approve",
    args
  );

  return approveRaid;
};
