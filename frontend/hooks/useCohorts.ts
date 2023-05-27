import { useEffect, useState } from "react";
import { useGraphClient } from "./useGraphClient";
import { CohortFragmentFragment } from ".graphclient";

/**
 * @remarks returns name of cohort
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useCohorts = () => {
  const graphClient = useGraphClient();
  const [cohorts, setCohorts] = useState<CohortFragmentFragment[]>([]);

  useEffect(() => {
    const getCohorts = async () => {
      //todo fix address when graph synced
      const cohorts = await graphClient.Cohorts();

      setCohorts(cohorts.cohorts);
    };
    getCohorts();
  }, []);

  return cohorts;
};

export default useCohorts;
