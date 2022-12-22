import { BigNumber } from "ethers";

export const convertBigNumber = (dataObject: any): number => {
  const bigNumber = dataObject?.value._hex;
  if (typeof bigNumber !== "number") return 0;
  return Number(bigNumber.toString());
};
