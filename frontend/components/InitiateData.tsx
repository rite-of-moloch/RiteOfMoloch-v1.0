import { Box, Link, SimpleGrid } from "@raidguild/design-system";
import React from "react";
import { MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import BlockExplorerLink from "./BlockExplorerLink";
import CohortMemberModal from "./cohortMemberModal";

const InitiateData: React.FC<MemberData> = ({
  address,
  id,
  joinedAt,
  stake,
}) => {
  const { chain } = useNetwork();

  return (
    <SimpleGrid
      columns={4}
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
      <Box justifySelf="start">{BlockExplorerLink(chain, address)}</Box>
      <Box justifySelf="center">{stake}</Box>
      <Box justifySelf="center">{joinedAt}</Box>
      <Box justifySelf="end">
        <CohortMemberModal
          address={address}
          id={id}
          joinedAt={joinedAt}
          stake={stake}
        />
      </Box>
    </SimpleGrid>
  );
};

export default InitiateData;
