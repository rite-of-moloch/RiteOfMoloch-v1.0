import useWriteContract from "./useWriteContract";
/**
 *
 * @param args owner: address
 * @param args spender: address
 * @outputs uint256
 */
export const useGetAllowance = (args: [string, string]) => {
  const {
    write: writeAllowance,
    txResponse: txRespAllowance,
    output: outputAllowance,
  } = useWriteContract("erc20TokenAddress", "allowance", args);

  return {
    writeAllowance,
    txRespAllowance,
    outputAllowance,
  };
};
