import useReadContract from "./useReadContract";
/**
 * @param contractAddress Should be dynamic address from subgraphQuery from /stake/[address].tsx component from erc20TokenAddress abi
 * @outputs string of symbol
 */
const useTokenSymbol = (contractAddress: string): string => {
  const { output: tokenSymbol } = useReadContract(
    contractAddress,
    "erc20TokenAddress",
    "symbol"
  );

  console.log("tokenSymbol", tokenSymbol);

  return tokenSymbol;
};

export default useTokenSymbol;
