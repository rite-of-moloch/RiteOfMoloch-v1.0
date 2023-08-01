import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";


/**
 * @param contractAddress Should be dynamic address from subgraphQuery from /stake/[address].tsx component
 * @param args account: address
 * @outputs uint256
 *
 */
const useBalanceOf = (
  contractAddress: `0x${string}`,
  args: [string | `0x${string}`]
) => {
  const { data, isLoading, error, isError } = useReadContract(
    contractAddress,
    "erc20TokenAddress",
    "balanceOf",
    args
  );

  return {
    balanceOf: data ? BigNumber.from(data) : undefined,
    isLoading,
    error,
    isError,
  };
};

const useDecimalOf = (contractAddress: `0x${string}`) => {
  const { data, isLoading, error, isError } = useReadContract(
    contractAddress,
    "erc20TokenAddress",
    "decimals"
  );

  return {
    decimals: data ? BigNumber.from(data) : undefined,
    isLoading,
    error,
    isError,
  };
};

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

  return { tokenSymbol: data as string, isLoading, error, isError };
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

  return {
    allowance: data ? BigNumber.from(data) : undefined,
    isLoading,
    error,
    isError,
  };
};

export {
  useBalanceOf,
  useDecimalOf,
  useTokenSymbol,
  useGetAllowance,
};
