import { Box, Link, Text, Tooltip } from "@raidguild/design-system";
import React from "react";
import useCohortName from "hooks/useCohortName";
import { useNetwork } from "wagmi";
import BlockExplorerLink from "./BlockExplorerLink";
import CohortMemberModal from "./cohortMemberModal";
import GridTemplate from "./GridTemplate";

interface InitiatesAllProps {
  address: string;
  cohortId: string;
  stake: string;
  joinedAt: string;
}

/**
 * @remarks this is used to render initiates from the INITIATES subgraphquery. InitiatesAll (this) component gets rendered in Initiates page
 * @param param0
 * @returns
 */
const InitiatesAll: React.FC<InitiatesAllProps> = ({
  address,
  cohortId,
  stake,
  joinedAt,
}) => {
  const { chain } = useNetwork();
  const cohortName = useCohortName(cohortId);

  return (
    <GridTemplate
      column1={
        <Tooltip label={address} shouldWrapChildren hasArrow placement="bottom">
          {BlockExplorerLink(chain, address)}
        </Tooltip>
      }
      column2={
        <Tooltip
          label={cohortId}
          shouldWrapChildren
          hasArrow
          placement="bottom"
        >
          <Link
            href={`${chain?.blockExplorers?.default.url}/address/${cohortId}`}
            isExternal
          >
            {cohortName?.toString()}
          </Link>
        </Tooltip>
      }
      column3={<Text>{stake}</Text>}
      column4={<Text>{joinedAt}</Text>}
      column5={
        <Box justifySelf="end">
          <CohortMemberModal
            address={address}
            cohortAddress={cohortId}
            joinedAt={joinedAt}
            stake={stake}
          />
        </Box>
      }
    />
  );
};

export default InitiatesAll;
