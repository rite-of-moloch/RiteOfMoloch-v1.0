/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, HStack, Heading, Stack } from "@raidguild/design-system";
import { useAccount } from "wagmi";
import { useGetDeadline } from "hooks/useGetDeadline";
import useRiteBalanceOf from "hooks/useRiteBalanceOf";
import RiteStaked from "components/RiteStaked";
import StakingFlow from "components/StakingFlow";
import NotConnected from "components/NotConnected";
import { useRouter } from "next/router";
import useContractAddress from "hooks/useContractAddress";

const Stake: React.FC = (): any => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const { address: cohortAddress } = router.query;
  // const contractAddressROM = cohortAddress || useContractAddress("riteOfMolochAddress");

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  const deadline: string = useGetDeadline(cohortAddress?.toString() || "", [
    userAddress(),
  ]);

  const riteBalance: string = useRiteBalanceOf(
    cohortAddress?.toString() || "",
    [userAddress()]
  );

  const hasRite = (): boolean => {
    let rites = Number(riteBalance);
    if (rites > 0) {
      return true;
    } else if (rites === 0 || !rites) {
      return false;
    } else {
      return false;
    }
  };

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
          {isConnected && !hasRite() && (
            <Stack w="full" pt="3rem" pb="2rem">
              <Box
                bg="black"
                borderTop="solid red 1px"
                borderBottom="solid red 1px"
                py={1}
              >
                <Heading as="h2" fontSize="md" textAlign="center">
                  {cohortAddress}
                </Heading>
              </Box>
              <Box w={["80%", "80%", "60%"]} alignSelf="center" py="1rem">
                <StakingFlow contractAddress={cohortAddress || ""} />
              </Box>

              {isConnected && hasRite() && (
                <RiteStaked
                  riteBalance={riteBalance}
                  deadline={deadline}
                  contractAddress={cohortAddress || ""}
                />
              )}
            </Stack>
          )}
        </HStack>
      )}
    </>
  );
};

export default Stake;
