// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace RomGoerliTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Claim = {
  id: Scalars['ID'];
  initiate: Initiate;
  amount: Scalars['BigInt'];
  cohort: Cohort;
};

export type Claim_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  initiate?: InputMaybe<Scalars['String']>;
  initiate_not?: InputMaybe<Scalars['String']>;
  initiate_gt?: InputMaybe<Scalars['String']>;
  initiate_lt?: InputMaybe<Scalars['String']>;
  initiate_gte?: InputMaybe<Scalars['String']>;
  initiate_lte?: InputMaybe<Scalars['String']>;
  initiate_in?: InputMaybe<Array<Scalars['String']>>;
  initiate_not_in?: InputMaybe<Array<Scalars['String']>>;
  initiate_contains?: InputMaybe<Scalars['String']>;
  initiate_contains_nocase?: InputMaybe<Scalars['String']>;
  initiate_not_contains?: InputMaybe<Scalars['String']>;
  initiate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  initiate_starts_with?: InputMaybe<Scalars['String']>;
  initiate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  initiate_not_starts_with?: InputMaybe<Scalars['String']>;
  initiate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  initiate_ends_with?: InputMaybe<Scalars['String']>;
  initiate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  initiate_not_ends_with?: InputMaybe<Scalars['String']>;
  initiate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  initiate_?: InputMaybe<Initiate_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cohort?: InputMaybe<Scalars['String']>;
  cohort_not?: InputMaybe<Scalars['String']>;
  cohort_gt?: InputMaybe<Scalars['String']>;
  cohort_lt?: InputMaybe<Scalars['String']>;
  cohort_gte?: InputMaybe<Scalars['String']>;
  cohort_lte?: InputMaybe<Scalars['String']>;
  cohort_in?: InputMaybe<Array<Scalars['String']>>;
  cohort_not_in?: InputMaybe<Array<Scalars['String']>>;
  cohort_contains?: InputMaybe<Scalars['String']>;
  cohort_contains_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_contains?: InputMaybe<Scalars['String']>;
  cohort_not_contains_nocase?: InputMaybe<Scalars['String']>;
  cohort_starts_with?: InputMaybe<Scalars['String']>;
  cohort_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_starts_with?: InputMaybe<Scalars['String']>;
  cohort_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_ends_with?: InputMaybe<Scalars['String']>;
  cohort_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_ends_with?: InputMaybe<Scalars['String']>;
  cohort_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_?: InputMaybe<Cohort_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Claim_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Claim_filter>>>;
};

export type Claim_orderBy =
  | 'id'
  | 'initiate'
  | 'initiate__id'
  | 'initiate__address'
  | 'initiate__benefactor'
  | 'initiate__tokenId'
  | 'initiate__stake'
  | 'initiate__deadline'
  | 'initiate__joinedAt'
  | 'initiate__claimed'
  | 'initiate__sacrificed'
  | 'amount'
  | 'cohort'
  | 'cohort__id'
  | 'cohort__name'
  | 'cohort__address'
  | 'cohort__chain'
  | 'cohort__deployer'
  | 'cohort__dao'
  | 'cohort__token'
  | 'cohort__sbtUrl'
  | 'cohort__implementation'
  | 'cohort__tokenAmount'
  | 'cohort__sharesAmount'
  | 'cohort__time'
  | 'cohort__treasury'
  | 'cohort__createdAt'
  | 'cohort__totalMembers'
  | 'cohort__claimedMembers'
  | 'cohort__slashedMembers'
  | 'cohort__successPercentage';

export type Cohort = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  address: Scalars['Bytes'];
  chain: Scalars['String'];
  deployer: Scalars['Bytes'];
  dao: Scalars['Bytes'];
  token: Scalars['Bytes'];
  sbtUrl: Scalars['String'];
  implementation: Scalars['Bytes'];
  tokenAmount: Scalars['BigInt'];
  sharesAmount: Scalars['BigInt'];
  time: Scalars['BigInt'];
  treasury: Scalars['Bytes'];
  createdAt: Scalars['BigInt'];
  initiates?: Maybe<Array<Initiate>>;
  criesForHelp?: Maybe<Array<CryForHelp>>;
  claims?: Maybe<Array<Claim>>;
  Sacrifices?: Maybe<Array<Sacrifice>>;
  totalMembers: Scalars['BigInt'];
  claimedMembers: Scalars['BigInt'];
  slashedMembers: Scalars['BigInt'];
  successPercentage: Scalars['BigDecimal'];
};


export type CohortinitiatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Initiate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initiate_filter>;
};


export type CohortcriesForHelpArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CryForHelp_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CryForHelp_filter>;
};


export type CohortclaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Claim_filter>;
};


export type CohortSacrificesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sacrifice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sacrifice_filter>;
};

export type Cohort_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  chain?: InputMaybe<Scalars['String']>;
  chain_not?: InputMaybe<Scalars['String']>;
  chain_gt?: InputMaybe<Scalars['String']>;
  chain_lt?: InputMaybe<Scalars['String']>;
  chain_gte?: InputMaybe<Scalars['String']>;
  chain_lte?: InputMaybe<Scalars['String']>;
  chain_in?: InputMaybe<Array<Scalars['String']>>;
  chain_not_in?: InputMaybe<Array<Scalars['String']>>;
  chain_contains?: InputMaybe<Scalars['String']>;
  chain_contains_nocase?: InputMaybe<Scalars['String']>;
  chain_not_contains?: InputMaybe<Scalars['String']>;
  chain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  chain_starts_with?: InputMaybe<Scalars['String']>;
  chain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  chain_not_starts_with?: InputMaybe<Scalars['String']>;
  chain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  chain_ends_with?: InputMaybe<Scalars['String']>;
  chain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  chain_not_ends_with?: InputMaybe<Scalars['String']>;
  chain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  deployer?: InputMaybe<Scalars['Bytes']>;
  deployer_not?: InputMaybe<Scalars['Bytes']>;
  deployer_gt?: InputMaybe<Scalars['Bytes']>;
  deployer_lt?: InputMaybe<Scalars['Bytes']>;
  deployer_gte?: InputMaybe<Scalars['Bytes']>;
  deployer_lte?: InputMaybe<Scalars['Bytes']>;
  deployer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  deployer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  deployer_contains?: InputMaybe<Scalars['Bytes']>;
  deployer_not_contains?: InputMaybe<Scalars['Bytes']>;
  dao?: InputMaybe<Scalars['Bytes']>;
  dao_not?: InputMaybe<Scalars['Bytes']>;
  dao_gt?: InputMaybe<Scalars['Bytes']>;
  dao_lt?: InputMaybe<Scalars['Bytes']>;
  dao_gte?: InputMaybe<Scalars['Bytes']>;
  dao_lte?: InputMaybe<Scalars['Bytes']>;
  dao_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dao_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dao_contains?: InputMaybe<Scalars['Bytes']>;
  dao_not_contains?: InputMaybe<Scalars['Bytes']>;
  token?: InputMaybe<Scalars['Bytes']>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_gt?: InputMaybe<Scalars['Bytes']>;
  token_lt?: InputMaybe<Scalars['Bytes']>;
  token_gte?: InputMaybe<Scalars['Bytes']>;
  token_lte?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  sbtUrl?: InputMaybe<Scalars['String']>;
  sbtUrl_not?: InputMaybe<Scalars['String']>;
  sbtUrl_gt?: InputMaybe<Scalars['String']>;
  sbtUrl_lt?: InputMaybe<Scalars['String']>;
  sbtUrl_gte?: InputMaybe<Scalars['String']>;
  sbtUrl_lte?: InputMaybe<Scalars['String']>;
  sbtUrl_in?: InputMaybe<Array<Scalars['String']>>;
  sbtUrl_not_in?: InputMaybe<Array<Scalars['String']>>;
  sbtUrl_contains?: InputMaybe<Scalars['String']>;
  sbtUrl_contains_nocase?: InputMaybe<Scalars['String']>;
  sbtUrl_not_contains?: InputMaybe<Scalars['String']>;
  sbtUrl_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sbtUrl_starts_with?: InputMaybe<Scalars['String']>;
  sbtUrl_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sbtUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  sbtUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sbtUrl_ends_with?: InputMaybe<Scalars['String']>;
  sbtUrl_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sbtUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  sbtUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  implementation?: InputMaybe<Scalars['Bytes']>;
  implementation_not?: InputMaybe<Scalars['Bytes']>;
  implementation_gt?: InputMaybe<Scalars['Bytes']>;
  implementation_lt?: InputMaybe<Scalars['Bytes']>;
  implementation_gte?: InputMaybe<Scalars['Bytes']>;
  implementation_lte?: InputMaybe<Scalars['Bytes']>;
  implementation_in?: InputMaybe<Array<Scalars['Bytes']>>;
  implementation_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  implementation_contains?: InputMaybe<Scalars['Bytes']>;
  implementation_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenAmount?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_not?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_gt?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_lt?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_gte?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_lte?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sharesAmount?: InputMaybe<Scalars['BigInt']>;
  sharesAmount_not?: InputMaybe<Scalars['BigInt']>;
  sharesAmount_gt?: InputMaybe<Scalars['BigInt']>;
  sharesAmount_lt?: InputMaybe<Scalars['BigInt']>;
  sharesAmount_gte?: InputMaybe<Scalars['BigInt']>;
  sharesAmount_lte?: InputMaybe<Scalars['BigInt']>;
  sharesAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sharesAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  treasury?: InputMaybe<Scalars['Bytes']>;
  treasury_not?: InputMaybe<Scalars['Bytes']>;
  treasury_gt?: InputMaybe<Scalars['Bytes']>;
  treasury_lt?: InputMaybe<Scalars['Bytes']>;
  treasury_gte?: InputMaybe<Scalars['Bytes']>;
  treasury_lte?: InputMaybe<Scalars['Bytes']>;
  treasury_in?: InputMaybe<Array<Scalars['Bytes']>>;
  treasury_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  treasury_contains?: InputMaybe<Scalars['Bytes']>;
  treasury_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initiates_?: InputMaybe<Initiate_filter>;
  criesForHelp_?: InputMaybe<CryForHelp_filter>;
  claims_?: InputMaybe<Claim_filter>;
  Sacrifices_?: InputMaybe<Sacrifice_filter>;
  totalMembers?: InputMaybe<Scalars['BigInt']>;
  totalMembers_not?: InputMaybe<Scalars['BigInt']>;
  totalMembers_gt?: InputMaybe<Scalars['BigInt']>;
  totalMembers_lt?: InputMaybe<Scalars['BigInt']>;
  totalMembers_gte?: InputMaybe<Scalars['BigInt']>;
  totalMembers_lte?: InputMaybe<Scalars['BigInt']>;
  totalMembers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalMembers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimedMembers?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_not?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_gt?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_lt?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_gte?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_lte?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimedMembers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slashedMembers?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_not?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_gt?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_lt?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_gte?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_lte?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slashedMembers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  successPercentage?: InputMaybe<Scalars['BigDecimal']>;
  successPercentage_not?: InputMaybe<Scalars['BigDecimal']>;
  successPercentage_gt?: InputMaybe<Scalars['BigDecimal']>;
  successPercentage_lt?: InputMaybe<Scalars['BigDecimal']>;
  successPercentage_gte?: InputMaybe<Scalars['BigDecimal']>;
  successPercentage_lte?: InputMaybe<Scalars['BigDecimal']>;
  successPercentage_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  successPercentage_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Cohort_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Cohort_filter>>>;
};

export type Cohort_orderBy =
  | 'id'
  | 'name'
  | 'address'
  | 'chain'
  | 'deployer'
  | 'dao'
  | 'token'
  | 'sbtUrl'
  | 'implementation'
  | 'tokenAmount'
  | 'sharesAmount'
  | 'time'
  | 'treasury'
  | 'createdAt'
  | 'initiates'
  | 'criesForHelp'
  | 'claims'
  | 'Sacrifices'
  | 'totalMembers'
  | 'claimedMembers'
  | 'slashedMembers'
  | 'successPercentage';

export type CryForHelp = {
  id: Scalars['ID'];
  message: Scalars['String'];
  sender: Initiate;
  cohort: Cohort;
};

export type CryForHelp_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  message?: InputMaybe<Scalars['String']>;
  message_not?: InputMaybe<Scalars['String']>;
  message_gt?: InputMaybe<Scalars['String']>;
  message_lt?: InputMaybe<Scalars['String']>;
  message_gte?: InputMaybe<Scalars['String']>;
  message_lte?: InputMaybe<Scalars['String']>;
  message_in?: InputMaybe<Array<Scalars['String']>>;
  message_not_in?: InputMaybe<Array<Scalars['String']>>;
  message_contains?: InputMaybe<Scalars['String']>;
  message_contains_nocase?: InputMaybe<Scalars['String']>;
  message_not_contains?: InputMaybe<Scalars['String']>;
  message_not_contains_nocase?: InputMaybe<Scalars['String']>;
  message_starts_with?: InputMaybe<Scalars['String']>;
  message_starts_with_nocase?: InputMaybe<Scalars['String']>;
  message_not_starts_with?: InputMaybe<Scalars['String']>;
  message_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  message_ends_with?: InputMaybe<Scalars['String']>;
  message_ends_with_nocase?: InputMaybe<Scalars['String']>;
  message_not_ends_with?: InputMaybe<Scalars['String']>;
  message_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_?: InputMaybe<Initiate_filter>;
  cohort?: InputMaybe<Scalars['String']>;
  cohort_not?: InputMaybe<Scalars['String']>;
  cohort_gt?: InputMaybe<Scalars['String']>;
  cohort_lt?: InputMaybe<Scalars['String']>;
  cohort_gte?: InputMaybe<Scalars['String']>;
  cohort_lte?: InputMaybe<Scalars['String']>;
  cohort_in?: InputMaybe<Array<Scalars['String']>>;
  cohort_not_in?: InputMaybe<Array<Scalars['String']>>;
  cohort_contains?: InputMaybe<Scalars['String']>;
  cohort_contains_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_contains?: InputMaybe<Scalars['String']>;
  cohort_not_contains_nocase?: InputMaybe<Scalars['String']>;
  cohort_starts_with?: InputMaybe<Scalars['String']>;
  cohort_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_starts_with?: InputMaybe<Scalars['String']>;
  cohort_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_ends_with?: InputMaybe<Scalars['String']>;
  cohort_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_ends_with?: InputMaybe<Scalars['String']>;
  cohort_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_?: InputMaybe<Cohort_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CryForHelp_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CryForHelp_filter>>>;
};

export type CryForHelp_orderBy =
  | 'id'
  | 'message'
  | 'sender'
  | 'sender__id'
  | 'sender__address'
  | 'sender__benefactor'
  | 'sender__tokenId'
  | 'sender__stake'
  | 'sender__deadline'
  | 'sender__joinedAt'
  | 'sender__claimed'
  | 'sender__sacrificed'
  | 'cohort'
  | 'cohort__id'
  | 'cohort__name'
  | 'cohort__address'
  | 'cohort__chain'
  | 'cohort__deployer'
  | 'cohort__dao'
  | 'cohort__token'
  | 'cohort__sbtUrl'
  | 'cohort__implementation'
  | 'cohort__tokenAmount'
  | 'cohort__sharesAmount'
  | 'cohort__time'
  | 'cohort__treasury'
  | 'cohort__createdAt'
  | 'cohort__totalMembers'
  | 'cohort__claimedMembers'
  | 'cohort__slashedMembers'
  | 'cohort__successPercentage';

export type Initiate = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  benefactor: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  stake: Scalars['BigInt'];
  deadline: Scalars['BigInt'];
  joinedAt: Scalars['BigInt'];
  cohort: Cohort;
  claimed: Scalars['Boolean'];
  claim?: Maybe<Claim>;
  sacrificed: Scalars['Boolean'];
  sacrifice?: Maybe<Sacrifice>;
};

export type Initiate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  benefactor?: InputMaybe<Scalars['Bytes']>;
  benefactor_not?: InputMaybe<Scalars['Bytes']>;
  benefactor_gt?: InputMaybe<Scalars['Bytes']>;
  benefactor_lt?: InputMaybe<Scalars['Bytes']>;
  benefactor_gte?: InputMaybe<Scalars['Bytes']>;
  benefactor_lte?: InputMaybe<Scalars['Bytes']>;
  benefactor_in?: InputMaybe<Array<Scalars['Bytes']>>;
  benefactor_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  benefactor_contains?: InputMaybe<Scalars['Bytes']>;
  benefactor_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stake?: InputMaybe<Scalars['BigInt']>;
  stake_not?: InputMaybe<Scalars['BigInt']>;
  stake_gt?: InputMaybe<Scalars['BigInt']>;
  stake_lt?: InputMaybe<Scalars['BigInt']>;
  stake_gte?: InputMaybe<Scalars['BigInt']>;
  stake_lte?: InputMaybe<Scalars['BigInt']>;
  stake_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stake_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deadline?: InputMaybe<Scalars['BigInt']>;
  deadline_not?: InputMaybe<Scalars['BigInt']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']>;
  deadline_lt?: InputMaybe<Scalars['BigInt']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  joinedAt?: InputMaybe<Scalars['BigInt']>;
  joinedAt_not?: InputMaybe<Scalars['BigInt']>;
  joinedAt_gt?: InputMaybe<Scalars['BigInt']>;
  joinedAt_lt?: InputMaybe<Scalars['BigInt']>;
  joinedAt_gte?: InputMaybe<Scalars['BigInt']>;
  joinedAt_lte?: InputMaybe<Scalars['BigInt']>;
  joinedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  joinedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cohort?: InputMaybe<Scalars['String']>;
  cohort_not?: InputMaybe<Scalars['String']>;
  cohort_gt?: InputMaybe<Scalars['String']>;
  cohort_lt?: InputMaybe<Scalars['String']>;
  cohort_gte?: InputMaybe<Scalars['String']>;
  cohort_lte?: InputMaybe<Scalars['String']>;
  cohort_in?: InputMaybe<Array<Scalars['String']>>;
  cohort_not_in?: InputMaybe<Array<Scalars['String']>>;
  cohort_contains?: InputMaybe<Scalars['String']>;
  cohort_contains_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_contains?: InputMaybe<Scalars['String']>;
  cohort_not_contains_nocase?: InputMaybe<Scalars['String']>;
  cohort_starts_with?: InputMaybe<Scalars['String']>;
  cohort_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_starts_with?: InputMaybe<Scalars['String']>;
  cohort_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_ends_with?: InputMaybe<Scalars['String']>;
  cohort_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_ends_with?: InputMaybe<Scalars['String']>;
  cohort_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_?: InputMaybe<Cohort_filter>;
  claimed?: InputMaybe<Scalars['Boolean']>;
  claimed_not?: InputMaybe<Scalars['Boolean']>;
  claimed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  claimed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  claim_?: InputMaybe<Claim_filter>;
  sacrificed?: InputMaybe<Scalars['Boolean']>;
  sacrificed_not?: InputMaybe<Scalars['Boolean']>;
  sacrificed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sacrificed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sacrifice_?: InputMaybe<Sacrifice_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Initiate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Initiate_filter>>>;
};

export type Initiate_orderBy =
  | 'id'
  | 'address'
  | 'benefactor'
  | 'tokenId'
  | 'stake'
  | 'deadline'
  | 'joinedAt'
  | 'cohort'
  | 'cohort__id'
  | 'cohort__name'
  | 'cohort__address'
  | 'cohort__chain'
  | 'cohort__deployer'
  | 'cohort__dao'
  | 'cohort__token'
  | 'cohort__sbtUrl'
  | 'cohort__implementation'
  | 'cohort__tokenAmount'
  | 'cohort__sharesAmount'
  | 'cohort__time'
  | 'cohort__treasury'
  | 'cohort__createdAt'
  | 'cohort__totalMembers'
  | 'cohort__claimedMembers'
  | 'cohort__slashedMembers'
  | 'cohort__successPercentage'
  | 'claimed'
  | 'claim'
  | 'claim__id'
  | 'claim__amount'
  | 'sacrificed'
  | 'sacrifice'
  | 'sacrifice__id'
  | 'sacrifice__amount'
  | 'sacrifice__slasher';

export type Metric = {
  id: Scalars['ID'];
  totalCohorts: Scalars['BigInt'];
  totalMembers: Scalars['BigInt'];
  claimedMembers: Scalars['BigInt'];
  slashedMembers: Scalars['BigInt'];
  slashRate: Scalars['BigDecimal'];
  claimRate: Scalars['BigDecimal'];
  averageCohortSize: Scalars['BigDecimal'];
};

export type Metric_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalCohorts?: InputMaybe<Scalars['BigInt']>;
  totalCohorts_not?: InputMaybe<Scalars['BigInt']>;
  totalCohorts_gt?: InputMaybe<Scalars['BigInt']>;
  totalCohorts_lt?: InputMaybe<Scalars['BigInt']>;
  totalCohorts_gte?: InputMaybe<Scalars['BigInt']>;
  totalCohorts_lte?: InputMaybe<Scalars['BigInt']>;
  totalCohorts_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalCohorts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalMembers?: InputMaybe<Scalars['BigInt']>;
  totalMembers_not?: InputMaybe<Scalars['BigInt']>;
  totalMembers_gt?: InputMaybe<Scalars['BigInt']>;
  totalMembers_lt?: InputMaybe<Scalars['BigInt']>;
  totalMembers_gte?: InputMaybe<Scalars['BigInt']>;
  totalMembers_lte?: InputMaybe<Scalars['BigInt']>;
  totalMembers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalMembers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimedMembers?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_not?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_gt?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_lt?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_gte?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_lte?: InputMaybe<Scalars['BigInt']>;
  claimedMembers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimedMembers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slashedMembers?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_not?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_gt?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_lt?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_gte?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_lte?: InputMaybe<Scalars['BigInt']>;
  slashedMembers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slashedMembers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slashRate?: InputMaybe<Scalars['BigDecimal']>;
  slashRate_not?: InputMaybe<Scalars['BigDecimal']>;
  slashRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  slashRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  slashRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  slashRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  slashRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  slashRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  claimRate?: InputMaybe<Scalars['BigDecimal']>;
  claimRate_not?: InputMaybe<Scalars['BigDecimal']>;
  claimRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  claimRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  claimRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  claimRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  claimRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  claimRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  averageCohortSize?: InputMaybe<Scalars['BigDecimal']>;
  averageCohortSize_not?: InputMaybe<Scalars['BigDecimal']>;
  averageCohortSize_gt?: InputMaybe<Scalars['BigDecimal']>;
  averageCohortSize_lt?: InputMaybe<Scalars['BigDecimal']>;
  averageCohortSize_gte?: InputMaybe<Scalars['BigDecimal']>;
  averageCohortSize_lte?: InputMaybe<Scalars['BigDecimal']>;
  averageCohortSize_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  averageCohortSize_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Metric_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Metric_filter>>>;
};

export type Metric_orderBy =
  | 'id'
  | 'totalCohorts'
  | 'totalMembers'
  | 'claimedMembers'
  | 'slashedMembers'
  | 'slashRate'
  | 'claimRate'
  | 'averageCohortSize';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  cohort?: Maybe<Cohort>;
  cohorts: Array<Cohort>;
  initiate?: Maybe<Initiate>;
  initiates: Array<Initiate>;
  cryForHelp?: Maybe<CryForHelp>;
  cryForHelps: Array<CryForHelp>;
  claim?: Maybe<Claim>;
  claims: Array<Claim>;
  sacrifice?: Maybe<Sacrifice>;
  sacrifices: Array<Sacrifice>;
  metric?: Maybe<Metric>;
  metrics: Array<Metric>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerycohortArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycohortsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Cohort_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Cohort_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitiateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitiatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Initiate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initiate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycryForHelpArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycryForHelpsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CryForHelp_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CryForHelp_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclaimArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Claim_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysacrificeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysacrificesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sacrifice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sacrifice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymetricArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymetricsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Metric_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Metric_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Sacrifice = {
  id: Scalars['ID'];
  initiate: Initiate;
  amount: Scalars['BigInt'];
  slasher: Scalars['Bytes'];
  cohort: Cohort;
};

export type Sacrifice_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  initiate?: InputMaybe<Scalars['String']>;
  initiate_not?: InputMaybe<Scalars['String']>;
  initiate_gt?: InputMaybe<Scalars['String']>;
  initiate_lt?: InputMaybe<Scalars['String']>;
  initiate_gte?: InputMaybe<Scalars['String']>;
  initiate_lte?: InputMaybe<Scalars['String']>;
  initiate_in?: InputMaybe<Array<Scalars['String']>>;
  initiate_not_in?: InputMaybe<Array<Scalars['String']>>;
  initiate_contains?: InputMaybe<Scalars['String']>;
  initiate_contains_nocase?: InputMaybe<Scalars['String']>;
  initiate_not_contains?: InputMaybe<Scalars['String']>;
  initiate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  initiate_starts_with?: InputMaybe<Scalars['String']>;
  initiate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  initiate_not_starts_with?: InputMaybe<Scalars['String']>;
  initiate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  initiate_ends_with?: InputMaybe<Scalars['String']>;
  initiate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  initiate_not_ends_with?: InputMaybe<Scalars['String']>;
  initiate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  initiate_?: InputMaybe<Initiate_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slasher?: InputMaybe<Scalars['Bytes']>;
  slasher_not?: InputMaybe<Scalars['Bytes']>;
  slasher_gt?: InputMaybe<Scalars['Bytes']>;
  slasher_lt?: InputMaybe<Scalars['Bytes']>;
  slasher_gte?: InputMaybe<Scalars['Bytes']>;
  slasher_lte?: InputMaybe<Scalars['Bytes']>;
  slasher_in?: InputMaybe<Array<Scalars['Bytes']>>;
  slasher_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  slasher_contains?: InputMaybe<Scalars['Bytes']>;
  slasher_not_contains?: InputMaybe<Scalars['Bytes']>;
  cohort?: InputMaybe<Scalars['String']>;
  cohort_not?: InputMaybe<Scalars['String']>;
  cohort_gt?: InputMaybe<Scalars['String']>;
  cohort_lt?: InputMaybe<Scalars['String']>;
  cohort_gte?: InputMaybe<Scalars['String']>;
  cohort_lte?: InputMaybe<Scalars['String']>;
  cohort_in?: InputMaybe<Array<Scalars['String']>>;
  cohort_not_in?: InputMaybe<Array<Scalars['String']>>;
  cohort_contains?: InputMaybe<Scalars['String']>;
  cohort_contains_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_contains?: InputMaybe<Scalars['String']>;
  cohort_not_contains_nocase?: InputMaybe<Scalars['String']>;
  cohort_starts_with?: InputMaybe<Scalars['String']>;
  cohort_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_starts_with?: InputMaybe<Scalars['String']>;
  cohort_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_ends_with?: InputMaybe<Scalars['String']>;
  cohort_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_not_ends_with?: InputMaybe<Scalars['String']>;
  cohort_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cohort_?: InputMaybe<Cohort_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Sacrifice_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Sacrifice_filter>>>;
};

export type Sacrifice_orderBy =
  | 'id'
  | 'initiate'
  | 'initiate__id'
  | 'initiate__address'
  | 'initiate__benefactor'
  | 'initiate__tokenId'
  | 'initiate__stake'
  | 'initiate__deadline'
  | 'initiate__joinedAt'
  | 'initiate__claimed'
  | 'initiate__sacrificed'
  | 'amount'
  | 'slasher'
  | 'cohort'
  | 'cohort__id'
  | 'cohort__name'
  | 'cohort__address'
  | 'cohort__chain'
  | 'cohort__deployer'
  | 'cohort__dao'
  | 'cohort__token'
  | 'cohort__sbtUrl'
  | 'cohort__implementation'
  | 'cohort__tokenAmount'
  | 'cohort__sharesAmount'
  | 'cohort__time'
  | 'cohort__treasury'
  | 'cohort__createdAt'
  | 'cohort__totalMembers'
  | 'cohort__claimedMembers'
  | 'cohort__slashedMembers'
  | 'cohort__successPercentage';

export type Subscription = {
  cohort?: Maybe<Cohort>;
  cohorts: Array<Cohort>;
  initiate?: Maybe<Initiate>;
  initiates: Array<Initiate>;
  cryForHelp?: Maybe<CryForHelp>;
  cryForHelps: Array<CryForHelp>;
  claim?: Maybe<Claim>;
  claims: Array<Claim>;
  sacrifice?: Maybe<Sacrifice>;
  sacrifices: Array<Sacrifice>;
  metric?: Maybe<Metric>;
  metrics: Array<Metric>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptioncohortArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncohortsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Cohort_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Cohort_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioninitiateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioninitiatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Initiate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initiate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncryForHelpArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncryForHelpsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CryForHelp_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CryForHelp_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclaimArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Claim_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsacrificeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsacrificesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sacrifice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sacrifice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmetricArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmetricsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Metric_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Metric_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  cohort: InContextSdkMethod<Query['cohort'], QuerycohortArgs, MeshContext>,
  /** null **/
  cohorts: InContextSdkMethod<Query['cohorts'], QuerycohortsArgs, MeshContext>,
  /** null **/
  initiate: InContextSdkMethod<Query['initiate'], QueryinitiateArgs, MeshContext>,
  /** null **/
  initiates: InContextSdkMethod<Query['initiates'], QueryinitiatesArgs, MeshContext>,
  /** null **/
  cryForHelp: InContextSdkMethod<Query['cryForHelp'], QuerycryForHelpArgs, MeshContext>,
  /** null **/
  cryForHelps: InContextSdkMethod<Query['cryForHelps'], QuerycryForHelpsArgs, MeshContext>,
  /** null **/
  claim: InContextSdkMethod<Query['claim'], QueryclaimArgs, MeshContext>,
  /** null **/
  claims: InContextSdkMethod<Query['claims'], QueryclaimsArgs, MeshContext>,
  /** null **/
  sacrifice: InContextSdkMethod<Query['sacrifice'], QuerysacrificeArgs, MeshContext>,
  /** null **/
  sacrifices: InContextSdkMethod<Query['sacrifices'], QuerysacrificesArgs, MeshContext>,
  /** null **/
  metric: InContextSdkMethod<Query['metric'], QuerymetricArgs, MeshContext>,
  /** null **/
  metrics: InContextSdkMethod<Query['metrics'], QuerymetricsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  cohort: InContextSdkMethod<Subscription['cohort'], SubscriptioncohortArgs, MeshContext>,
  /** null **/
  cohorts: InContextSdkMethod<Subscription['cohorts'], SubscriptioncohortsArgs, MeshContext>,
  /** null **/
  initiate: InContextSdkMethod<Subscription['initiate'], SubscriptioninitiateArgs, MeshContext>,
  /** null **/
  initiates: InContextSdkMethod<Subscription['initiates'], SubscriptioninitiatesArgs, MeshContext>,
  /** null **/
  cryForHelp: InContextSdkMethod<Subscription['cryForHelp'], SubscriptioncryForHelpArgs, MeshContext>,
  /** null **/
  cryForHelps: InContextSdkMethod<Subscription['cryForHelps'], SubscriptioncryForHelpsArgs, MeshContext>,
  /** null **/
  claim: InContextSdkMethod<Subscription['claim'], SubscriptionclaimArgs, MeshContext>,
  /** null **/
  claims: InContextSdkMethod<Subscription['claims'], SubscriptionclaimsArgs, MeshContext>,
  /** null **/
  sacrifice: InContextSdkMethod<Subscription['sacrifice'], SubscriptionsacrificeArgs, MeshContext>,
  /** null **/
  sacrifices: InContextSdkMethod<Subscription['sacrifices'], SubscriptionsacrificesArgs, MeshContext>,
  /** null **/
  metric: InContextSdkMethod<Subscription['metric'], SubscriptionmetricArgs, MeshContext>,
  /** null **/
  metrics: InContextSdkMethod<Subscription['metrics'], SubscriptionmetricsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["rom-goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
