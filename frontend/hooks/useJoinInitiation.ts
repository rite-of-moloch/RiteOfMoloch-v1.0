import useWriteContract from "./useWriteContract";

/**
 * @param contractAddress should be dynamic address from subgraphQuery from /stake/[address].tsx component
 * @param args [user address]
 */

const useJoinInitiation = (contractAddress: string, args: [string]) => {
  const {
    write: writeJoinInitiation,
    isLoading: isLoadingStake,
    isSuccess: isSuccessStake,
    isError: isErrorStake,
  } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "joinInitiation",
    args
  );

  return { writeJoinInitiation, isLoadingStake, isSuccessStake, isErrorStake };
};

export default useJoinInitiation;
