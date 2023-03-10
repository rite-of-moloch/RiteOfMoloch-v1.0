import useWriteContract from "./useWriteContract";

/**
 * @remarks prepareError returns an object containing a message for why a 'prepare transaction' fails. Can extract the error message from here and use it for error handling
 * @param contractAddress should be dynamic address from subgraphQuery from /stake/[address].tsx component
 * @param args [user address]
 */

const useJoinInitiation = (contractAddress: string, args: [string]) => {
  const {
    write: writeJoinInitiation,
    prepareError: prepareErrorJoinInitiation,
    isLoading: isLoadingStake,
    isSuccess: isSuccessStake,
    isError: isErrorStake,
    error: errorJoinInitiation,
  } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "joinInitiation",
    args
  );

  if (isErrorStake) {
    console.log(errorJoinInitiation);
  }

  return {
    writeJoinInitiation,
    prepareErrorJoinInitiation,
    isLoadingStake,
    isSuccessStake,
    isErrorStake,
    errorJoinInitiation,
  };
};

export default useJoinInitiation;
