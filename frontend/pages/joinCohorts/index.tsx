import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import BackButton from "components/BackButton";
import CohortDetail from "components/CohortDetail";
import NotConnected from "components/NotConnected";
import SearchCohorts from "components/SearchCohorts";
import SelectCohortOptions from "components/SelectCohortOptions";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import React, { ReactNode, useState } from "react";
import { getDeadline, unixToUTC } from "utils/general";
import { COHORTS } from "utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";
import { useAccount } from "wagmi";

interface JoinCohortsProps {
  children?: ReactNode;
}

/**
 * @remarks Non-admin page. Page for prospective and cohort members
 */
const JoinCohorts: React.FC<JoinCohortsProps> = ({ children }) => {
  const [searchResult, getSearchResults] = useState<string | null>();
  const [cohortSelection, setCohortSelection] = useState<string | null>();

  const { isConnected } = useAccount();

  const cohortList = useSubgraphQuery(COHORTS(), true);

  /**
   * @remarks `!isLoading`: hook has fetched data. `isLoading`: hook has not yet fetched data
   */
  const isLoading = cohortList.isLoading;

  const cohort: Cohort[] | undefined = cohortList?.data?.cohorts;
  console.log(cohort);

  const handleSearchResults = (result: string) => {
    getSearchResults(result);
    console.log(searchResult);
  };

  const handleCohortSelection = (result: string) => {
    setCohortSelection(result);
    console.log(cohortSelection);
  };

  // TODO: build filter for renderCohorts that takes filters `searchResult`. If cohort.id includes searchResult || if cohort.token includes searchResult, render. (or if cohort includes anything from the result render it)
  // TODO: add results from `cohortSelection` into filter search
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
        memberOrAdmin={"member"}
      />
    );
  });

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
          <Heading as="h1" textAlign="center" color="#FF3864">
            Active Cohorts
          </Heading>
          {!isLoading && (
            <>
              {/* TODO: fix search bar */}
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
                <Box justifySelf="center">Required Stake</Box>
                <Box justifySelf="center">Staking Date</Box>
                <Box />
              </SimpleGrid>
            </>
          )}
          {isLoading && (
            <>
              <Flex>
                <Box mr={2} w="50%" pt={2}>
                  <SelectCohortOptions
                    handleCohortSelection={handleCohortSelection}
                  />
                </Box>
                <Box ml={2} w="50%" alignItems="center">
                  <SearchCohorts handleSearchResults={handleSearchResults} />
                </Box>
              </Flex>
              <Box w="full" textAlign="center" p={2} fontFamily="texturina">
                <Spinner size="xl" my="50" color="red" emptyColor="purple" />
                <Text>Loading cohorts...</Text>
              </Box>
            </>
          )}
          {renderCohorts}
        </Stack>
      )}
      {isConnected && !isLoading && <BackButton path="/" />}
      {children}
    </>
  );
};

export default JoinCohorts;
