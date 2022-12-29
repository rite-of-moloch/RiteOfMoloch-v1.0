import React, { ReactNode } from "react";
import { Box, Flex, FormControl } from "@raidguild/design-system";
import ProgressBar from "../components/ProgressBar";
import DeployCohortForm from "forms/deployCohortForm";

interface DeployCohortProps {
  children: ReactNode;
}

const DeployCohort: React.FC<DeployCohortProps> = ({ children }) => {
  return (
    <Flex w={["90%", "80%", "60%", "60%"]} m="auto">
      <ProgressBar progress={30} />
      <Box>
        <DeployCohortForm />
      </Box>
    </Flex>
  );
};

export default DeployCohort;
