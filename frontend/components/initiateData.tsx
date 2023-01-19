import { Box, Button, Link, SimpleGrid } from "@raidguild/design-system";
import { FC } from "react";
import { MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import CohortMemberModal from "./cohortMemberModal";

const InitiateData: FC<MemberData> = ({ address, id, joinedAt, stake }) => {
  const { chain } = useNetwork();

  const timeUTC = (time: string) => new Date(time).toUTCString();

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
      bg="black"
      border="1px solid #FF3864"
      p={2}
      rounded="lg"
      alignItems="center"
    >
      <Box justifySelf="start">{blockExplorerLink(address)}</Box>
      <Box justifySelf="center">{stake}</Box>
      <Box justifySelf="center">{joinedAt}</Box>
      <Box justifySelf="end">
        <CohortMemberModal initiateData={{ address, id, joinedAt, stake }} />
      </Box>
    </SimpleGrid>
  );
};

export default InitiateData;
