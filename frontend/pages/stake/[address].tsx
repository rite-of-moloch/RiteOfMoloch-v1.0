/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Box,
  HStack,
  Heading,
  Stack,
  Link,
  Text,
} from "@raidguild/design-system";
import { useAccount, useNetwork } from "wagmi";
import { useRiteBalanceOf } from "hooks/useRiteOfMoloch";
import RiteStaked from "components/stake/RiteStaked";
import StakingFlow from "components/stake/StakingFlow";
import NotConnected from "components/wallet/NotConnected";
import { useRouter } from "next/router";
import { utils } from "ethers";
import BackButton from "components/BackButton";
import { useCohortByAddress } from "hooks/useCohort";

const Stake: React.FC = (): any => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const { address: cohortAddress } = router.query;

  const { cohorts } = useCohortByAddress(cohortAddress as string);

  const cohort = cohorts?.cohorts?.[0];
  const deadline = cohort?.joinEndTime;

  const { riteBalance } = useRiteBalanceOf(cohortAddress as `0x${string}`, [
    address || "",
  ]);

  const isStaked = riteBalance?.gt(0);

  /**
   * if dynamic cohortAddress isn't valid ETH address, redirect back to joinCohorts page
   */
  useEffect(() => {
    if (cohort?.address && !utils.isAddress(cohort?.address)) {
      router.push("/joinCohorts");
    }
  }, [router]);

  if (!isConnected) {
    return <NotConnected />;
  }

  /**
   * RiteStaked shown if user has staked, but wants to sponsor another address.
   * RiteStaked also renders StakingFlow
   */
  return (
    <>
      <HStack
        direction="column"
        border="1px solid red"
        rounded="lg"
        bg="gradientSBTPrev"
        w={["full", "full", "80%"]}
        justifyContent="center"
        alignContent="center"
        my="1rem"
      >
        {isStaked ? (
          <RiteStaked
            riteBalance={riteBalance?.toString() || "N/A"}
            deadline={deadline.toLocaleString()}
            contractAddress={cohort?.address || "N/A"}
          />
        ) : (
          <Stack w="full" pt="3rem" pb="2rem">
            <Box
              bg="black"
              borderTop="solid red 1px"
              borderBottom="solid red 1px"
              pt={1}
              pb={2}
            >
              <Heading as="h2" fontSize="md" textAlign="center">
                <Link
                  href={`${chain?.blockExplorers?.default.url}/address/${cohortAddress}`}
                  isExternal
                >
                  <Text>{cohort?.name}</Text>
                </Link>
              </Heading>
            </Box>
            <Box w={["80%", "80%", "60%"]} alignSelf="center" py="1rem">
              <StakingFlow contractAddress={cohortAddress as `0x${string}`} />
            </Box>
          </Stack>
        )}
      </HStack>
      <BackButton path={`/joinCohorts/${cohortAddress}`} />
    </>
  );
};

export default Stake;
