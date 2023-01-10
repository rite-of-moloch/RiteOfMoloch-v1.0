import React, { FC, ReactNode } from "react";
import { Box, Button, SimpleGrid, Link } from "@raidguild/design-system";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { useNetwork } from "wagmi";

interface CohortMemberDetailsProps {
  children?: ReactNode;
}
const cohortMemberDetails: FC<CohortMemberDetailsProps> = ({ children }) => {
  const { chain } = useNetwork();
  const cohortMembers = useSubgraphQuery("cohortInitiates");
  console.log(cohortMembers);
  const fillerAddr = "0x0000000000000000000000000000000000000000";

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address}
    </Link>
  );

  return (
    <>
      <SimpleGrid
        columns={5}
        border="1px red solid"
        justifyContent="center"
        alignItems="center"
        bg="black"
        py={1}
        px={2}
        rounded="md"
      >
        <Box m="auto">Initiate:</Box>
        <Box m="auto">
          {blockExplorerLink(
            `${fillerAddr.slice(0, 4)}...${fillerAddr.slice(-4)}`
          )}
        </Box>
        <Box m="auto">500 shares</Box>
        <Box m="auto">5-5-23</Box>
        <Box m="auto">
          <Button size="xs">Manage</Button>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default cohortMemberDetails;
