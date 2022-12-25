import useReadContract from "./useReadContract";
/**
 *
 * @param args [owner: address]
 * @ outputs: uint256
 */
export const useRiteBalanceOf = (args: [string]): string => {
  const { output: riteBalance } = useReadContract(
    "riteOfMolochAddress",
    "balanceOf",
    args
  );

  return riteBalance;
};
