import { useEffect, useState } from "react";
import { useGraphClient } from "./useGraphClient";
import { CohortFragmentFragment } from ".graphclient";

/**
 * @remarks returns name of cohort
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useCohortByAddress = (cohortAddress: string) => {
  const graphClient = useGraphClient();
  const [cohort, setCohort] = useState<CohortFragmentFragment>();

  useEffect(() => {
    const getCohort = async () => {
      //todo fix address when graph synced
      const cohort = await graphClient.CohortDataByAddress({
        address: cohortAddress.toLowerCase(),
      });

      if (cohort) {
        setCohort(cohort.cohorts[0]);
      }
    };
    getCohort();
  }, [cohortAddress]);

  return cohort;
};

export default useCohortByAddress;
