import useReadContract from "./useReadContract";
import useWriteContract from "./useWriteContract";
import abiROM from "../contracts/riteOfMoloch.json";

/**
 * @remarks calls `hasRole` function to see if address has admin rights
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery, or string of 'riteOfMolochAddress'. If dynamic, should come from /stake/[address].tsx component
 * @param args takes in user address as prop. index[1] of args array is a hardcoded address for keccak256("ADMIN")
 * @returns Boolean indicating if user is an admin or not
 */
const keccak256 =
  "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42";

const useHasRole = (contractAddress: `0x${string}`, args: string) => {
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

const useAdmins = (contractAddress: string) => {
  const { data: admin1, isLoading: isLoadingAdmin1 } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "admin1"
  );

  const { data: admin2, isLoading: isLoadingAdmin2 } = useReadContract(
    contractAddress as `0x${string}`,
    "riteOfMolochAddress",
    "admin2"
  );

  return {
    admins: [admin1, admin2] as `0x${string}`[],
    isLoading: isLoadingAdmin1 || isLoadingAdmin2,
  };
};

const useMintHatProp = (contractAddress: `0x${string}`, args: string) => {
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
const useTransferHatProp = (
  contractAddress: `0x${string}`,
  args: [`0x${string}`, `0x${string}`]
) => {
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

export { useHasRole, useMintHatProp, useTransferHatProp, useAdmins };
