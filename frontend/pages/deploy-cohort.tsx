import React, { useState, ReactNode } from "react";
import { useAccount } from "wagmi";
import { Box, Flex } from "@raidguild/design-system";
import DeployCohortPt1 from "forms/deployCohortPt1";

// import DeployCohortForm from "forms/deployCohortForm";
import BoxHeader from "components/BoxHeader";

interface DeployCohortProps {
  children: ReactNode;
}

const DeployCohort: React.FC<DeployCohortProps> = ({ children }) => {
  const [displayPart1, setDisplayPart1] = useState(true);
  const [displayPart2, setDisplayPart2] = useState(false);
  const [displayPart3, setDisplayPart3] = useState(false);
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
          <DeployCohortPt1 setDisplay={setDisplayPart1} />
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
