import useReadContract from "./useReadContract";
/**
 *
 * @param args [owner: address]
 * @ outputs: uint256
 */
export const useRiteBalanceOf = (args: [string]) => {
  const { status: statusRiteBalanceOf, output: outputRiteBalanceOf } =
    useReadContract("riteOfMolochAddress", "balanceOf", args);
  return {
    statusRiteBalanceOf,
    outputRiteBalanceOf,
  };
};
