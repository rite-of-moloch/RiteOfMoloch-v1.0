import { BigNumber, utils } from "ethers";
import { TxHash } from "./types/TxHash";

export const convertBigNumber = (txHash: TxHash | undefined): number => {
  const value = txHash?.value?._hex;
  if (typeof value !== "number") return 0;
  // replace with toNumber()
  return Number(BigNumber.from(value));
};
