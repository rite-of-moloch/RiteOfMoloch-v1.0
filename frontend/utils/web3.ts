import { BigNumber, utils } from "ethers";
import { useWriteContract } from "hooks/useWriteContract";
import { useReadContract } from "hooks/useReadContract";

// /**
//  *
//  * @param args spender: address
//  * @param args amount: uint256
//  * @outputs (none)
//  */
// export const approveRaid = (args: [string, number]) => {
//   const { write, txData, status } = useWriteContract(
//     "erc20TokenAddress",
//     "approve",
//     args
//   );
//   return { write, txData, status };
// };

// /**
//  *
//  * @param args user: address
//  * @outputs (none)
//  */
// export const joinInitiation = (args: [string]) => {
//   const { write, txData, status } = useWriteContract(
//     "riteOfMolochAddress",
//     "joinInitiation",
//     args
//   );
//   return { write, txData, status };
// };

// /**
//  *
//  * @param args account: address
//  * @outputs uint256
//  *
//  */
// export const getBalanceOf = (args: [string]) => {
//   const { write, txData, status } = useWriteContract(
//     "erc20TokenAddress",
//     "balanceOf",
//     args
//   );
//   return { write, txData, status };
// };

// /**
//  *
//  * @outputs uint256
//  */
// export const minimumStake = () => {
//   const { data, isLoading } = useReadContract(
//     "riteOfMolochAddress",
//     "minimumStake"
//   );
//   return { data, isLoading };
// };

// /**
//  *
//  * @param args user: address
//  * @outputs deadline: (uint256)
//  * @returns
//  */
// export const getStakeDeadline = (args: [string]) => {
//   const { data, isLoading } = useReadContract(
//     "riteOfMolochAddress",
//     "getDeadline",
//     args
//   );
//   return { data, isLoading };
// };

// /**
//  *
//  * @param args owner: address
//  * @param args spender: address
//  * @outputs uint256
//  */
// export const getAllowance = (args: [string, string]) => {
//   const { write, txData, status } = useWriteContract(
//     "erc20TokenAddress",
//     "allowance",
//     args
//   );
//   return { write, txData, status };
// };

// /**
//  *
//  * @param args owner: address
//  * @ outputs: uint256
//  */
// export const getRiteBalance = (args: [string]) => {
//   const { write, txData, status } = useWriteContract(
//     "riteOfMolochAddress",
//     "balanceOf",
//     args
//   );
//   return { write, txData, status };
// };

export const canStake = (
  allowance: BigNumber,
  minimumStake: BigNumber,
  raidBalance: BigNumber,
  cohortAddress: string
): void => {
  const format = utils.formatUnits;
  format(allowance, "ether") >= format(minimumStake, "ether") &&
    format(raidBalance, "ether") >= format(minimumStake, "ether") &&
    !utils.isAddress(cohortAddress);
};
