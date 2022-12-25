import useReadContract from "./useReadContract";
/**
 *
 * @param args user: address
 * @outputs deadline: bool
 */
const useIsMember = (args: [string]): boolean => {
  const data = useReadContract("riteOfMolochAddress", "isMember", args);

  return Boolean(data);
};

export default useIsMember;
