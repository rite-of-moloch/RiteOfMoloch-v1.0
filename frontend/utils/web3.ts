import { TxHash } from "./types/TxHash";

export const convertBigNumber = (txHash: TxHash): string => {
  return txHash.toString();
};
