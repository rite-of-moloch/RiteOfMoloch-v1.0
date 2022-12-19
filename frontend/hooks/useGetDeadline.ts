import useReadContract from "./useReadContract";
/**
 *
 * @param args user: address
 * @outputs deadline: (uint256)
 * @returns
 */
export const useGetDeadline = (args: [string]) => {
  const { data: dataGetDeadline, txResponse: txRespGetDeadline } =
    useReadContract("riteOfMolochAddress", "getDeadline", args);
  return { dataGetDeadline, txRespGetDeadline };
};
