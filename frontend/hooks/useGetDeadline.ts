import useReadContract from "./useReadContract";
/**
 *
 * @param args user: address
 * @outputs deadline: (uint256)
 * @returns
 */
export const useGetDeadline = (args: [string]) => {
  const { status: statusGetDeadline, output: outputGetDeadline } =
    useReadContract("riteOfMolochAddress", "getDeadline", args);
  return { statusGetDeadline, outputGetDeadline };
};
