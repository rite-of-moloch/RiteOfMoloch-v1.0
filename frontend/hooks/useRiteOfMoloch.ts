import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";
import useWriteContract from "./useWriteContract";

/**
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args [owner: address]
 * @returns: uint256
 */
const useRiteBalanceOf = (contractAddress: string, args: [string]) => {
  const { data, error, isError } = useReadContract(
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

/**
 * @remarks calls `isMember` function to see if EOA is member of DAO
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args user address
 * @returns Boolean
 */
const useIsMember = (contractAddress: string, args: [string]) => {
  const { data, error, isError } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "isMember",
    args
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as Boolean;
};

/**
 * @remarks prepareError returns an object containing a message for why a 'prepare transaction' fails. Can extract the error message from here and use it for error handling
 * @param contractAddress should be dynamic address from subgraphQuery from /stake/[address].tsx component
 * @param args [user address]
 */
const useJoinInitiation = (contractAddress: string, args: [string]) => {
  const {
    write: writeJoinInitiation,
    isLoading: isLoadingStake,
    isError: isErrorStake,
    error: errorJoinInitiation,
  } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "joinInitiation",
    args
  );

  if (isErrorStake) {
    console.log(errorJoinInitiation);
  }

  return {
    writeJoinInitiation,
    isLoadingStake,
  };
};

/**
 * @remarks function lets user claim stake only if EOA is member of DAO
 * @param contractAddress ROM address where the user can claim stake
 */
const useClaimStake = (contractAddress: string) => {
  const {
    write: writeClaimStake,
    prepareError: prepareErrorClaimStake,
    isLoading: isLoadingClaimStake,
    isError,
    error: errorClaimStake,
  } = useWriteContract(contractAddress, "riteOfMolochAddress", "claimStake");

  if (isError) {
    console.log(errorClaimStake);
  }

  return {
    writeClaimStake,
    prepareErrorClaimStake,
    isLoadingClaimStake,
    errorClaimStake,
  };
};

/**
 * @remarks function used to call sacrifice function on ROM contract
 * @param contractAddress
 */
const useSlaughter = (contractAddress: string, args: string) => {
  const {
    write: writeSlaughter,
    isError,
    error: errorSlaughter,
    prepareError: prepareErrorSlaughter,
  } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "slaughter",
    [args]
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
const useSacrifice = (contractAddress: string) => {
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


export {useRiteBalanceOf, useIsMember, useJoinInitiation, useClaimStake, useSlaughter, useSacrifice};
