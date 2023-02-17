import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";
/**
 * @remarks calls `allowance` function on token contract
 *
 * @param contractAddress Should be dynamic address from subgraphQuery from /stake/[address].tsx component
 * @param args [_owner: address, _spender: address]
 * @outputs uint256 (string)
 */
const useGetAllowance = (
  contractAddress: `0x${string}`,
  args: [string, string]
) => {
  const { data, error, isError, isLoading } = useReadContract(
    contractAddress,
    "erc20TokenAddress",
    "allowance",
    args
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as BigNumber;
};

export default useGetAllowance;
