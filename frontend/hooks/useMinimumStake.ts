import { BigNumber } from "ethers";
import { useCohortByAddress } from "./useCohort";

/**
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useMinimumStake = (contractAddress: string) => {
  const { cohort } = useCohortByAddress(contractAddress);

  if (!cohort) {
    console.log(`Cohort at ${contractAddress} not found`);
    return null;
  }

  return cohort.tokenAmount as BigNumber;
};

export default useMinimumStake;
