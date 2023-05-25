import { useEffect, useState } from "react";
import { useGraphClient } from "./useGraphClient";
import { InitiateDetailsFragment } from ".graphclient";

const useInitiates = (cohortAddress: string) => {
  const graphClient = useGraphClient();
  const [initiates, setInitiates] = useState<InitiateDetailsFragment[]>();

  useEffect(() => {
    const getCohort = async () => {
      //todo fix address when graph synced
      const initiates = await graphClient.InitiatesByCohortId({
        id: `gnosis-${cohortAddress}`,
      });

      if (initiates.initiates) {
        setInitiates(initiates.initiates);
      }
    };
    getCohort();
  }, [cohortAddress]);

  return initiates;
};

export default useInitiates;
