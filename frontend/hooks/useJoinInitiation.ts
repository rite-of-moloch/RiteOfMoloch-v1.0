import useWriteContract from "./useWriteContract";

/**
 * @param address DAO contract address
 * @param args user: user address
 */

const useJoinInitiation = (args: [string]) => {
  const {
    write: writeJoinInitiation,
    isLoading: isLoadingStake,
    isSuccess: isSuccessStake,
    isError: isErrorStake,
  } = useWriteContract("riteOfMolochAddress", "joinInitiation", args);

  return { writeJoinInitiation, isLoadingStake, isSuccessStake, isErrorStake };
};

export default useJoinInitiation;
