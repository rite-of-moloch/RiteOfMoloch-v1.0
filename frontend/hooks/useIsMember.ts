import useReadContract from "./useReadContract";
/**
 *
 * @param args address
 * @returns Boolean
 */

const useIsMember = (args: [string]): string => {
  const { output: isMember } = useReadContract(
    "riteOfMolochAddress",
    "isMember",
    args
  );

  return isMember;
};

export default useIsMember;
