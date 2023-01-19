export type Cohort = {
  data: {
    id: string;
    time: string;
    token: string;
    tokenAmount: string;
    dao: string;
    createdAt: string;
  }[];
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
