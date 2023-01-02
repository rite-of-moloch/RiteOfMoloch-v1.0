import { Box } from "@raidguild/design-system";
import React, { ReactNode } from "react";

interface PreviewNewCohortProps {
  children: ReactNode;
}

const PreviewNewCohort: React.FC<PreviewNewCohortProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default PreviewNewCohort;
