import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSubgraphQuery = (query: string) => {
  const subgraphEndpoint =
    "https://api.studio.thegraph.com/query/40280/rom-test/v0.0.17";

  const { data, isLoading } = useQuery([query], () =>
    axios.post(subgraphEndpoint, { query })
  );

  if (isLoading) {
    console.log("query is loading...");
  }

  return { data, isLoading };
};
