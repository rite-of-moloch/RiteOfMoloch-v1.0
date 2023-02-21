import useReadContract from "./useReadContract";

/**
 * @remarks returns name of cohort
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useCohortName = (contractAddress: string) => {
  const { data, error, isError } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "cohortName"
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data;
};

export default useCohortName;
