import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSubgraphQuery = (query: string) => {
  const subgraphEndpoint =
    "https://api.studio.thegraph.com/query/40280/rom-test/v0.0.15";

  const fetchSubgraphData = async () => {
    try {
      const resp = await axios.post(subgraphEndpoint, {
        query,
      });
      // console.log(resp.data.data);
      return resp.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, error } = useQuery([query], fetchSubgraphData);

  if (isLoading) {
    return console.log("query is loading...");
  }

  console.log("data", data.data);

  return { data, isLoading };
};
