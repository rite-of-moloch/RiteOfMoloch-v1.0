import React, { FC, ReactNode } from "react";
import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  VStack,
} from "@raidguild/design-system";
import CohortDetail from "components/cohortDetail";
import { useSubgraphReactQuery } from "hooks/useSubgraphReactQuery";
import { COHORTS } from "utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";
import { performQuery } from "utils/subgraph/helpers";
import { unixToUTC } from "utils/general";

interface ReviewOngoingCohortProps {
  children?: ReactNode;
}

const reviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const cohortList = useSubgraphReactQuery(COHORTS(), true);
  const cohort: Cohort[] | null = cohortList.data?.cohorts;

  const renderCohorts = cohort?.map((cohort: Cohort) => {
    // console.log("cohort", cohort);
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
      <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
        <Heading as="h1" textAlign="center" color="#FF3864">
          Cohorts
        </Heading>
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
        {renderCohorts}
      </Stack>
      <Box w={["full", "full", "80%"]}>
        <Box w={["25%"]} alignSelf="start" my={"2rem"}>
          <Link href="/admin">
            <Button w="full" variant="outline">
              back
            </Button>
          </Link>
        </Box>
      </Box>
      {children}
    </>
  );
};

export default reviewOngoingCohort;
