import React, { FC, ReactNode } from "react";
import { Box, Button, SimpleGrid } from "@raidguild/design-system";

interface CohortMemberDetailsProps {
  children?: ReactNode;
}
const cohortMemberDetails: FC<CohortMemberDetailsProps> = ({ children }) => {
  return (
    <SimpleGrid columns={5}>
      <Box>Cohort Member</Box>
      <Box>Address</Box>
      <Box>Stake</Box>
      <Box>Staking Date</Box>
      <Box>
        <Button>Manage</Button>
      </Box>
    </SimpleGrid>
  );
};

export default cohortMemberDetails;
