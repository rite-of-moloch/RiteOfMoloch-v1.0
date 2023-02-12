import useReadContract from "./useReadContract";
/**
 *
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args address
 * @returns Boolean
 */

const useIsMember = (contractAddress: string, args: [string]) => {
  const { data, error, isError, isLoading } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "isMember",
    args
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as Boolean;
};

export default useIsMember;
