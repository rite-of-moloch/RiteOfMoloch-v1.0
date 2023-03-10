import useWriteContract from "./useWriteContract";

/**
 * @remarks function lets user claim stake only if EOA is member of DAO
 * @param contractAddress ROM address where the user can claim stake
 */
const useClaimStake = (contractAddress: string) => {
  const {
    write: writeClaimStake,
    prepareError: prepareErrorClaimStake,
    isLoading: isLoadingClaimStake,
    isError,
    error: errorClaimStake,
  } = useWriteContract(contractAddress, "riteOfMolochAddress", "claimStake");

  if (isError) {
    console.log(errorClaimStake);
  }

  return {
    writeClaimStake,
    prepareErrorClaimStake,
    isLoadingClaimStake,
    errorClaimStake,
  };
};

export default useClaimStake;
