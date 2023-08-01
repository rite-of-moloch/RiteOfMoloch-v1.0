import { useGraphClient } from "./useGraphClient";
import { useQuery } from "@tanstack/react-query";

const useInitiates = () => {
  const graphClient = useGraphClient();

  const { data: initiates, isLoading } = useQuery({
    queryKey: ["initiates"],
    queryFn: async () => await graphClient.Initiates(),
    refetchInterval: 5000,
  });

  return { initiates, isLoading };
};

const useInitiatesByCohort = (cohortAddress: string) => {
  const graphClient = useGraphClient();

  const { data: initiates, isLoading } = useQuery({
    queryKey: ["initiatesByCohort", cohortAddress],
    queryFn: async () =>
      await graphClient.InitiatesByCohortId({
        id: `gnosis-${cohortAddress}`,
      }),
    enabled: !!cohortAddress,
    refetchInterval: 5000,
  });

  return { initiates, isLoading };
};

export { useInitiates, useInitiatesByCohort };
