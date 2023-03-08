export type Cohort = {
  id: string;
  time: string;
  token: string;
  tokenAmount: string;
  dao: string;
  createdAt: string;
};

export type CohortMetadata = {
  createdAt: string;
  dao: string;
  id: string;
  time: string;
  token: string;
  tokenAmount: string;
};

export type MemberData = {
  address: string;
  id: string;
  joinedAt: string;
  stake: string;
};

export type CohortMetricsCard = {
  initiates: { joinedAt: string }[];
  token: string;
  treasury: string;
  sbtUrl: string;
  createdAt: string;
  totalMembers: number;
  successPercentage: number;
  slashedMembers: number;
};

export type CohortMetricsOverall = {
  averageCohortSize: string;
  claimRate: string;
  claimedMembers: string;
  slashRate: string;
  slashedMembers: string;
  totalCohorts: string;
  totalMembers: string;
};

export type Initiates = {
  id: string;
  address: string;
  tokenId: string;
  stake: string;
  joinedAt: string;
  claimed: boolean;
  sacrificed: boolean;
};
