import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { performQuery } from "../utils/subgraph/helpers";

export const useSubgraphReactQuery = (query: any, enabled: any) => {
  const limit = 8;
  const getData = async () => {
    const results = await performQuery(query);
    const data = results?.data;

    return data;
  };

  /*
  // infinite query
  *
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [query],
    queryFn: () => getData(),
    getNextPageParam: (lastPage, allPages) =>
      Object.keys(lastPage).length === 0
        ? undefined
        : allPages.flat().length / limit,
    enabled: enabled ? true : false,
  });
  */

  const { data, isLoading, error } = useQuery({
    queryKey: [query],
    queryFn: () => getData(),
    enabled: enabled ? true : false,
  });

  console.log(data);

  return { data, isLoading, error };
};
