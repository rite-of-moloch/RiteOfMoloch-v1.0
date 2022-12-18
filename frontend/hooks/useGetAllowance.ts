import useWriteContract from "./useWriteContract";
/**
 *
 * @param args [owner: address, spender: address]
 * @outputs uint256
 */
const useGetAllowance = (args: [string, string]) => {
  const {
    write: writeAllowance,
    txData: txDataAllowance,
    // status,
  } = useWriteContract("erc20TokenAddress", "allowance", args);
  return {
    writeAllowance,
    txDataAllowance,
    // status,
  };
};

export default useGetAllowance;
