import { useQuery } from "react-query";
import { performQuery } from "../utils/subgraph/helpers";

export const useSubgraphReactQuery = (query: any, enabled: boolean) => {
  const getData = async () => {
    const queryPromise = await performQuery(query);

    console.log(queryPromise);

    // queryPromise.then((resp) => {
    //   console.log(resp);
    //   return resp;
    // });
  };

  console.log(getData());

  // const { data, isLoading, error } = useQuery({
  //   queryKey: [query],
  //   queryFn: () => getData,
  //   enabled,
  // });
  // return { data, isLoading, error };
};
