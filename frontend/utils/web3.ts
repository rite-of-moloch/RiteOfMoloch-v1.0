import { BigNumber, utils } from "ethers";

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

// value: BigNumber
// _hex: "0x00",
// _isBigNumber: true,
export const convertBigNumber = (bigNumber: number): number => {
  if (typeof bigNumber !== "number") return 0;
  return Number(bigNumber.toString());
};
