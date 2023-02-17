import React, { FC, ReactNode, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import CohortDetail from "components/CohortDetail";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { COHORTS } from "utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";
import { getDeadline, unixToUTC } from "utils/general";
import BackButton from "components/BackButton";
import { useAccount } from "wagmi";
import NotConnected from "components/NotConnected";
import SearchCohorts from "components/SearchCohorts";

interface ReviewOngoingCohortProps {
  children?: ReactNode;
}

/**
 * Admin page. Page for admins to view active cohorts and members
 *
 */
const ReviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const [searchResult, getSearchResults] = useState<string | null>();
  const { isConnected } = useAccount();
  const cohortList = useSubgraphQuery(COHORTS(), true);

  /**
   * (!isLoading): hook has fetched data.
   * (isLoading): hook has not yet fetched data
   */
  const isLoading = cohortList.isLoading;

  const cohort: Cohort[] | undefined = cohortList?.data?.cohorts;

  const handleSearchResults = (result: string) => {
    getSearchResults(result);
    console.log(searchResult);
  };

  // TODO: build filter for renderCohorts that takes filters `searchResult`. If cohort.id includes searchResult || if cohort.token includes searchResult, render. (or if cohort includes anything from the result render it)
  const renderCohorts = cohort?.map((cohort: Cohort) => {
    /*
      * Add following filter logic into function:
      .filter({
        cohort.id.includes(searchResult) || cohort.stakingAsset.includes(searchResult) || cohort.stake.includes(searchResult)
      })
    */
    return (
      <CohortDetail
        address={cohort.id}
        stake={cohort.tokenAmount}
        stakingAsset={cohort.token}
        stakingDate={unixToUTC(getDeadline(cohort.createdAt, cohort.time))}
        key={cohort.id}
        memberOrAdmin={"admin"}
      />
    );
  });

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
          <Heading as="h1" textAlign="center" color="#FF3864">
            Cohorts
          </Heading>
          {!isLoading && (
            <>
              <Box>
                <SearchCohorts handleSearchResults={handleSearchResults} />
              </Box>
              <SimpleGrid
                columns={4}
                fontFamily="texturina"
                justifyContent="center"
                alignItems="center"
                spacingX={2}
                mb={-3}
                w="full"
              >
                <Box justifySelf="start" pl={4}>
                  Address
                </Box>
                <Box justifySelf="center">Stake</Box>
                <Box justifySelf="center">Staking Date</Box>
                <Box />
              </SimpleGrid>
            </>
          )}
          {isLoading && (
            <Box w="full" textAlign="center" p={2} fontFamily="texturina">
              <Spinner size="xl" my="50" color="red" emptyColor="purple" />
              <Text>Loading cohorts...</Text>
            </Box>
          )}
          {renderCohorts}
        </Stack>
      )}
      {isConnected && !isLoading && <BackButton path="/admin" />}
      {children}
    </>
  );
};

export default ReviewOngoingCohort;
