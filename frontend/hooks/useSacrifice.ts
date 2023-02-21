import useWriteContract from "./useWriteContract";

/**
 * @remarks function used to call sacrifice function on ROM contract
 * @param contractAddress
 */

const useSacrifice = (contractAddress: string) => {
  const { write: writeSacrifice } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "sacrifice"
  );

  return { writeSacrifice };
};

export default useSacrifice;
