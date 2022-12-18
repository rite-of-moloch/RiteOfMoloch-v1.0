import useWriteContract from "./useWriteContract";
/**
 *
 * @param args [owner: address]
 * @ outputs: uint256
 */
export const useRiteBalanceOf = (args: [string]) => {
  const {
    write: writeRiteBalanceOf,
    txData: txDataRiteBalanceOf,
    status: statusRiteBalanceOf,
  } = useWriteContract("riteOfMolochAddress", "balanceOf", args);
  return {
    writeRiteBalanceOf,
    txDataRiteBalanceOf,
    statusRiteBalanceOf,
  };
};
