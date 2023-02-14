import useReadContract from "./useReadContract";
/**
 * @param contractAddress Should be dynamic address from subgraphQuery from /stake/[address].tsx component from erc20TokenAddress abi
 * @outputs string of symbol
 */
const useTokenSymbol = (contractAddress: string | undefined) => {
  const { data, error, isError, isLoading } = useReadContract(
    contractAddress as `0x${string}`,
    "erc20TokenAddress",
    "symbol"
  );

  console.log(data);

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  console.log("tokenSymbol", data);

  return data as string;
};

export default useTokenSymbol;
