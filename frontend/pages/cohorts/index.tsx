import React, { FC, ReactNode } from "react";
import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@raidguild/design-system";
import CohortDetail from "components/cohortDetail";
import { useSubgraphReactQuery } from "hooks/useSubgraphReactQuery";
import { COHORTS } from "utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";
import { unixToUTC } from "utils/general";
import BackButton from "components/BackButton";
import { useAccount } from "wagmi";
import NotConnected from "components/NotConnected";

interface ReviewOngoingCohortProps {
  children?: ReactNode;
}

const reviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const cohortList = useSubgraphReactQuery(COHORTS(), true);

  /**
   * !isLoading: hook has fetched data.
   * isLoading: hook has not yet fetched data
   */
  const isLoading = cohortList.isLoading;

  const cohort: Cohort[] | undefined = cohortList?.data?.cohorts;

  const renderCohorts = cohort?.map((cohort: Cohort) => {
    const deadline = (
      Number(cohort.createdAt) +
      Number(cohort.time) * 1000
    ).toString();

    return (
      <CohortDetail
        address={cohort.id}
        stake={cohort.tokenAmount}
        stakingDate={unixToUTC(deadline)}
        key={cohort.id}
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

export default reviewOngoingCohort;
