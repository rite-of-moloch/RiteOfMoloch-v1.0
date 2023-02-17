import useWriteContract from "./useWriteContract";

/**
 * @remarks function lets user claim stake only if EOA is member of DAO
 * @param contractAddress ROM address where the user can claim stake
 */
const useClaimStake = (contractAddress: string) => {
  const {
    write: writeClaimStake,
    isLoading: isLoadingClaimStake,
    isError,
  } = useWriteContract(contractAddress, "riteOfMolochAddress", "claimStake");

  if (isError) {
    console.log(isError);
  }

  return { writeClaimStake, isLoadingClaimStake };
};

export default useClaimStake;
