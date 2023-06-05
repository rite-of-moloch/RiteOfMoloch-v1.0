import { BigNumber } from "ethers";
import useCohort from "./useCohortByAddress";

/**
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useMinimumStake = (contractAddress: string) => {
  const { cohort } = useCohort(contractAddress);

  if (!cohort) {
    console.log(`Cohort at ${contractAddress} not found`);
    return null;
  }

  return cohort.tokenAmount as BigNumber;
};

export default useMinimumStake;
