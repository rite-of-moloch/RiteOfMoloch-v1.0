import { QueryBuilder } from "../types/subgraph";

export const MY_QUERY = `
query {
  cohorts(first: 5) {
    id
    deployer
    dao
    token
  }
}
`;

export const cohorts: QueryBuilder = (skip: number, first: number) => `
    query {
        cohorts(skip: ${skip}, first: ${first}) {
            id
            time
            token
            tokenAmount
            dao
            createdAt
        }
    }
`;

/// @notice joinedAt is a unix timestamp
export const cohortInitiates: QueryBuilder = (
  cohortId: string,
  skip: number,
  first: number
) => `
    query {
        cohort(id: "${cohortId}") {
                initiates (skip: ${skip}, first: ${first}){
                    id
                    address
                    joinedAt
                    stake
            }
        }
    }
`;

/// @notice createdAt is a unix timestamp. time is how far in seconds the deadline is from createdAt
export const cohortMetadata: QueryBuilder = (id: string) => `
    query {
        cohort(id: "${id}") {
            id
            time
            token
            tokenAmount
            dao
            createdAt
        }
    }
`;
