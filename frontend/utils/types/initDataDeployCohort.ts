import { BigNumber } from "ethers";

export type initDataDeployCohort = [
  membershipCriteria: string,
  stakingAsset: string,
  treasury: string,
  topHatWearer: string | null,
  admin1: string | null,
  admin2: string | null,
  cohortSize: string | null | undefined,
  joinDuration: string | null | undefined,
  threshold: string | null | undefined,
  assetAmount: string | null | undefined,
  stakeDuration: string | null | undefined,
  chainId: string | undefined,
  topHatId: string | null | undefined,
  cohortName: string,
  sbtName: string,
  sbtSymbol: string,
  baseUri: string
];
