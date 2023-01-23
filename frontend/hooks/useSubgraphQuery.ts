import { useState, useEffect } from "react";
import { performQuery } from "../utils/subgraph/helpers";

/// @param query: a GraphQL compliant query string. (SEE /utils/subraph/queries.ts for examples.)
/// @return { data, isLoading, error}
/// @return data: data object returned by the query.
/// @return isLoading: boolean determining whether a query is pending.
/// @return error: boolean determining whether the query or the fetch resulted in an error.

export function useSubgraphQuery(query: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const queryPromise = performQuery(query);

    setIsLoading(true);

    queryPromise
      .then((json) => {
        // abort if query has returned errors
        if (json.errors != undefined) {
          setData(null);
          setIsLoading(false);
          setError(true);
          return;
        }

        setData(json.data);
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
}

export function useSubgraphPaginatedData(
  queryBuilder: () => string,
  itemsPerPage: number
) {}
