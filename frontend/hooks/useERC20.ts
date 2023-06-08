import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";
import useWriteContract from "./useWriteContract";

/**
 * @remarks erc20 token address contract must approve the ROM contract to spend the erc20 token amount that gets approved
 * @param contractAddress erc20TokenAddress type. Should be dynamic address from subgraphQuery, comes from /stake/[address].tsx component
 * @param args [_to: address, _value: uint256]. _to is the ROM contract
 * @Returns bool
 */
const useApprove = (contractAddress: string, args: [string, string]) => {
  const {
    write: approve,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWriteContract(contractAddress, "erc20TokenAddress", "approve", args);

  return { approve, isLoadingApprove, isSuccessApprove, isErrorApprove };
};

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

  return data as BigNumber;
};

const useDecimalOf = (contractAddress: `0x${string}`) => {
  const { data, error, isError } = useReadContract(
    contractAddress,
    "erc20TokenAddress",
    "decimals"
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as string;
};

const useSymbol = (contractAddress: `0x${string}`) => {
  const { data, error, isError } = useReadContract(
    contractAddress,
    "erc20TokenAddress",
    "symbol"
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as string;
};

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

export {useApprove, useBalanceOf, useDecimalOf, useSymbol, useGetAllowance};
