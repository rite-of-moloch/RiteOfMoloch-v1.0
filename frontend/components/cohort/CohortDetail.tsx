import React from "react";
import { Button, Link, Text, HStack } from "@raidguild/design-system";
import { useNetwork } from "wagmi";
import { useTokenSymbol } from "hooks/useERC20";
import GridTemplate from "../GridTemplate";
import { useCohortByAddress } from "hooks/useCohort";
import { utils } from "ethers";
import { useDecimalOf } from "hooks/useERC20";
import { DateTime } from "luxon";

interface CohortDetailProps {
  address: string;
  memberOrAdmin: string | number;
}

/**
 *
 * @param address cohort address
 * @param memberOrAdmin 'admin' can view cohort initiates. 'member' can view cohort details and stake to cohort
 *
 * @returns grid with cohort data. Gets rendered on ../index.tsx
 */

const CohortDetail: React.FC<CohortDetailProps> = ({
  address,
  memberOrAdmin,
}) => {
  const { chain } = useNetwork();
  const { cohorts } = useCohortByAddress(address);

  const cohort = cohorts?.cohorts?.[0];
  const stake = cohort?.minimumStake;
  const stakingAsset = cohort?.stakingToken;
  const { tokenSymbol } = useTokenSymbol(stakingAsset);
  const stakingDate = DateTime.fromSeconds(
    +cohort?.joinEndTime
  ).toLocaleString();
  let { decimals } = useDecimalOf(cohort?.stakingToken as `0x${string}`);
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
            <Text>
              {stake && decimals ? utils.formatUnits(stake, decimals) : "N/A"}
            </Text>
            <Text ml="0.25rem">{`${tokenSymbol ?? "N/A"}`}</Text>
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
