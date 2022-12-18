import useWriteContract from "./useWriteContract";

/**
 *
 * @param args user: address
 * @outputs (none)
 */

export const useJoinInitiation = (args: [string]) => {
  const {
    write: writeJoinInitiation,
    txData: txDataJoinInitiation,
    // status
  } = useWriteContract("riteOfMolochAddress", "joinInitiation", args);
  return {
    writeJoinInitiation,
    txDataJoinInitiation,
    // status
  };
};
