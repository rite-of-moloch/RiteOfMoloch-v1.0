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
        spacingX={3}
        w="full"
      >
        <Box justifySelf="start">{cohortName}</Box>
        <Box justifySelf="center">{blockExplorerLink(address)}</Box>
        <Box justifySelf="center">{stake}</Box>
        <Box justifySelf="center">{stakingDate}</Box>
        <Box justifySelf="end">
          <Link href={`/cohorts/${address}`}>
            <Button size="xs">Manage</Button>
          </Link>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default CohortDetail;
