import { useWriteContract } from "./useWriteContract";

/**
 *
 * @param args user: address
 * @outputs (none)
 */

export const joinInitiation = (args: [string]) => {
  const {
    write: writeJoinInitiation,
    txData: txDataJoinInitiation,
    status: statusJoinInitiation,
  } = useWriteContract("riteOfMolochAddress", "joinInitiation", args);
  return {
    writeJoinInitiation,
    txDataJoinInitiation,
    statusJoinInitiation,
  };
};
