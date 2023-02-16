import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import BackButton from "components/BackButton";
import CohortDetail from "components/CohortDetail";
import NotConnected from "components/NotConnected";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import React, { ReactNode } from "react";
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
  const { isConnected } = useAccount();

  const cohortList = useSubgraphQuery(COHORTS(), true);

  /**
   * @remarks `!isLoading`: hook has fetched data. `isLoading`: hook has not yet fetched data
   */
  const isLoading = cohortList.isLoading;

  const cohort: Cohort[] | undefined = cohortList?.data?.cohorts;
  console.log(cohort);

  const renderCohorts = cohort?.map((cohort: Cohort) => {
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
      {isConnected && !isLoading && <BackButton path="/" />}
      {children}
    </>
  );
};

export default JoinCohorts;
