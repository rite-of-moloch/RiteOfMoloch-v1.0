import React, { ReactNode } from "react";
import { useAccount } from "wagmi";
import { Box, Flex } from "@raidguild/design-system";
import ProgressBar from "components/ProgressBar";
import DeployCohortPt1 from "../forms/deployCohortPt1";
import DeployCohortPt2 from "../forms/deployCohortPt2";
import DeployCohortPt3 from "../forms/deployCohortPt3";
import PreviewNewCohort from "forms/previewNewCohort";
import { useFormContext } from "context/FormContext";
import NotConnected from "components/NotConnected";

interface DeployCohortProps {
  children?: ReactNode;
}

const DeployCohort: React.FC<DeployCohortProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const { displayPreviewNewCohort } = useFormContext();

  return (
    <>
      {!isConnected && <NotConnected />}
      <Flex>
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

        {children}
      </Flex>
    </>
  );
};

export default DeployCohort;
