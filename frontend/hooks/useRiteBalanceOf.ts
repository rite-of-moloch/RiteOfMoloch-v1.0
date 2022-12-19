import useWriteContract from "./useWriteContract";
/**
 *
 * @param args [owner: address]
 * @ outputs: uint256
 */
export const useRiteBalanceOf = (args: [string]) => {
  const { write: writeRiteBalanceOf, txResponse: txRespRiteBalanceOf } =
    useWriteContract("riteOfMolochAddress", "balanceOf", args);
  return {
    writeRiteBalanceOf,
    txRespRiteBalanceOf,
  };
};
