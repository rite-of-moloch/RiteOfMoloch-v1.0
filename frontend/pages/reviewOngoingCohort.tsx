import React, { FC } from "react";
import { Box, Heading } from "@raidguild/design-system";

interface ReviewOngoingCohortProps {
  children?: any;
}

const reviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  return (
    <Box fontFamily="uncial">
      <Heading as="h2">Cohort Name</Heading>
    </Box>
  );
};

export default reviewOngoingCohort;
