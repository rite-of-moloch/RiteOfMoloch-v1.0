import useReadContract from "./useReadContract";
/**
 * @remarks calls `isMember` function to see if EOA is member of DAO
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args user address
 * @returns Boolean
 */

const useIsMember = (contractAddress: string, args: [string]) => {
  const { data, error, isError } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "isMember",
    args
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as Boolean;
};

export default useIsMember;
