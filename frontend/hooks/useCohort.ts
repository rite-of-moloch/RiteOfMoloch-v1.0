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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCohorts = async () => {
      setIsLoading(true);
      const cohorts = await graphClient.Cohorts();

      setCohorts(cohorts.cohorts);
      setIsLoading(false);
    };
    getCohorts();
  }, []);

  return {cohorts, isLoading};
};

/**
 * @remarks returns name of cohort
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useCohortByAddress = (cohortAddress: string) => {
  const graphClient = useGraphClient();
  const [cohort, setCohort] = useState<CohortFragmentFragment>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCohort = async () => {
      setIsLoading(true);
      const cohort = await graphClient.CohortDataByAddress({
        address: cohortAddress?.toLowerCase(),
      });

      if (cohort) {
        setCohort(cohort.cohorts[0]);
      }
      setIsLoading(false);
    };
    getCohort();
  }, [cohortAddress]);

  return { isLoading, cohort };
};

/**
 * @remarks returns name of cohort
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useCohortByID = (id: string) => {
  const graphClient = useGraphClient();
  const [cohort, setCohort] = useState<CohortFragmentFragment>();

  useEffect(() => {
    const getCohort = async () => {
      const cohort = await graphClient.CohortById({
        id,
      });

      if (cohort.cohort) {
        setCohort(cohort.cohort);
      }
    };
    getCohort();
  }, []);

  return cohort;
};


export {useCohorts, useCohortByAddress, useCohortByID};
