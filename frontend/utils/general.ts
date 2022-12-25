import { TxHash } from "./types/TxHash";
import { utils } from "ethers";

export const truncateAddress = (address: string): string =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

export const convertBigNumber = (data: TxHash): string => {
  return data.toString();
};

export const stakeTooltipLabel = (
  willSponsor: boolean,
  initiateAddress: string,
  allowance: string,
  minimumStake: string
): string | null => {
  if (willSponsor) {
    return !utils.isAddress(initiateAddress)
      ? "Please input a valid wallet address"
      : utils.formatEther(allowance) < utils.formatEther(minimumStake)
      ? "Allowance is smaller than the minimum stake amount."
      : "Your RAID balance is too low";
  }
  return null;
};
