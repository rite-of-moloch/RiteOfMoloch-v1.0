import useWriteContract from "./useWriteContract";
/**
 *
 * @param args [owner: address, spender: address]
 * @outputs uint256
 */
const useGetAllowance = (args: [string, string]) => {
  const { write: writeAllowance, txResponse: txRespAllowance } =
    useWriteContract("erc20TokenAddress", "allowance", args);
  return {
    writeAllowance,
    txRespAllowance,
  };
};

export default useGetAllowance;
