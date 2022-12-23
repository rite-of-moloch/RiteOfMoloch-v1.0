import useReadContract from "./useReadContract";
/**
 *
 * @param args user: address
 * @outputs deadline: (uint256)
 */
export const useGetDeadline = (args: [string]) => {
  const { output: getDeadline } = useReadContract(
    "riteOfMolochAddress",
    "getDeadline",
    args
  );
  return getDeadline;
};
