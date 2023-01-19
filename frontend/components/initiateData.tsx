import { Box, Link, SimpleGrid } from "@raidguild/design-system";
import { FC } from "react";
import { MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";

const InitiateData: FC<MemberData> = ({ address, id, joinedAt, stake }) => {
  const { chain } = useNetwork();

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address.slice(0, 4)}....{address.slice(-4)}
    </Link>
  );

  return (
    <SimpleGrid
      columns={3}
      bg="black"
      border="1px solid red"
      p={2}
      rounded="lg"
    >
      <Box justifySelf="start">{blockExplorerLink(address)}</Box>
      <Box justifySelf="center">{joinedAt}</Box>
      <Box justifySelf="end">{stake}</Box>
    </SimpleGrid>
  );
};

export default InitiateData;
