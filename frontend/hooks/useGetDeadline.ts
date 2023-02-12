import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";
/**
 * @remaks calls getDeadline function or riteOfMoloch address
 *
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args user: address
 * @outputs deadline: (uint256)
 */
export const useGetDeadline = (contractAddress: string, args: [string]) => {
  const { data, error, isError, isLoading } = useReadContract(
    (contractAddress as `0x${string}`) || "0x",
    "riteOfMolochAddress",
    "getDeadline",
    args
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as BigNumber;
};
