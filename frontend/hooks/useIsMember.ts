import useReadContract from "./useReadContract";
/**
 *
 * @param args user: address
 * @outputs deadline: bool
 */
const useIsMember = (args: [string]): boolean => {
  const data = useReadContract("riteOfMolochAddress", "isMember", args);
  console.log(data);

  return Boolean(data);
};

export default useIsMember;
