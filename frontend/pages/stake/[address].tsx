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
import useRiteBalanceOf from "hooks/useRiteBalanceOf";
import RiteStaked from "components/RiteStaked";
import StakingFlow from "components/StakingFlow";
import NotConnected from "components/NotConnected";
import { useRouter } from "next/router";
import { utils } from "ethers";
import BackButton from "components/BackButton";
import { getDeadline, getHasRite } from "utils/general";
import useCohortName from "hooks/useCohort";
import useCohort from "hooks/useCohort";

const Stake: React.FC = (): any => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const { address: cohortAddress } = router.query;

  const cohort = useCohort((cohortAddress as string) || "");

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  const deadline = getDeadline(cohort?.createdAt, cohort?.time);

  const riteBalance = useRiteBalanceOf(cohortAddress?.toString() || "", [
    userAddress(),
  ]);

  const isStaked = getHasRite(riteBalance);

  const cohortName = useCohortName(cohort?.address?.toString() || "");

  /**
   * if dynamic cohortAddress isn't valid ETH address, redirect back to joinCohorts page
   */
  useEffect(() => {
    if (cohortAddress) {
      if (!utils.isAddress(cohort?.address)) {
        router.push("/joinCohorts");
      }
    }
  }, [router]);

  /**
   * RiteStaked shown if user has staked, but wants to sponsor another address.
   * RiteStaked also renders StakingFlow
   */
  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
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
          {isConnected && !isStaked && (
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
                    <Text>{cohortName}</Text>
                  </Link>
                </Heading>
              </Box>
              <Box w={["80%", "80%", "60%"]} alignSelf="center" py="1rem">
                <StakingFlow contractAddress={cohort?.address || ""} />
              </Box>
            </Stack>
          )}
          {isConnected && isStaked && (
            <RiteStaked
              riteBalance={riteBalance?.toString() || ""}
              deadline={deadline}
              contractAddress={cohort?.address || ""}
            />
          )}
        </HStack>
      )}
      {isConnected && <BackButton path={`/joinCohorts/${cohortAddress}`} />}
    </>
  );
};

export default Stake;
