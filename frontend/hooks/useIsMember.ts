import useReadContract from "./useReadContract";
/**
 *
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args address
 * @returns Boolean
 */

const useIsMember = (contractAddress: string, args: [string]): string => {
  const { output: isMember } = useReadContract(
    contractAddress,
    "riteOfMolochAddress",
    "isMember",
    args
  );

  return isMember;
};

export default useIsMember;
