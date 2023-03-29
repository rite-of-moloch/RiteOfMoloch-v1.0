import {
  Box,
  GridItem,
  Link,
  SimpleGrid,
  Text,
  Tooltip,
} from "@raidguild/design-system";
import React from "react";
import useCohortName from "hooks/useCohortName";
import { useNetwork } from "wagmi";
import BlockExplorerLink from "./BlockExplorerLink";
import CohortMemberModal from "./cohortMemberModal";

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
    <SimpleGrid
      columns={5}
      border="1px red solid"
      justifyContent="center"
      alignItems="center"
      bg="black"
      py={2}
      px={4}
      rounded="md"
      spacingX={2}
      w="full"
    >
      <GridItem>
        <Tooltip label={address} shouldWrapChildren hasArrow placement="bottom">
          {BlockExplorerLink(chain, address)}
        </Tooltip>
      </GridItem>
      <GridItem margin="auto">
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
      </GridItem>
      <GridItem margin="auto">
        <Text>{stake}</Text>
      </GridItem>
      <GridItem margin="auto">
        <Text>{joinedAt}</Text>
      </GridItem>
      <Box justifySelf="end">
        <CohortMemberModal
          address={address}
          cohortAddress={cohortId}
          joinedAt={joinedAt}
          stake={stake}
        />
      </Box>
    </SimpleGrid>
  );
};

export default InitiatesAll;