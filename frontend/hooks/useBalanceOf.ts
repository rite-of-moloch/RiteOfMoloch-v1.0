import useWriteContract from "./useWriteContract";

/**
 *
 * @param args account: address
 * @outputs uint256
 *
 */
const useBalanceOf = (args: [string]) => {
  const {
    write: writeBalanceOf,
    txData: txDataBalanceOf,
    txResponse: txRespBalanceOf,
  } = useWriteContract("erc20TokenAddress", "balanceOf", args);
  return {
    writeBalanceOf,
    txRespBalanceOf,
  };
};

export default useBalanceOf;
