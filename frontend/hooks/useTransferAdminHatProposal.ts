import useWriteContract from "./useWriteContract";

/**
 * @remarks function mints HATS admin if <2 exist. To replace admin, instead use hook useTransferdminHatProposal
 * @param contractAddress - ROM address where the user can claim stake
 * @param args1 - _from - address of current admin
 * @param args2 - _to - address of new admin
 */
const useTransferAdminHatProposal = (
  contractAddress: string,
  args: [string, string]
) => {
  const {
    write: writeTransferAdminHatProposal,
    // prepareError: prepareErrorTransferAdminHatProposal,
    isLoading: isLoadingTransferAdminHatProposal,
    isError,
    error: errorTransferAdminHatProposal,
  } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "transferAdminHatProposal"
  );

  if (isError) {
    console.log(errorTransferAdminHatProposal);
  }

  return {
    writeTransferAdminHatProposal,
    isLoadingTransferAdminHatProposal,
    errorTransferAdminHatProposal,
  };
};

export default useTransferAdminHatProposal;
