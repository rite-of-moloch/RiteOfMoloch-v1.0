import { useGraphClient } from "./useGraphClient";
import { useQuery } from "@tanstack/react-query";

const useMetrics = () => {
  const graphClient = useGraphClient();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ["metrics"],
    queryFn: async () => graphClient.Metrics(),
    refetchInterval: 5000,
  });

  return { metrics, isLoading };
};

export default useMetrics;
