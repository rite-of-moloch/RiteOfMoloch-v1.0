import { Box, Link, SimpleGrid } from "@raidguild/design-system";
import React from "react";
import { MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import CohortMemberModal from "./cohortMemberModal";

const InitiateData: React.FC<MemberData> = ({
  address,
  id,
  joinedAt,
  stake,
}) => {
  const { chain } = useNetwork();

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address.slice(0, 4)}...{address.slice(-6)}
    </Link>
  );

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
      <Box justifySelf="start">{blockExplorerLink(address)}</Box>
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
