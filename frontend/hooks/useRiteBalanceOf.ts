import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";
/**
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args [owner: address]
 * @returns: uint256
 */
const useRiteBalanceOf = (contractAddress: string, args: [string]) => {
  const { data, error, isError, isLoading } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "balanceOf",
    args
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as BigNumber;
};

export default useRiteBalanceOf;
