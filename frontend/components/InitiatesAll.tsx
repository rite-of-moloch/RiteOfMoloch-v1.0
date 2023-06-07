import { Box, Link, Text, Tooltip } from "@raidguild/design-system";
import React from "react";
import { useNetwork } from "wagmi";
import BlockExplorerLink from "./BlockExplorerLink";
import CohortMemberModal from "./cohortMemberModal";
import GridTemplate from "./GridTemplate";

interface InitiatesAllProps {
  address: string;
  cohortName: string;
  cohortAddress: string;
  stake: string;
  joinedAt: string;
}

/**
 * @remarks this is used to render initiates from the INITIATES subgraphquery. InitiatesAll (this) component gets rendered in Initiates page
 * @param address - initiates EOA address
 * @param cohortId - address of cohort
 * @param stake - amount that user has staked to ROM contract
 * @param joinedAt - date that address staked to ROM contract
 * @returns grid that renders data
 */
const InitiatesAll: React.FC<InitiatesAllProps> = ({
  address,
  cohortName,
  cohortAddress,
  stake,
  joinedAt,
}) => {
  const { chain } = useNetwork();

  return (
    <GridTemplate
      column1={
        <Tooltip label={address} shouldWrapChildren hasArrow placement="bottom">
          {BlockExplorerLink(chain, address)}
        </Tooltip>
      }
      column2={
        <Tooltip
          label={cohortName}
          shouldWrapChildren
          hasArrow
          placement="bottom"
        >
          <Link
            href={`${chain?.blockExplorers?.default.url}/address/${cohortAddress}`}
            isExternal
          >
            {cohortName}
          </Link>
        </Tooltip>
      }
      column3={<Text>{stake}</Text>}
      column4={<Text>{joinedAt}</Text>}
      column5={
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

export default InitiatesAll;
