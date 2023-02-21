import useReadContract from "./useReadContract";
/**
 * @remarks calls `hasRole` function to see if address has admin rights
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args takes in user address as prop. index[1] of args array is a hardcoded address for keccak256("ADMIN")
 * @returns Boolean indicating if user is an admin or not
 */

const keccak256 =
  "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42";

const useHasRole = (contractAddress: string, args: string) => {
  const { data, error, isError } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "hasRole",
    [args, keccak256]
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as Boolean;
};

export default useHasRole;
