import { useEffect, useState } from "react";
import { useGraphClient } from "./useGraphClient";
import { InitiateDetailsFragment } from ".graphclient";

const useInitiates = (cohortAddress: string) => {
  const graphClient = useGraphClient();
  const [initiates, setInitiates] = useState<InitiateDetailsFragment[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCohort = async () => {
      setIsLoading(true);
      //todo fix address when graph synced
      const initiates = await graphClient.InitiatesByCohortId({
        id: `gnosis-${cohortAddress}`,
      });

      if (initiates.initiates) {
        setInitiates(initiates.initiates);
      }
      setIsLoading(false);
    };
    getCohort();
  }, [cohortAddress]);

  return { initiates, isLoading };
};

export default useInitiates;
