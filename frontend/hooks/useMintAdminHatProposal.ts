import useWriteContract from "./useWriteContract";

/**
 * @remarks function mints HATS admin if <2 exist. To replace admin, instead use hook useTransferdminHatProposal
 * @param contractAddress - ROM address where the user can claim stake
 * @param args - address of new admin
 */
const useMintAdminHatProposal = (contractAddress: string, args: [string]) => {
  const {
    write: writeMintAdminHatProposal,
    prepareError: prepareErrorMintAdminHatProposal,
    isLoading: isLoadingMintAdminHatProposal,
    isError,
    error: errorMintAdminHatProposal,
  } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "mintAdminHatProposal"
  );

  if (isError) {
    console.log(errorMintAdminHatProposal);
  }

  return {
    writeMintAdminHatProposal,
    prepareErrorMintAdminHatProposal,
    isLoadingMintAdminHatProposal,
    errorMintAdminHatProposal,
  };
};

export default useMintAdminHatProposal;
