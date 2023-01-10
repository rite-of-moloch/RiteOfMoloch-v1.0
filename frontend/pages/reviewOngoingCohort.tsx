import React, { FC } from "react";
import { Box, Heading } from "@raidguild/design-system";
import CohortMemberDetails from "components/cohortMemberDetails";

interface ReviewOngoingCohortProps {
  children?: any;
}

const reviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  return (
    <Box fontFamily="uncial">
      <Heading as="h2">Cohort Name</Heading>
      <CohortMemberDetails />
    </Box>
  );
};

export default reviewOngoingCohort;
