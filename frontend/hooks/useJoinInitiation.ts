import useWriteContract from "./useWriteContract";

/**
 *
 * @param args user: user address
 * @outputs (none)
 */

export const useJoinInitiation = (args: [string]) => {
  const { write: writeJoinInitiation } = useWriteContract(
    "riteOfMolochAddress",
    "joinInitiation",
    args
  );

  return { writeJoinInitiation };
};
