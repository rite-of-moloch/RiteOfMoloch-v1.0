import { useEffect, useState } from "react";
import { useGraphClient } from "./useGraphClient";
import { MetricFragmentFragment } from ".graphclient";

const useMetrics = () => {
  const graphClient = useGraphClient();
  const [metrics, setMetrics] = useState<MetricFragmentFragment>();

  useEffect(() => {
    const getMetric = async () => {
      const query = await graphClient.Metrics();

      if (query.metric) {
        setMetrics(query.metric);
      }
    };
    getMetric();
  }, []);

  return metrics;
};

export default useMetrics;
