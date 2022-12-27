import { TxHash } from "./types/TxHash";
import { utils } from "ethers";

export const truncateAddress = (address: string): string =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

export const convertBigNumber = (data: TxHash): string => {
  return data.toString();
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
        "Allowance is smaller than the minimum stake amount. Please approve allowance.";
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
  balanceOf: string
): string | null => {
  let label: string = "";
  if (utils.formatEther(balanceOf) < utils.formatEther(minimumStake)) {
    label = "Your RAID balance is too low";
  } else if (utils.formatEther(allowance) < utils.formatEther(minimumStake)) {
    label =
      "Allowance is smaller than the minimum stake amount. Please approve allowance.";
  } else return null;
  return label;
};
