import React, { ReactNode } from "react";
import { useAccount } from "wagmi";
import { Box, Flex } from "@raidguild/design-system";
import ProgressBar from "components/ProgressBar";
import DeployCohortPt1 from "../forms/deployCohortPt1";
import DeployCohortPt2 from "../forms/deployCohortPt2";
import DeployCohortPt3 from "../forms/deployCohortPt3";
import PreviewNewCohort from "forms/previewNewCohort";
import BoxHeader from "components/BoxHeader";
import { useFormContext } from "context/FormContext";

interface DeployCohortProps {
  children: ReactNode;
}

const DeployCohort: React.FC<DeployCohortProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const { displayPreviewNewCohort } = useFormContext();

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
          <Box mb={8} display={displayPreviewNewCohort ? "none" : ""}>
            <ProgressBar />
          </Box>
          <DeployCohortPt1 />
          <DeployCohortPt2 />
          <DeployCohortPt3 />
          <PreviewNewCohort />
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
