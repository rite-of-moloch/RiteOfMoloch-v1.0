import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";

/**
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useMinimumStake = (contractAddress: string) => {
  const { data, error, isError, isLoading } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "minimumStake"
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as BigNumber;
};

export default useMinimumStake;
