import React, { FC, ReactNode } from "react";
import { Box, SimpleGrid, Stack, VStack } from "@raidguild/design-system";
import CohortDetail from "components/cohortDetail";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { useSubgraphReactQuery } from "hooks/useSubgraphReactQuery";
import { cohorts } from "utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";
import { performQuery } from "utils/subgraph/helpers";
import { unixToUTC } from "utils/general";

interface ReviewOngoingCohortProps {
  children?: ReactNode;
}

const reviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const cohortList = useSubgraphQuery(cohorts(0, 10));
  const cohort: Cohort[] | null = cohortList.data?.cohorts;

  // const { data, isLoading, error } = useSubgraphReactQuery("cohorts", true);
  // console.log(data, isLoading, error);
  const runQuery = () => {
    let query = performQuery("cohorts");
    console.log(query);
    return query;
  };
  runQuery();

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
      <Stack spacing={6} w={["full", "full", "80%"]} my={6}>
        <SimpleGrid
          columns={4}
          fontFamily="texturina"
          justifyContent="center"
          alignItems="center"
          spacingX={2}
          mb={-3}
          w="full"
        >
          <Box justifySelf="start">Address</Box>
          <Box justifySelf="center">Stake</Box>
          <Box justifySelf="center">Staking Date</Box>
          <Box />
        </SimpleGrid>
        {renderCohorts}
      </Stack>
    </>
  );
};

export default reviewOngoingCohort;
