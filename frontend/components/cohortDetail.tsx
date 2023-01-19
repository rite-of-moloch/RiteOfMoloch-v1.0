import React, { FC } from "react";
import { Box, Button, SimpleGrid, Link } from "@raidguild/design-system";

import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { useNetwork } from "wagmi";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {`${address?.slice(0, 4)}...${address?.slice(-4)}`}
    </Link>
  );

  const handleManageCohort = () => {
    router.push({
      pathname: `/cohorts/${address}`,
      query: { pid: address },
    });
  };

  return (
    <>
      <SimpleGrid
        columns={4}
        border="1px #FF3864 solid"
        justifyContent="center"
        alignItems="center"
        bg="black"
        py={3}
        px={4}
        rounded="md"
        spacingX={3}
        w="full"
      >
        {/* <Box justifySelf="start">{cohortName}</Box> */}
        <Box justifySelf="center">{blockExplorerLink(address)}</Box>
        <Box justifySelf="center">{stake}</Box>
        <Box justifySelf="center">{stakingDate}</Box>
        <Box justifySelf="end">
          <Button size="xs" onClick={handleManageCohort}>
            Manage
          </Button>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default CohortDetail;
