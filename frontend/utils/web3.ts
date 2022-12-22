import { BigNumber, utils } from "ethers";
import { TxHash } from "./types";

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

export const convertBigNumber = (txHash: TxHash | undefined): number => {
  const value = txHash?.value?._hex;
  if (typeof value !== "number") return 0;
  return Number(BigNumber.from(value));
};
