import React, { FC, ReactNode } from "react";
import { Box, Button, SimpleGrid, Link } from "@raidguild/design-system";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { useNetwork } from "wagmi";

interface CohortDetailProps {
  cohortName: string;
  address: string;
  stake: number | string;
  stakingDate: string;
}
const CohortDetail: FC<CohortDetailProps> = ({
  cohortName,
  address,
  stake,
  stakingDate,
}) => {
  const { chain } = useNetwork();

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {`${address?.slice(0, 4)}...${address?.slice(-4)}`}
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
        <Box m="auto">{cohortName}</Box>
        <Box m="auto">{blockExplorerLink(address)}</Box>
        <Box m="auto">{stake}</Box>
        <Box m="auto">{stakingDate}</Box>
        <Box m="auto">
          <Button size="xs">Manage</Button>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default CohortDetail;
