import { utils } from "ethers";
import { TxHash } from "./types/TxHash";

export const convertBigNumber = (txHash: TxHash): string => {
  const wei = txHash.toString();
  const value = utils.formatEther(wei);
  return value;
};
