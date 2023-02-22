import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSubgraphQuery = (query: string) => {
  const subgraphEndpoint =
    "https://api.studio.thegraph.com/query/40280/rom-test/v0.0.15";

  // const fetchSubgraphData = async () => {
  //   await axios
  //     .post(subgraphEndpoint, {
  //       query,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       return res;
  //     });
  // };

  const { data, isLoading } = useQuery([query], () =>
    axios.post(subgraphEndpoint, { query })
  );

  if (isLoading) {
    console.log("query is loading...");
  }

  // console.log("data", data);

  return { data, isLoading };
};
