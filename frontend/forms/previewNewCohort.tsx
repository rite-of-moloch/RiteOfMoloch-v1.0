import React, { ReactNode } from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import useCreateCohort from "../hooks/useCreateCohort";
import { useNetwork } from "wagmi";

interface PreviewNewCohortProps {
  children?: ReactNode;
}

const PreviewNewCohort: React.FC<PreviewNewCohortProps> = ({ children }) => {
  // const { createCohort } = useCreateCohort();
  const { chain } = useNetwork();
  const {
    setDisplayPart3,
    setDisplayPreviewNewCohort,
    displayPreviewNewCohort,
    membershipCriteria,
    tokenAddress,
    // nameCohort,
    // sbtImage,
    nameSBT,
    symbolSBT,
    uriSBT,
    treasury,
    stakePerMember,
    // cohortSize,
    shareThreshold,
    onboardingPeriod,
    stakingPeriod,
    tophatOwnerAddress,
    tophatID,
    admin2,
    admin3,
    superadmin2,
    superadmin3,
  } = useFormContext();

  const handleBack = (): void => {
    setDisplayPart3(true);
    setDisplayPreviewNewCohort(false);
  };

  const handleDeployCohort = () => {
    const initData = [
      membershipCriteria, // Moloch DAO address
      tokenAddress, // contract address for asset to be staked
      treasury,
      tophatOwnerAddress, // topHatWearer
      admin2 || "", // admin1
      admin3 || "", // admin2
      shareThreshold,
      stakePerMember, // assetAmount
      stakingPeriod, // duration
      chain?.id, // chainId
      tophatID, // topHatId
      nameSBT, // name
      symbolSBT, // symbol
      uriSBT, // baseUri
    ];
  };

  return (
    <Box display={displayPreviewNewCohort ? "inline" : "none"} m="auto">
      <SimpleGrid
        columns={2}
        spacingX={6}
        rounded="xl"
        border="1px"
        borderColor="red"
        bg="black"
        px={8}
        py={6}
        m="auto"
        w={["full", "full", "80%", "60%"]}
      >
        <Box>
          <Stack>
            {/* <Text fontSize="lg" color="red" fontWeight="semibold">
              {nameSBT}
            </Text> */}
            <Text>
              <span style={{ color: "gray" }}>Moloch DAO address:</span>
              <Text fontSize="xx-small">{membershipCriteria}</Text>
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Staking asset:</span>
              <Text fontSize="xx-small">{tokenAddress}</Text>
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Treasury address:</span>
              <Text fontSize="xx-small">{treasury}</Text>
            </Text>
            {tophatOwnerAddress !== "" && (
              <Text>
                <span style={{ color: "gray" }}>Controller address:</span>
                <span>
                  {<Text fontSize="xx-small">{tophatOwnerAddress}</Text>}
                </span>
              </Text>
            )}
            {tophatID !== "" && (
              <Text>
                <span style={{ color: "gray" }}>TOP HAT ID:</span>
                <span>{<Text>{tophatID}</Text>}</span>
              </Text>
            )}
            {admin2 !== "" && (
              <Text>
                <span style={{ color: "gray" }}>Admin address 1:</span>
                {superadmin2 && (
                  <Text fontSize="x-small" color="red">
                    *super-admin
                  </Text>
                )}
                <span>{<Text fontSize="xx-small">{admin2}</Text>}</span>
              </Text>
            )}
            {admin3 !== "" && (
              <Text>
                <span style={{ color: "gray" }}>Admin address 2:</span>
                {superadmin3 && (
                  <Text fontSize="x-small" color="red">
                    *super-admin
                  </Text>
                )}
                <span>{<Text fontSize="xx-small">{admin3}</Text>}</span>
              </Text>
            )}
            <Text>
              <span style={{ color: "gray" }}>
                Share threshold for membership:
              </span>
              {shareThreshold}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Minimum stake per member:</span>
              {stakePerMember}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Symbol SBT:</span> {symbolSBT}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Staking duration:</span>{" "}
              {stakingPeriod}
            </Text>

            {/* <Text>
              <span style={{ color: "gray" }}>Onboarding period:</span>
              {onboardingPeriod}
            </Text> */}

            {/* <Text>
              <span style={{ color: "gray" }}>Asset URI:</span>{" "}
              {<Text fontSize="xx-small">{uriSBT}</Text>}
            </Text> */}
          </Stack>
        </Box>
        <Box pt={8}>
          <Image
            src={uriSBT}
            alt={`${nameSBT} SBT image preview`}
            rounded="xl"
            m="auto"
          />

          <Text
            fontSize="lg"
            color="red"
            fontWeight="semibold"
            textAlign="center"
            my={4}
          >
            {nameSBT}
          </Text>
        </Box>
      </SimpleGrid>
      <HStack my={10} mx="auto" spacing={6} w={["full", "full", "80%", "60%"]}>
        <Box w="50%">
          <Button
            variant="ghost"
            w="full"
            color="red"
            border="1px"
            rounded="sm"
            onClick={handleBack}
          >
            Back
          </Button>
        </Box>
        <Box w="50%">
          <Button variant="solid" w="full" color="black">
            Deploy cohort
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default PreviewNewCohort;
