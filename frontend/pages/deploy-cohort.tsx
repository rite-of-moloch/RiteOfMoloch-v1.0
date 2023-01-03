import React, { useState, ReactNode } from "react";
import { useAccount } from "wagmi";
import { Box, Flex } from "@raidguild/design-system";
import DeployCohortPt1 from "../forms/deployCohortPt1";
import DeployCohortPt2 from "../forms/deployCohortPt2";
import DeployCohortPt3 from "../forms/deployCohortPt3";
import { useFormContext } from "context/FormContext";

import BoxHeader from "components/BoxHeader";

interface DeployCohortProps {
  children: ReactNode;
}

const DeployCohort: React.FC<DeployCohortProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const { setDisplayPart1, setDisplayPart2, setDisplayPart3 } =
    useFormContext();
  return (
    <Flex
      minH="350px"
      minW="80%"
      direction="column"
      alignItems="center"
      fontFamily="spaceMono"
      px="2rem"
    >
      {isConnected && (
        <Box>
          <DeployCohortPt1 />
          <DeployCohortPt2 />
          <DeployCohortPt3 />
        </Box>
      )}
      {!isConnected && (
        <BoxHeader text="Connect your wallet to deploy a cohort" />
      )}
      {children}
    </Flex>
  );
};

export default DeployCohort;
