import useReadContract from "./useReadContract";
/**
 *
 * @param args [owner: address]
 * @ outputs: uint256
 */
export const useRiteBalanceOf = (args: [string]) => {
  const { output: riteBalanceOf } = useReadContract(
    "riteOfMolochAddress",
    "balanceOf",
    args
  );
  return {
    riteBalanceOf,
  };
};
