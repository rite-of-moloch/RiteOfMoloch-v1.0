import { useEffect, useState } from "react";
import { useGraphClient } from "./useGraphClient";
import { CohortFragmentFragment } from ".graphclient";
import { useQuery } from "@tanstack/react-query";
import { isAddress } from "ethers/lib/utils.js";

/**
 * @remarks returns name of cohort
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useCohorts = () => {
  const graphClient = useGraphClient();

  const { data: cohorts, isLoading } = useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => graphClient.Cohorts(),
    refetchInterval: 5000,
  });

  return { cohorts, isLoading };
};

/**
 * @remarks returns name of cohort
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useCohortByAddress = (cohortAddress: string) => {
  const graphClient = useGraphClient();

  const { data: cohorts, isLoading } = useQuery({
    queryKey: ["cohortByAddress", cohortAddress],
    queryFn: async () =>
      graphClient.CohortDataByAddress({ address: cohortAddress }),
    enabled: !!cohortAddress,
    refetchInterval: 5000,
  });

  return { isLoading, cohorts };
};

/**
 * @remarks returns name of cohort
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useCohortByID = (id: string) => {
  const graphClient = useGraphClient();
  const { data: cohorts, isLoading } = useQuery({
    queryKey: ["cohortById", id],
    queryFn: async () =>
      await graphClient.CohortById({
        id,
      }),
    enabled: !!id,
    refetchInterval: 5000,
  });

  return { isLoading, cohorts };
};

export { useCohorts, useCohortByAddress, useCohortByID };
