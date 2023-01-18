import React, { FC, ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
} from "@raidguild/design-system";
import CohortDetail from "../components/cohortDetail";
import { useSubgraphQuery } from "../hooks/useSubgraphQuery";
import { cohorts } from "../utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";

interface ReviewOngoingCohortProps {
  children?: ReactNode;
}

const reviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const cohortList: Cohort | any = useSubgraphQuery(cohorts(0, 10));
  const cohort = cohortList?.data?.cohorts;
  // console.log(cohort);

  const renderCohorts = cohort
    ? cohort.map((cohort: { [x: string]: string }) => {
        return (
          <CohortDetail
            cohortName={cohort.id}
            address={cohort.id}
            stake={cohort.time}
            stakingDate={cohort.tokenAmount}
            key={cohort.id}
          />
        );
      })
    : null;

  return (
    <>
      <VStack spacing={6}>
        <Heading as="h4" fontSize="xl" alignSelf="start" my={1} color="red">
          Cohort Name
        </Heading>
        {renderCohorts}
      </VStack>
    </>
  );
};

export default reviewOngoingCohort;
