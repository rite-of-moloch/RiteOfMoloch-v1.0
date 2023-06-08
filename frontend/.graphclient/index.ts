// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import UsePollingLive from "@graphprotocol/client-polling-live";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { RomGnosisTypes } from './sources/rom-gnosis/types';
import * as importedModule$0 from "./sources/rom-gnosis/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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
  Int8: any;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Claim: ResolverTypeWrapper<Claim>;
  Claim_filter: Claim_filter;
  Claim_orderBy: Claim_orderBy;
  Cohort: ResolverTypeWrapper<Cohort>;
  Cohort_filter: Cohort_filter;
  Cohort_orderBy: Cohort_orderBy;
  CryForHelp: ResolverTypeWrapper<CryForHelp>;
  CryForHelp_filter: CryForHelp_filter;
  CryForHelp_orderBy: CryForHelp_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Initiate: ResolverTypeWrapper<Initiate>;
  Initiate_filter: Initiate_filter;
  Initiate_orderBy: Initiate_orderBy;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  Metric: ResolverTypeWrapper<Metric>;
  Metric_filter: Metric_filter;
  Metric_orderBy: Metric_orderBy;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  Sacrifice: ResolverTypeWrapper<Sacrifice>;
  Sacrifice_filter: Sacrifice_filter;
  Sacrifice_orderBy: Sacrifice_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Claim: Claim;
  Claim_filter: Claim_filter;
  Cohort: Cohort;
  Cohort_filter: Cohort_filter;
  CryForHelp: CryForHelp;
  CryForHelp_filter: CryForHelp_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Initiate: Initiate;
  Initiate_filter: Initiate_filter;
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Metric: Metric;
  Metric_filter: Metric_filter;
  Query: {};
  Sacrifice: Sacrifice;
  Sacrifice_filter: Sacrifice_filter;
  String: Scalars['String'];
  Subscription: {};
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ClaimResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Claim'] = ResolversParentTypes['Claim']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initiate?: Resolver<ResolversTypes['Initiate'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cohort?: Resolver<ResolversTypes['Cohort'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CohortResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Cohort'] = ResolversParentTypes['Cohort']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  chain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deployer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  dao?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sbtUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  implementation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sharesAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  treasury?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  initiates?: Resolver<Maybe<Array<ResolversTypes['Initiate']>>, ParentType, ContextType, RequireFields<CohortinitiatesArgs, 'skip' | 'first'>>;
  criesForHelp?: Resolver<Maybe<Array<ResolversTypes['CryForHelp']>>, ParentType, ContextType, RequireFields<CohortcriesForHelpArgs, 'skip' | 'first'>>;
  claims?: Resolver<Maybe<Array<ResolversTypes['Claim']>>, ParentType, ContextType, RequireFields<CohortclaimsArgs, 'skip' | 'first'>>;
  Sacrifices?: Resolver<Maybe<Array<ResolversTypes['Sacrifice']>>, ParentType, ContextType, RequireFields<CohortSacrificesArgs, 'skip' | 'first'>>;
  totalMembers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  claimedMembers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  slashedMembers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  successPercentage?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CryForHelpResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CryForHelp'] = ResolversParentTypes['CryForHelp']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Initiate'], ParentType, ContextType>;
  cohort?: Resolver<ResolversTypes['Cohort'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InitiateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Initiate'] = ResolversParentTypes['Initiate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  benefactor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  stake?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  deadline?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  joinedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cohort?: Resolver<ResolversTypes['Cohort'], ParentType, ContextType>;
  claimed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  claim?: Resolver<Maybe<ResolversTypes['Claim']>, ParentType, ContextType>;
  sacrificed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  sacrifice?: Resolver<Maybe<ResolversTypes['Sacrifice']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type MetricResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Metric'] = ResolversParentTypes['Metric']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalCohorts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalMembers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  claimedMembers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  slashedMembers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  slashRate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  claimRate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  averageCohortSize?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  cohort?: Resolver<Maybe<ResolversTypes['Cohort']>, ParentType, ContextType, RequireFields<QuerycohortArgs, 'id' | 'subgraphError'>>;
  cohorts?: Resolver<Array<ResolversTypes['Cohort']>, ParentType, ContextType, RequireFields<QuerycohortsArgs, 'skip' | 'first' | 'subgraphError'>>;
  initiate?: Resolver<Maybe<ResolversTypes['Initiate']>, ParentType, ContextType, RequireFields<QueryinitiateArgs, 'id' | 'subgraphError'>>;
  initiates?: Resolver<Array<ResolversTypes['Initiate']>, ParentType, ContextType, RequireFields<QueryinitiatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  cryForHelp?: Resolver<Maybe<ResolversTypes['CryForHelp']>, ParentType, ContextType, RequireFields<QuerycryForHelpArgs, 'id' | 'subgraphError'>>;
  cryForHelps?: Resolver<Array<ResolversTypes['CryForHelp']>, ParentType, ContextType, RequireFields<QuerycryForHelpsArgs, 'skip' | 'first' | 'subgraphError'>>;
  claim?: Resolver<Maybe<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<QueryclaimArgs, 'id' | 'subgraphError'>>;
  claims?: Resolver<Array<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<QueryclaimsArgs, 'skip' | 'first' | 'subgraphError'>>;
  sacrifice?: Resolver<Maybe<ResolversTypes['Sacrifice']>, ParentType, ContextType, RequireFields<QuerysacrificeArgs, 'id' | 'subgraphError'>>;
  sacrifices?: Resolver<Array<ResolversTypes['Sacrifice']>, ParentType, ContextType, RequireFields<QuerysacrificesArgs, 'skip' | 'first' | 'subgraphError'>>;
  metric?: Resolver<Maybe<ResolversTypes['Metric']>, ParentType, ContextType, RequireFields<QuerymetricArgs, 'id' | 'subgraphError'>>;
  metrics?: Resolver<Array<ResolversTypes['Metric']>, ParentType, ContextType, RequireFields<QuerymetricsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SacrificeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Sacrifice'] = ResolversParentTypes['Sacrifice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initiate?: Resolver<ResolversTypes['Initiate'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  slasher?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  cohort?: Resolver<ResolversTypes['Cohort'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  cohort?: SubscriptionResolver<Maybe<ResolversTypes['Cohort']>, "cohort", ParentType, ContextType, RequireFields<SubscriptioncohortArgs, 'id' | 'subgraphError'>>;
  cohorts?: SubscriptionResolver<Array<ResolversTypes['Cohort']>, "cohorts", ParentType, ContextType, RequireFields<SubscriptioncohortsArgs, 'skip' | 'first' | 'subgraphError'>>;
  initiate?: SubscriptionResolver<Maybe<ResolversTypes['Initiate']>, "initiate", ParentType, ContextType, RequireFields<SubscriptioninitiateArgs, 'id' | 'subgraphError'>>;
  initiates?: SubscriptionResolver<Array<ResolversTypes['Initiate']>, "initiates", ParentType, ContextType, RequireFields<SubscriptioninitiatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  cryForHelp?: SubscriptionResolver<Maybe<ResolversTypes['CryForHelp']>, "cryForHelp", ParentType, ContextType, RequireFields<SubscriptioncryForHelpArgs, 'id' | 'subgraphError'>>;
  cryForHelps?: SubscriptionResolver<Array<ResolversTypes['CryForHelp']>, "cryForHelps", ParentType, ContextType, RequireFields<SubscriptioncryForHelpsArgs, 'skip' | 'first' | 'subgraphError'>>;
  claim?: SubscriptionResolver<Maybe<ResolversTypes['Claim']>, "claim", ParentType, ContextType, RequireFields<SubscriptionclaimArgs, 'id' | 'subgraphError'>>;
  claims?: SubscriptionResolver<Array<ResolversTypes['Claim']>, "claims", ParentType, ContextType, RequireFields<SubscriptionclaimsArgs, 'skip' | 'first' | 'subgraphError'>>;
  sacrifice?: SubscriptionResolver<Maybe<ResolversTypes['Sacrifice']>, "sacrifice", ParentType, ContextType, RequireFields<SubscriptionsacrificeArgs, 'id' | 'subgraphError'>>;
  sacrifices?: SubscriptionResolver<Array<ResolversTypes['Sacrifice']>, "sacrifices", ParentType, ContextType, RequireFields<SubscriptionsacrificesArgs, 'skip' | 'first' | 'subgraphError'>>;
  metric?: SubscriptionResolver<Maybe<ResolversTypes['Metric']>, "metric", ParentType, ContextType, RequireFields<SubscriptionmetricArgs, 'id' | 'subgraphError'>>;
  metrics?: SubscriptionResolver<Array<ResolversTypes['Metric']>, "metrics", ParentType, ContextType, RequireFields<SubscriptionmetricsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Claim?: ClaimResolvers<ContextType>;
  Cohort?: CohortResolvers<ContextType>;
  CryForHelp?: CryForHelpResolvers<ContextType>;
  Initiate?: InitiateResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Metric?: MetricResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sacrifice?: SacrificeResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = RomGnosisTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/rom-gnosis/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const romGnosisTransforms = [];
const additionalTypeDefs = [] as any[];
const romGnosisHandler = new GraphqlHandler({
              name: "rom-gnosis",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/rite-of-moloch/rom-gnosis"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("rom-gnosis"),
              logger: logger.child("rom-gnosis"),
              importFn,
            });
sources[0] = {
          name: 'rom-gnosis',
          handler: romGnosisHandler,
          transforms: romGnosisTransforms
        }
additionalEnvelopPlugins[0] = await UsePollingLive({
          ...({
  "defaultInterval": 2000
}),
          logger: logger.child("pollingLive"),
          cache,
          pubsub,
          baseDir,
          importFn,
        })
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: CohortsDocument,
        get rawSDL() {
          return printWithCache(CohortsDocument);
        },
        location: 'CohortsDocument.graphql'
      },{
        document: CohortByIdDocument,
        get rawSDL() {
          return printWithCache(CohortByIdDocument);
        },
        location: 'CohortByIdDocument.graphql'
      },{
        document: CohortDataByAddressDocument,
        get rawSDL() {
          return printWithCache(CohortDataByAddressDocument);
        },
        location: 'CohortDataByAddressDocument.graphql'
      },{
        document: InitiatesDocument,
        get rawSDL() {
          return printWithCache(InitiatesDocument);
        },
        location: 'InitiatesDocument.graphql'
      },{
        document: InitiatesByCohortIdDocument,
        get rawSDL() {
          return printWithCache(InitiatesByCohortIdDocument);
        },
        location: 'InitiatesByCohortIdDocument.graphql'
      },{
        document: InitiatesByCohortAddressDocument,
        get rawSDL() {
          return printWithCache(InitiatesByCohortAddressDocument);
        },
        location: 'InitiatesByCohortAddressDocument.graphql'
      },{
        document: MetricsDocument,
        get rawSDL() {
          return printWithCache(MetricsDocument);
        },
        location: 'MetricsDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type CohortsQueryVariables = Exact<{ [key: string]: never; }>;


export type CohortsQuery = { cohorts: Array<(
    Pick<Cohort, 'createdAt' | 'name' | 'dao' | 'deployer' | 'id' | 'address' | 'sbtUrl' | 'sharesAmount' | 'slashedMembers' | 'claimedMembers' | 'successPercentage' | 'time' | 'token' | 'tokenAmount' | 'totalMembers' | 'treasury'>
    & { initiates?: Maybe<Array<Pick<Initiate, 'address' | 'claimed' | 'deadline' | 'joinedAt' | 'sacrificed' | 'stake'>>> }
  )> };

export type CohortByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type CohortByIdQuery = { cohort?: Maybe<(
    Pick<Cohort, 'createdAt' | 'name' | 'dao' | 'deployer' | 'id' | 'address' | 'sbtUrl' | 'sharesAmount' | 'slashedMembers' | 'claimedMembers' | 'successPercentage' | 'time' | 'token' | 'tokenAmount' | 'totalMembers' | 'treasury'>
    & { initiates?: Maybe<Array<Pick<Initiate, 'address' | 'claimed' | 'deadline' | 'joinedAt' | 'sacrificed' | 'stake'>>> }
  )> };

export type InitiateFragmentFragment = Pick<Initiate, 'address' | 'claimed' | 'deadline' | 'joinedAt' | 'sacrificed' | 'stake'>;

export type CohortFragmentFragment = (
  Pick<Cohort, 'createdAt' | 'name' | 'dao' | 'deployer' | 'id' | 'address' | 'sbtUrl' | 'sharesAmount' | 'slashedMembers' | 'claimedMembers' | 'successPercentage' | 'time' | 'token' | 'tokenAmount' | 'totalMembers' | 'treasury'>
  & { initiates?: Maybe<Array<Pick<Initiate, 'address' | 'claimed' | 'deadline' | 'joinedAt' | 'sacrificed' | 'stake'>>> }
);

export type CohortDataByAddressQueryVariables = Exact<{
  address?: InputMaybe<Scalars['Bytes']>;
}>;


export type CohortDataByAddressQuery = { cohorts: Array<(
    Pick<Cohort, 'createdAt' | 'name' | 'dao' | 'deployer' | 'id' | 'address' | 'sbtUrl' | 'sharesAmount' | 'slashedMembers' | 'claimedMembers' | 'successPercentage' | 'time' | 'token' | 'tokenAmount' | 'totalMembers' | 'treasury'>
    & { initiates?: Maybe<Array<Pick<Initiate, 'address' | 'claimed' | 'deadline' | 'joinedAt' | 'sacrificed' | 'stake'>>> }
  )> };

export type InitiatesQueryVariables = Exact<{ [key: string]: never; }>;


export type InitiatesQuery = { initiates: Array<(
    Pick<Initiate, 'id' | 'address' | 'benefactor' | 'claimed' | 'deadline' | 'joinedAt' | 'sacrificed' | 'stake'>
    & { cohort: Pick<Cohort, 'id' | 'name' | 'address'>, sacrifice?: Maybe<Pick<Sacrifice, 'amount' | 'slasher'>>, claim?: Maybe<Pick<Claim, 'amount'>> }
  )> };

export type InitiatesByCohortIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type InitiatesByCohortIdQuery = { initiates: Array<(
    Pick<Initiate, 'id' | 'address' | 'benefactor' | 'claimed' | 'deadline' | 'joinedAt' | 'sacrificed' | 'stake'>
    & { cohort: Pick<Cohort, 'id' | 'name' | 'address'>, sacrifice?: Maybe<Pick<Sacrifice, 'amount' | 'slasher'>>, claim?: Maybe<Pick<Claim, 'amount'>> }
  )> };

export type InitiatesByCohortAddressQueryVariables = Exact<{
  address?: InputMaybe<Scalars['Bytes']>;
}>;


export type InitiatesByCohortAddressQuery = { initiates: Array<(
    Pick<Initiate, 'id' | 'address' | 'benefactor' | 'claimed' | 'deadline' | 'joinedAt' | 'sacrificed' | 'stake'>
    & { cohort: Pick<Cohort, 'id' | 'name' | 'address'>, sacrifice?: Maybe<Pick<Sacrifice, 'amount' | 'slasher'>>, claim?: Maybe<Pick<Claim, 'amount'>> }
  )> };

export type InitiateDetailsFragment = (
  Pick<Initiate, 'id' | 'address' | 'benefactor' | 'claimed' | 'deadline' | 'joinedAt' | 'sacrificed' | 'stake'>
  & { cohort: Pick<Cohort, 'id' | 'name' | 'address'>, sacrifice?: Maybe<Pick<Sacrifice, 'amount' | 'slasher'>>, claim?: Maybe<Pick<Claim, 'amount'>> }
);

export type MetricsQueryVariables = Exact<{ [key: string]: never; }>;


export type MetricsQuery = { metric?: Maybe<Pick<Metric, 'averageCohortSize' | 'claimRate' | 'claimedMembers' | 'slashRate' | 'slashedMembers' | 'totalCohorts' | 'totalMembers'>> };

export type MetricFragmentFragment = Pick<Metric, 'averageCohortSize' | 'claimRate' | 'claimedMembers' | 'slashRate' | 'slashedMembers' | 'totalCohorts' | 'totalMembers'>;

export const InitiateFragmentFragmentDoc = gql`
    fragment InitiateFragment on Initiate {
  address
  claimed
  deadline
  joinedAt
  sacrificed
  stake
}
    ` as unknown as DocumentNode<InitiateFragmentFragment, unknown>;
export const CohortFragmentFragmentDoc = gql`
    fragment CohortFragment on Cohort {
  createdAt
  name
  dao
  deployer
  id
  address
  initiates {
    ...InitiateFragment
  }
  sbtUrl
  sharesAmount
  slashedMembers
  claimedMembers
  successPercentage
  time
  token
  tokenAmount
  totalMembers
  treasury
}
    ${InitiateFragmentFragmentDoc}` as unknown as DocumentNode<CohortFragmentFragment, unknown>;
export const InitiateDetailsFragmentDoc = gql`
    fragment InitiateDetails on Initiate {
  id
  address
  benefactor
  claimed
  deadline
  joinedAt
  sacrificed
  stake
  cohort {
    id
    name
    address
  }
  sacrifice {
    amount
    slasher
  }
  claim {
    amount
  }
}
    ` as unknown as DocumentNode<InitiateDetailsFragment, unknown>;
export const MetricFragmentFragmentDoc = gql`
    fragment MetricFragment on Metric {
  averageCohortSize
  claimRate
  claimedMembers
  slashRate
  slashedMembers
  totalCohorts
  totalMembers
}
    ` as unknown as DocumentNode<MetricFragmentFragment, unknown>;
export const CohortsDocument = gql`
    query Cohorts {
  cohorts {
    ...CohortFragment
  }
}
    ${CohortFragmentFragmentDoc}` as unknown as DocumentNode<CohortsQuery, CohortsQueryVariables>;
export const CohortByIdDocument = gql`
    query CohortById($id: ID = "") {
  cohort(id: $id) {
    ...CohortFragment
  }
}
    ${CohortFragmentFragmentDoc}` as unknown as DocumentNode<CohortByIdQuery, CohortByIdQueryVariables>;
export const CohortDataByAddressDocument = gql`
    query CohortDataByAddress($address: Bytes = "") {
  cohorts(where: {address: $address}) {
    ...CohortFragment
  }
}
    ${CohortFragmentFragmentDoc}` as unknown as DocumentNode<CohortDataByAddressQuery, CohortDataByAddressQueryVariables>;
export const InitiatesDocument = gql`
    query Initiates {
  initiates {
    ...InitiateDetails
  }
}
    ${InitiateDetailsFragmentDoc}` as unknown as DocumentNode<InitiatesQuery, InitiatesQueryVariables>;
export const InitiatesByCohortIdDocument = gql`
    query InitiatesByCohortId($id: ID = "") {
  initiates(where: {cohort_: {id: $id}}) {
    ...InitiateDetails
  }
}
    ${InitiateDetailsFragmentDoc}` as unknown as DocumentNode<InitiatesByCohortIdQuery, InitiatesByCohortIdQueryVariables>;
export const InitiatesByCohortAddressDocument = gql`
    query InitiatesByCohortAddress($address: Bytes = "") {
  initiates(where: {cohort_: {address: $address}}) {
    ...InitiateDetails
  }
}
    ${InitiateDetailsFragmentDoc}` as unknown as DocumentNode<InitiatesByCohortAddressQuery, InitiatesByCohortAddressQueryVariables>;
export const MetricsDocument = gql`
    query Metrics {
  metric(id: "0") {
    ...MetricFragment
  }
}
    ${MetricFragmentFragmentDoc}` as unknown as DocumentNode<MetricsQuery, MetricsQueryVariables>;








export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    Cohorts(variables?: CohortsQueryVariables, options?: C): Promise<CohortsQuery> {
      return requester<CohortsQuery, CohortsQueryVariables>(CohortsDocument, variables, options) as Promise<CohortsQuery>;
    },
    CohortById(variables?: CohortByIdQueryVariables, options?: C): Promise<CohortByIdQuery> {
      return requester<CohortByIdQuery, CohortByIdQueryVariables>(CohortByIdDocument, variables, options) as Promise<CohortByIdQuery>;
    },
    CohortDataByAddress(variables?: CohortDataByAddressQueryVariables, options?: C): Promise<CohortDataByAddressQuery> {
      return requester<CohortDataByAddressQuery, CohortDataByAddressQueryVariables>(CohortDataByAddressDocument, variables, options) as Promise<CohortDataByAddressQuery>;
    },
    Initiates(variables?: InitiatesQueryVariables, options?: C): Promise<InitiatesQuery> {
      return requester<InitiatesQuery, InitiatesQueryVariables>(InitiatesDocument, variables, options) as Promise<InitiatesQuery>;
    },
    InitiatesByCohortId(variables?: InitiatesByCohortIdQueryVariables, options?: C): Promise<InitiatesByCohortIdQuery> {
      return requester<InitiatesByCohortIdQuery, InitiatesByCohortIdQueryVariables>(InitiatesByCohortIdDocument, variables, options) as Promise<InitiatesByCohortIdQuery>;
    },
    InitiatesByCohortAddress(variables?: InitiatesByCohortAddressQueryVariables, options?: C): Promise<InitiatesByCohortAddressQuery> {
      return requester<InitiatesByCohortAddressQuery, InitiatesByCohortAddressQueryVariables>(InitiatesByCohortAddressDocument, variables, options) as Promise<InitiatesByCohortAddressQuery>;
    },
    Metrics(variables?: MetricsQueryVariables, options?: C): Promise<MetricsQuery> {
      return requester<MetricsQuery, MetricsQueryVariables>(MetricsDocument, variables, options) as Promise<MetricsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;