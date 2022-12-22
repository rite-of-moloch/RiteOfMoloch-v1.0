import useWriteContract from "./useWriteContract";

/**
 *
 * @param args user: user address
 * @outputs (none)
 */

const useJoinInitiation = (args: [string]) => {
  const { write: writeJoinInitiation } = useWriteContract(
    "riteOfMolochAddress",
    "joinInitiation",
    args
  );
  return { writeJoinInitiation };
};

export default useJoinInitiation;
