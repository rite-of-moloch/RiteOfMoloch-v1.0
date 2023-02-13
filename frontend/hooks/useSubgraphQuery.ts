import { useQuery } from "@tanstack/react-query";
import { performQuery } from "../utils/subgraph/helpers";

export const useSubgraphQuery = (query: string, enabled: Boolean) => {
  const getData = async (): Promise<any> => {
    const results = await performQuery(query);
    const data = results?.data;
    return data;
  };

  const { data, isLoading, error } = useQuery([query], getData, {
    enabled: true,
  });

  return { data, isLoading, error };
};
