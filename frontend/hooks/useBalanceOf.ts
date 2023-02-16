import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";
/**
 * @param contractAddress Should be dynamic address from subgraphQuery from /stake/[address].tsx component
 * @param args account: address
 * @outputs uint256
 *
 */
const useBalanceOf = (contractAddress: `0x${string}`, args: [string]) => {
  const { data, error, isError } = useReadContract(
    contractAddress,
    "erc20TokenAddress",
    "balanceOf",
    args
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  // console.log("balanceOf", data);

  return data as BigNumber;
};

export default useBalanceOf;
