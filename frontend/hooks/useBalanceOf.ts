import useWriteContract from "./useWriteContract";

/**
 *
 * @param args account: address
 * @outputs uint256
 *
 */
export const useBalanceOf = (args: [string]) => {
  const {
    write: writeBalanceOf,
    txResponse: txRespBalanceOf,
    output: outputBalanceOf,
  } = useWriteContract("erc20TokenAddress", "balanceOf", args);
  return {
    writeBalanceOf,
    txRespBalanceOf,
    outputBalanceOf,
  };
};
