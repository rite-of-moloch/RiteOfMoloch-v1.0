import useWriteContract from "./useWriteContract";

/**
 * @remarks function used to call sacrifice function on ROM contract
 * @param contractAddress
 */

const useSacrifice = (contractAddress: string) => {
  const {
    write: writeSacrifice,
    isError,
    error: errorSacrifice,
    prepareError: prepareErrorSacrifice,
  } = useWriteContract(contractAddress, "riteOfMolochAddress", "sacrifice");

  if (isError) {
    console.log(errorSacrifice);
  }

  return { writeSacrifice, prepareErrorSacrifice, errorSacrifice, isError };
};

export default useSacrifice;
