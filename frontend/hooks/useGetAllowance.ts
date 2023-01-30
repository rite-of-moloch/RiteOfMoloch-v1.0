import useReadContract from "./useReadContract";
/**
 * @remarks calls `allowance` function on token contract
 *
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'erc20TokenAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args [_owner: address, _spender: address]
 * @outputs uint256 (string)
 */
const useGetAllowance = (
  contractAddress: string,
  args: [string, string]
): string => {
  const { output: allowance } = useReadContract(
    contractAddress,
    "allowance",
    args
  );

  if (allowance) return allowance;
  else return "0";
};

export default useGetAllowance;
