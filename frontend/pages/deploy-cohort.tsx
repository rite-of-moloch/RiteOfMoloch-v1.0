import React, { useState, ReactNode } from "react";
import { useAccount } from "wagmi";
import { Box, Flex, FormControl } from "@raidguild/design-system";
import ProgressBar from "../components/ProgressBar";
import DeployCohortForm from "forms/deployCohortForm";
import BoxHeader from "components/BoxHeader";

interface DeployCohortProps {
  children: ReactNode;
}

const DeployCohort: React.FC<DeployCohortProps> = ({ children }) => {
  const [percent, setPercent] = useState<number>(1);
  const { isConnected } = useAccount();
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
          <Box my={10}>
            <ProgressBar progress={percent} />
          </Box>
          <Box>
            <DeployCohortForm />
          </Box>
        </Box>
      )}
      {!isConnected && (
        <BoxHeader text="Connect your wallet to deploy a cohort" />
      )}
    </Flex>
  );
};

export default DeployCohort;
