import React, { FC } from "react";
import { Box, Button, SimpleGrid, Link } from "@raidguild/design-system";
import { useNetwork } from "wagmi";
import { useRouter } from "next/router";

interface CohortDetailProps {
  address: string;
  stake: string;
  stakingDate: string;
  memberOrAdmin: string | number;
}

/**
 *
 * @param address cohort address
 * @param stake required stake (tokenAmount variable)
 * @param stakingDate calculated with createdAt * time
 * @param memberOrAdmin 'admin' can view cohort initiates. 'member' can view cohort details and stake to cohort
 *
 * @returns grid with cohort data. Gets rendered on ../index.tsx
 */

const CohortDetail: FC<CohortDetailProps> = ({
  address,
  stake,
  stakingDate,
  memberOrAdmin,
}) => {
  const { chain } = useNetwork();

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {`${address?.slice(0, 4)}...${address?.slice(-6)}`}
    </Link>
  );

  return (
    <>
      <SimpleGrid
        columns={4}
        fontFamily="texturina"
        border="1px red solid"
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
          <Link
            href={
              memberOrAdmin === "member"
                ? `/joinCohorts/${address}`
                : `/cohorts/${address}`
            }
          >
            <Button size="xs">
              {memberOrAdmin === "admin" ? "Manage" : "Details"}
            </Button>
          </Link>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default CohortDetail;
