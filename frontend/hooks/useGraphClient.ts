import { getBuiltGraphSDK } from "../.graphclient";

const useGraphClient = () => {
  const graphClient = getBuiltGraphSDK();

  return graphClient;
};

export { useGraphClient };
