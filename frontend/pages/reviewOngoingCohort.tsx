import React, { FC } from "react";
import { Box, Flex, Heading, SimpleGrid } from "@raidguild/design-system";
import CohortMemberDetails from "components/cohortMemberDetails";
import { useSubgraphQuery } from "../hooks/useSubgraphQuery";
import { cohorts, cohortMetadata } from "../utils/subgraph/queries";

interface ReviewOngoingCohortProps {
  children?: any;
}

const reviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const cohortList = useSubgraphQuery(cohorts(0, 10));
  console.log(cohortList);
  // console.log(cohorts(0, 0));

  return (
    <>
      <Flex direction="column">
        <Heading as="h3" my="1rem" color="red">
          Cohort Name
        </Heading>
        {/* header */}
        {/* <SimpleGrid
          columns={5}
          justifyContent="center"
          alignItems="center"
          py={1}
          px={2}
        >
          <Box>Cohort Member</Box>
          <Box>Address</Box>
          <Box>Stake</Box>
          <Box>Staking Date</Box>
          <Box />
        </SimpleGrid> */}
        <CohortMemberDetails />
      </Flex>
    </>
  );
};

export default reviewOngoingCohort;
