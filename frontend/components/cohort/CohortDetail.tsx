import React from "react";
import { Button, Link, Text, HStack } from "@raidguild/design-system";
import { useNetwork } from "wagmi";
import { useTokenSymbol } from "hooks/useERC20";
import GridTemplate from "../GridTemplate";
import { useCohortByAddress } from "hooks/useCohort";
import { utils } from "ethers";
import { useDecimalOf } from "hooks/useERC20";
import { zeroAddress } from "utils/constants";

interface CohortDetailProps {
  address: string;
  stake: string;
  stakingAsset: string;
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

const CohortDetail: React.FC<CohortDetailProps> = ({
  address,
  stake,
  stakingAsset,
  stakingDate,
  memberOrAdmin,
}) => {
  const { chain } = useNetwork();
  const { cohort } = useCohortByAddress(address);

  let decimalOf = useDecimalOf(
    (cohort?.stakingToken as `0x${string}`) || zeroAddress
  );
  if (!decimalOf) {
    decimalOf = "0";
  }

  const cohortNameLink = (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      <Text>{cohort?.name}</Text>
    </Link>
  );

  return (
    <>
      <GridTemplate
        column1={cohortNameLink}
        column2={
          <HStack>
            <Text>{utils.formatUnits(stake, decimalOf)}</Text>
            <Text ml="0.25rem">{useTokenSymbol(stakingAsset)}</Text>
          </HStack>
        }
        column3={stakingDate}
        column4={
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
        }
      />
    </>
  );
};

export default CohortDetail;
