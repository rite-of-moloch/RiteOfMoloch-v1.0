import { QueryBuilder } from "../types/subgraph";

export const MY_QUERY = `
query {
  cohorts(first: 5) {
    id
    deployer
    dao
    token
    sbtUrl
  }
}
`;

// skip = starting index
export const COHORTS: QueryBuilder = () => `
    query {
        cohorts {
            id
            time
            token
            tokenAmount
            dao
            createdAt
            sbtUrl
            admin1
            admin2
        }
    }
`;

/// @notice joinedAt is a unix timestamp
export const COHORT_INITIATES: QueryBuilder = (cohortId: string) => `
      query {
          cohort(id: "${cohortId}") {
                  initiates {
                      id
                      address
                      joinedAt
                      stake
              }
          }
      }
  `;

/// @notice createdAt is a unix timestamp. time is how far in seconds the deadline is from createdAt
export const COHORT_METADATA: QueryBuilder = (id: string) => `
    query {
        cohort(id: "${id}") {
            id
            time
            token
            tokenAmount
            dao
            createdAt
            sbtUrl
            admin1
            admin2
        }
    }
`;

/// @notice provides aggregate metrics on the cohorts
export const METRICS: QueryBuilder = () => `
  query {
      metric(id: "0") {
        averageCohortSize
        claimRate
        claimedMembers
        slashRate
        slashedMembers
        totalCohorts
        totalMembers
      }
  }
`;

/// @return totalMembers: cohort size
export const COHORT_METRICS_CARD: QueryBuilder = (id: string) => `
  query {
    cohort(id: "${id}") {
      initiates(orderBy: joinedAt, orderDirection: asc) {
        joinedAt
      }
      token
      treasury
      sbtUrl
      createdAt
      totalMembers
      successPercentage
      slashedMembers
    }
  }
`;


/// @return id is `${INITIATE_ADDRESS}-${COHORT_ADDRESS}`
export const INITIATES: QueryBuilder = () => `
  query {
    initiates {
      id
      address
      tokenId
      stake
      joinedAt
      claimed
      sacrificed
    }
  }
`;

/// @return cohorts an admin oversees.
export const COHORTS_FOR_ADMIN: QueryBuilder = (address: string) => `
  query {
    cohorts(
      where: {
        or: 
        [
          {admin1:"${address}"},
          {admin2:"${address}"}
        ]
      }) 
      {
		    id
      }
    }
  }
`;


/// @return admins of a given cohort 
export const COHORT_ADMINS: QueryBuilder = (id: string) => `
  query {
    cohort(id: "${id}") {
      id
      admin1
      admin2
  }
`


