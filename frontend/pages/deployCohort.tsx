import React from "react";
import { useAccount } from "wagmi";
import { Box } from "@raidguild/design-system";
import ProgressBar from "components/ProgressBar";
import DeployCohortPt1 from "../forms/deployCohortPt1";
import DeployCohortPt2 from "../forms/deployCohortPt2";
import DeployCohortPt3 from "../forms/deployCohortPt3";
import PreviewNewCohort from "forms/previewNewCohort";
import { useFormContext } from "context/FormContext";
import NotConnected from "components/NotConnected";

const DeployCohort = () => {
  const { isConnected } = useAccount();
  const { displayPreviewNewCohort } = useFormContext();

  return (
    <>
      {!isConnected && <NotConnected />}
      <Box>
        {isConnected && (
          <>
            <Box>
              <Box mb={8} display={displayPreviewNewCohort ? "none" : ""}>
                <ProgressBar />
              </Box>
              <DeployCohortPt1 />
              <DeployCohortPt2 />
              <DeployCohortPt3 />
              <PreviewNewCohort />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default DeployCohort;
