import useReadContract from "./useReadContract";
import useWriteContract from "./useWriteContract";

/**
 * @remarks calls `hasRole` function to see if address has admin rights
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args takes in user address as prop. index[1] of args array is a hardcoded address for keccak256("ADMIN")
 * @returns Boolean indicating if user is an admin or not
 */
const keccak256 =
  "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42";

const useHasRole = (contractAddress: string, args: string) => {
  const { data, error, isError } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "hasRole",
    [args, keccak256]
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as Boolean;
};

const useAdmin1 = (contractAddress: string) => {
    const { data, error, isError } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "admin1",
  );

    if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as string;
}

const useAdmin2 = (contractAddress: string) => {
    const { data, error, isError } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "admin2",
  );

    if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as string;
}

const useMintHatProp = (contractAddress: string, args: string) => {
  const {
    write: writeMintHatProp,
    isLoading: isLoadingMint,
    isError: isErrorMint,
    error,
  } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "mintAdminHatProposal",
    [args]
  );

  if (isErrorMint) {
    console.log(isErrorMint, error);
  }

  return {
    writeMintHatProp,
    isLoadingMint,
    error,
  };
};

/**
 * @remarks function mints HATS admin if <2 exist. To replace admin, instead use hook useTransferdminHatProposal
 * @param contractAddress - ROM address where the user can claim stake
 * @param args1 - _from - address of current admin
 * @param args2 - _to - address of new admin
 */
const useTransferHatProp = (contractAddress: string, args: [string, string]) => {
  const {
    write: writeTransferHatProp,
    isLoading: isLoadingTransfer,
    isError: isErrorTransfer,
    error,
  } = useWriteContract(
    contractAddress,
    "riteOfMolochAddress",
    "transferAdminHatProposal",
    args
  );

  if (isErrorTransfer) {
    console.log(isErrorTransfer, error);
  }

  return {
    writeTransferHatProp,
    isLoadingTransfer,
    error,
  };
};

export {useHasRole, useMintHatProp, useTransferHatProp, useAdmin1, useAdmin2};
