import { TxHash } from "./types/TxHash";
import { utils } from "ethers";

export const convertBigNumber = (txHash: TxHash): string => {
  return txHash.toString();
};

export const canStake = (
  allowance: string,
  minimumStake: string,
  balanceOf: string,
  cohortAddress: string
): boolean => {
  return (
    utils.formatEther(allowance) >= utils.formatEther(minimumStake) &&
    utils.formatEther(balanceOf) >= utils.formatEther(minimumStake) &&
    !utils.isAddress(cohortAddress)
  );
};

export const stakeTooltipLabel = (
  willSponsor: boolean,
  cohortAddress: string,
  allowance: string,
  minimumStake: string
): string | null => {
  if (willSponsor) {
    return !utils.isAddress(cohortAddress)
      ? "Please input a valid wallet address"
      : utils.formatEther(allowance) < utils.formatEther(minimumStake)
      ? "Allowance is smaller than the minimum stake amount."
      : "Your RAID balance is too low";
  }
  return null;
};
