import { TxHash } from "./types/TxHash";
import { BigNumber, utils } from "ethers";

export const truncateAddress = (address: string): string =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

export const convertBigNumber = (data: TxHash): string => {
  return data.toString();
};

export const canStake = (
  allowance: string,
  minimumStake: string,
  balanceOf: string,
  initiateAddress: string,
  willSponsor: boolean
): boolean => {
  let format = utils.formatEther;
  let canStakeLogic =
    format(allowance) >= format(minimumStake) &&
    format(balanceOf) >= format(minimumStake);
  let willSponsorlogic = willSponsor
    ? canStakeLogic
    : canStakeLogic && utils.isAddress(initiateAddress);
  if (willSponsor) return willSponsorlogic;
  else return canStakeLogic;
};

export const stakeTooltip = (
  willSponsor: boolean,
  initiateAddress: string,
  balanceOf: string,
  allowance: string,
  minimumStake: string
): string | null => {
  let label: string = "";
  if (willSponsor) {
    if (!utils.isAddress(initiateAddress)) {
      label = "Please input a valid wallet address";
    } else if (utils.formatEther(allowance) < utils.formatEther(minimumStake)) {
      label =
        "You must approve the contract to spend your balance before you can stake";
    } else if (utils.formatEther(balanceOf) < utils.formatEther(minimumStake)) {
      label = "Your RAID balance is too low";
    }
  } else if (!willSponsor) {
    if (utils.formatEther(balanceOf) < utils.formatEther(minimumStake)) {
      label = "Your RAID balance is too low";
    } else if (utils.formatEther(allowance) < utils.formatEther(minimumStake)) {
      label =
        "Allowance is smaller than the minimum stake amount. Please approve allowance.";
    }
  } else return null;
  return label;
};

export const approveTooltip = (
  allowance: string,
  minimumStake: string,
  balanceOf: string,
  tokenSymbol: string
): string | null => {
  let label: string = "";
  if (utils.formatEther(balanceOf) < utils.formatEther(minimumStake)) {
    label = "Your RAID balance is too low";
  } else if (utils.formatEther(allowance) < utils.formatEther(minimumStake)) {
    label = `Approve contract to spend your ${tokenSymbol}`;
  } else {
    // label = `Approve contract to use ${tokenSymbol}`;
    return null;
  }
  return label;
};

/**
 *
 * @param createdAt
 * @param time
 * @returns unix strring
 */
export const getDeadline = (
  createdAt: string | undefined,
  time: string | undefined
): string => {
  let deadline = (Number(createdAt) * 1000 + Number(time) * 1000).toString();

  return deadline;
};

export const unixToUTC = (unix: string): string => {
  const utc = new Date(Number(unix));
  const localDate = utc.toLocaleDateString();
  return localDate;
};

export const getHasRite = (riteBalance: BigNumber | null): boolean => {
  let rites = Number(riteBalance);
  if (rites > 0) {
    return true;
  } else if (rites === 0 || !rites) {
    return false;
  } else {
    return false;
  }
};
