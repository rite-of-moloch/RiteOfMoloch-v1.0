export type QueryBuilder = (...args: any) => string;

interface Cohort {
  id: string;
  deployer: string;
  dao: string;
  token: string;
  implementation: string;
  tokenAmount: string;
  sharesAmount: string;
  time: string;
  treasury: string;
  createdAt: string;
  initiates: Initiate[];
  criesForHelp: CryForHelp[];
  claims: Claim[];
  Sacrifices: Sacrifice[];
}

interface Initiate {
  id: string;
  address: string;
  benefactor: string;
  tokenId: string;
  stake: string;
  deadline: string;
  joinedAt: string;
  cohort: Cohort;
  claimed: boolean;
  claim: Claim;
  sacrificed: boolean;
  sacrifice: Sacrifice;
}

interface CryForHelp {
  id: string;
  message: string;
  sender: Initiate;
  cohort: Cohort;
}

interface Claim {
  id: string;
  initiate: Initiate;
  amount: string;
  cohort: Cohort;
}

interface Sacrifice {
  id: string;
  initiate: Initiate;
  amount: string;
  slasher: string;
  cohort: Cohort;
}
