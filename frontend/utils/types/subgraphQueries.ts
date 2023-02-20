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
