import {
  QueryFunction,
  QueryFunctionContext,
  // useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { performQuery } from "../utils/subgraph/helpers";

export const useSubgraphReactQuery = (query: string, enabled: Boolean) => {
  const getData = async () => {
    const results = await performQuery(query);
    const data = results?.data;
    return data;
  };

  /*
  // const limit = 8;
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
    queryFn: (context: QueryFunctionContext): Promise<any> => getData(),
    enabled,
  });

  // console.log(data);

  return { data, isLoading, error };
};
