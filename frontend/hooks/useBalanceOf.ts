import { useWriteContract } from "./useWriteContract";

/**
 *
 * @param args account: address
 * @outputs uint256
 *
 */
export const getBalanceOf = (args: [string]) => {
  const {
    write: writeGetBalanceOf,
    txData: txDataGetBalanceOf,
    status: statusGetBalanceOf,
  } = useWriteContract("erc20TokenAddress", "balanceOf", args);
  return {
    writeGetBalanceOf,
    txDataGetBalanceOf,
    statusGetBalanceOf,
  };
};
