import React, { FC } from "react";
import { Box, Button, SimpleGrid, Link } from "@raidguild/design-system";

import { useNetwork } from "wagmi";
import { useRouter } from "next/router";

interface CohortDetailProps {
  address: string;
  stake: number | string;
  stakingDate: string;
}

/**
 *
 * @param address cohort address
 * @param stake required stake (tokenAmount variable)
 * @param stakingDate calculated with createdAt * time
 *
 * @returns grid with cohort data. Gets rendered on ../index.tsx
 */

const CohortDetail: FC<CohortDetailProps> = ({
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
      {`${address?.slice(0, 4)}...${address?.slice(-6)}`}
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
        fontFamily="texturina"
        border="1px #FF3864 solid"
        justifyContent="center"
        alignItems="center"
        bg="black"
        px={4}
        pt={2}
        pb={3}
        rounded="md"
        spacingX={2}
      >
        <Box justifySelf="start">{blockExplorerLink(address)}</Box>
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
