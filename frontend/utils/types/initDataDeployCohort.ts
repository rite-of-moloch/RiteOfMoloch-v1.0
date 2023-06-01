import { BigNumberish } from "ethers";

// struct InitData {
//   address membershipCriteria;
//   address stakingAsset;
//   address daoTreasury;
//   address admin1;
//   address admin2;
//   uint256 cohortSize;
//   uint256 joinDuration;
//   uint256 threshold;
//   uint256 assetAmount;
//   uint256 stakeDuration;
//   uint256 topHatId;
//   string cohortName;
//   string sbtName;
//   string sbtSymbol;
//   string baseUri;
//   bool shamanOn;
// }
export type InitDataDeployCohort = [
  membershipCriteria: string,
  stakingAsset: string,
  daoTreasury: string,
  admin1: string,
  admin2: string,
  cohortSize: BigNumberish,
  joinDuration: BigNumberish,
  threshold: BigNumberish,
  assetAmount: BigNumberish,
  stakeDuration: BigNumberish,
  topHatId: BigNumberish,
  cohortName: string,
  sbtName: string,
  sbtSymbol: string,
  baseUri: string,
  shamanOn: boolean
];
