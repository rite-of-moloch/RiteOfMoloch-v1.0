import { useReadContract } from "./useReadContract";
/**
 *
 * @param args user: address
 * @outputs deadline: (uint256)
 * @returns
 */
const useGetDeadline = (args: [string]) => {
  const { data: dataGetDeadline, isLoading: isLoadingGetDeadline } =
    useReadContract("riteOfMolochAddress", "getDeadline", args);
  return { dataGetDeadline, isLoadingGetDeadline };
};
