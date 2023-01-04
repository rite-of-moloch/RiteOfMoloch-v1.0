import useReadContract from "./useReadContract";
/**
 *
 * @param args user: address
 * @outputs deadline: (uint256)
 */
export const useGetDeadline = (args: [string]): string => {
  const { output: deadline } = useReadContract(
    "riteOfMolochAddress",
    "getDeadline",
    args
  );

  return deadline;
};
