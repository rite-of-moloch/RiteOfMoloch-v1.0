import useWriteContract from "./useWriteContract";
/**
 *
 * @param args [owner: address, spender: address]
 * @outputs uint256
 */
export const useGetAllowance = (args: [string, string]) => {
  const {
    write: writeAllowance,
    txData: txDataAllowance,
    status: statusTxDataAllowance,
  } = useWriteContract("erc20TokenAddress", "allowance", args);
  return {
    writeAllowance,
    txDataAllowance,
    statusTxDataAllowance,
  };
};
