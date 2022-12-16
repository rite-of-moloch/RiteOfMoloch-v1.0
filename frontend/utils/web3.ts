import { BigNumber, utils } from "ethers";
import { useWriteContract } from "hooks/useWriteContract";

/**
 *
 * @param args spender: address
 * @param args amount: uint256
 * @outputs (none)
 */
export const approveRaid = (args: [string, number]) => {
  const { write, txData, status } = useWriteContract(
    "erc20TokenAddress",
    "approve",
    args
  );
  return { write, txData, status };
};

/**
 *
 * write function
 *
 * @param args user: address
 * @outputs (none)
 */
export const joinInitiation = (args: [string]) => {
  const { write, txData, status } = useWriteContract(
    "riteOfMolochAddress",
    "joinInitiation",
    args
  );
  return { write, txData, status };
};

/**
 *
 * @param args account: address
 * @outputs uint256
 *
 * erc20TokenAddress
 */
export const getBalanceOf = (args: [string]) => {
  const { write, txData, status } = useWriteContract(
    "erc20TokenAddress",
    "balanceOf",
    args
  );
  return { write, txData, status };
};

/**
 *
 * read function
 *
 * @outputs uint256
 */
export const getMinimumStake = () => {
  const { write, txData, status } = useWriteContract(
    "riteOfMolochAddress",
    "minimumStake"
  );
  return { write, txData, status };
};

/**
 *
 * read function
 *
 * @param args user: address
 * @outputs deadline: (uint256)
 * @returns
 */
export const getStakeDeadline = (args: [string]) => {
  const { write, txData, status } = useWriteContract(
    "riteOfMolochAddress",
    "getDeadline",
    args
  );
  return { write, txData, status };
};

/**
 *
 * @param args owner: address
 * @param args spender: address
 * @outputs uint256
 * @returns write function, tx data, tx status
 */
export const getAllowance = (args: [string, string]) => {
  const { write, txData, status } = useWriteContract(
    "erc20TokenAddress",
    "allowance",
    args
  );
  return { write, txData, status };
};

/**
 *
 * @param args owner: address
 * @ outputs: uint256
 *
 * riteOfMolochAddress
 */
export const getRiteBalance = (args: [string]) => {
  const { write, txData, status } = useWriteContract(
    "riteOfMolochAddress",
    "balanceOf",
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
