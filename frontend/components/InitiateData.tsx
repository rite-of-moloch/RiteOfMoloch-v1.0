import { Box, Tooltip } from "@raidguild/design-system";
import React from "react";
import { useNetwork } from "wagmi";
import BlockExplorerLink from "./BlockExplorerLink";
import CohortMemberModal from "./cohortMemberModal";
import GridTemplate from "./GridTemplate";

export type MemberData = {
  address: string;
  cohortAddress: string;
  id: string;
  joinedAt: string;
  stake: string;
};

const InitiateData: React.FC<MemberData> = ({
  address,
  cohortAddress,
  joinedAt,
  stake,
}) => {
  const { chain } = useNetwork();

  return (
    <GridTemplate
      column1={
        <Tooltip label={address} shouldWrapChildren hasArrow placement="bottom">
          {BlockExplorerLink(chain, address)}
        </Tooltip>
      }
      column2={stake}
      column3={joinedAt}
      column4={
        <Box justifySelf="end">
          <CohortMemberModal
            address={address}
            cohortAddress={cohortAddress}
            joinedAt={joinedAt}
            stake={stake}
          />
        </Box>
      }
    />
  );
};

export default InitiateData;
