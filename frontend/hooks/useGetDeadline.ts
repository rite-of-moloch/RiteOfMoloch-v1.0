import useReadContract from "./useReadContract";
/**
 * @remaks calls getDeadline function or riteOfMoloch address
 *
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args user: address
 * @outputs deadline: (uint256)
 */
export const useGetDeadline = (contractAddress: string, args: [string]) => {
  const { output: deadline } = useReadContract(
    contractAddress,
    "riteOfMolochAddress",
    "getDeadline",
    args
  );

  return deadline;
};
