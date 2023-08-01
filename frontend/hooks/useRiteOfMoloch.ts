import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";
import useWriteContract from "./useWriteContract";

/**
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args [owner: address]
 * @returns: uint256
 */
const useRiteBalanceOf = (contractAddress: `0x${string}`, args: [string]) => {
  const { data, isLoading, error, isError } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "balanceOf",
    args
  );

  return {
    riteBalance: data ? BigNumber.from(data) : undefined,
    isLoading,
    error,
    isError,
  };
};

/**
 * @remarks calls `isMember` function to see if EOA is member of DAO
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args user address
 * @returns Boolean
 */
const useIsMember = (contractAddress: `0x${string}`, args: [string]) => {
  const { data, isLoading, error, isError } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "isMember",
    args
  );

  return { isMember: data as boolean, isLoading, error, isError };
};

/**
 * @remarks function used to call sacrifice function on ROM contract
 * @param contractAddress
 */
const useSlaughter = (contractAddress: `0x${string}`, args: [string]) => {
  const {
    write: writeSlaughter,
    isError,
    error: errorSlaughter,
    prepareError: prepareErrorSlaughter,
  } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "slaughter",
    args
  );

  if (isError) {
    console.log(errorSlaughter);
  }

  return { writeSlaughter, prepareErrorSlaughter, errorSlaughter, isError };
};

/**
 * @remarks function used to call sacrifice function on ROM contract
 * @param contractAddress
 */
const useSacrifice = (contractAddress: `0x${string}`) => {
  const {
    write: writeSacrifice,
    isError,
    error: errorSacrifice,
    prepareError: prepareErrorSacrifice,
  } = useWriteContract(contractAddress, "riteOfMolochAddress", "sacrifice");

  if (isError) {
    console.log(errorSacrifice);
  }

  return { writeSacrifice, prepareErrorSacrifice, errorSacrifice, isError };
};

export { useRiteBalanceOf, useIsMember, useSlaughter, useSacrifice };
