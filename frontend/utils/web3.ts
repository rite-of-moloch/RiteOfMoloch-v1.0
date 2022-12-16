import { BigNumber, utils } from "ethers";
import { useWriteContract } from "hooks/useWriteContract";

/**
 *
 * @param args [address, to, address]
 * @returns
 */
export const approveRaid = (args: string[]) => {
  const { write, txData, status } = useWriteContract(
    "riteOfMolochAddress",
    "approve",
    args
  );
  return { write, txData, status };
};

/**
 *
 * @param args [address, user, address]
 * @returns
 */
export const joinInitiation = (args: string[]) => {
  const { write, txData, status } = useWriteContract(
    "riteOfMolochAddress",
    "joinInitiation",
    args
  );
  return { write, txData, status };
};

/**
 *
 * @param args [address, account, address]
 * @returns
 *
 * erc20TokenAddress
 */
export const getBalanceOf = (args: string[]) => {
  const { write, txData, status } = useWriteContract(
    "erc20TokenAddress",
    "balanceOf",
    args
  );
  return { write, txData, status };
};

/**
 *
 * @param args [address, owner, address]
 * @returns
 *
 * erc20TokenAddress
 */
export const getRiteBalance = (args: string[]) => {
  const { write, txData, status } = useWriteContract(
    "riteOfMolochAddress",
    "balanceOf",
    args
  );
  return { write, txData, status };
};

export const getMinimumStake = () => {
  const { write, txData, status } = useWriteContract(
    "riteOfMolochAddress",
    "minimumStake"
  );
  return { write, txData, status };
};

/**
 *
 * @param args [address, user, address]
 * @returns
 */
export const getStakeDeadline = (args: string[]) => {
  const { write, txData, status } = useWriteContract(
    "riteOfMolochAddress",
    "getDeadline",
    args
  );
  return { write, txData, status };
};

/**
 *
 * @param args [address, owner, address],[address, spender, address]
 * @returns write function, tx data, tx status
 */
export const getAllowance = (args: string[]) => {
  const { write, txData, status } = useWriteContract(
    "erc20TokenAddress",
    "allowance",
    args
  );
  return { write, txData, status };
};

export const canStake = (
  allowance: BigNumber,
  minimumStake: BigNumber,
  raidBalance: BigNumber,
  cohortAddress: string
): void => {
  utils.formatUnits(allowance, "ether") >=
    utils.formatUnits(minimumStake, "ether") &&
    utils.formatUnits(raidBalance, "ether") >=
      utils.formatUnits(minimumStake, "ether") &&
    !utils.isAddress(cohortAddress);
};
