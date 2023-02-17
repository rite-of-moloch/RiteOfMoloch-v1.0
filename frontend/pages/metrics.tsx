import { Heading } from "@chakra-ui/layout";
import { Box } from "@raidguild/design-system";
import React, { ReactNode } from "react";

interface MetricsProps {
  children: ReactNode;
}

const Metrics: React.FC<MetricsProps> = ({ children }) => {
  return (
    <Box>
      <Heading as="h2" fontFamily="jetbrains" color="red">
        Metrics Dashboard
      </Heading>
    </Box>
  );
};

export default Metrics;
