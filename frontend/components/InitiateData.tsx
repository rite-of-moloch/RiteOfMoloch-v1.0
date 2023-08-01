import { Box, Tooltip } from "@raidguild/design-system";
import React from "react";
import { useNetwork } from "wagmi";
import BlockExplorerLink from "./blockExplorer/BlockExplorerLink";
import CohortMemberModal from "./cohort/CohortMemberModal";
import GridTemplate from "./GridTemplate";

export type MemberData = {
  address: `0x${string}`;
  cohortAddress: `0x${string}`;
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
