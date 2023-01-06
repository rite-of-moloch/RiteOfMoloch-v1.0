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
import { initDataDeployCohort } from "utils/types/initDataDeployCohort";

interface PreviewNewCohortProps {
  children?: ReactNode;
}

const PreviewNewCohort: React.FC<PreviewNewCohortProps> = ({ children }) => {
  const { chain } = useNetwork();
  const {
    setDisplayPart3,
    setDisplayPreviewNewCohort,
    displayPreviewNewCohort,
    membershipCriteria,
    stakingAsset,
    treasury,
    topHatWearer,
    admin1,
    admin2,
    cohortSize,
    setOnboardingPeriod,
    stakeDuration,
    tophatID,
    nameCohort,
    nameSBT,
    symbolSBT,
    uriSBT,
    // sbtImage,
    assetAmount,
    shareThreshold,
    onboardingPeriod,
  } = useFormContext();

  const handleBack = (): void => {
    setDisplayPart3(true);
    setDisplayPreviewNewCohort(false);
  };

  const initData: initDataDeployCohort = [
    membershipCriteria,
    stakingAsset,
    treasury,
    topHatWearer,
    admin1,
    admin2,
    cohortSize,
    setOnboardingPeriod,
    shareThreshold,
    assetAmount,
    stakeDuration,
    chain?.id,
    tophatID,
    nameCohort,
    nameSBT,
    symbolSBT,
    uriSBT,
  ];

  const { createCohort } = useCreateCohort([initData, "1"]);
  console.log(createCohort);

  const handleDeployCohort = (): void => {
    console.log("deploying cohort");
    createCohort;
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
        px={"5%"}
        py={6}
        m="auto"
        w={["full", "full", "80%", "60%"]}
      >
        <Box>
          <Stack>
            <Text fontSize="lg" color="red" fontWeight="semibold">
              {nameCohort.toUpperCase()}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Name SBT:</span>
              {nameSBT}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Symbol SBT:</span> {symbolSBT}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Stake per member:</span>
              {assetAmount} {assetAmount && assetAmount > 1 && "days"}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Staking duration:</span>
              {stakeDuration} {stakeDuration && stakeDuration > 1 && "days"}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Cohort size:</span> {cohortSize}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Shares per member:</span>{" "}
              {shareThreshold}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Onboarding period:</span>{" "}
              {onboardingPeriod}{" "}
              {onboardingPeriod && onboardingPeriod > 1 && "days"}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Staking asset address:</span>
              <Text fontSize="xx-small">{stakingAsset}</Text>
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Moloch DAO address:</span>
              <Text fontSize="xx-small">{membershipCriteria}</Text>
            </Text>

            <Text>
              <span style={{ color: "gray" }}>Treasury address:</span>
              <Text fontSize="xx-small">{treasury}</Text>
            </Text>
            {topHatWearer !== "" && (
              <Text>
                <span style={{ color: "gray" }}>TOP HAT address:</span>
                <span>{<Text fontSize="xx-small">{topHatWearer}</Text>}</span>
              </Text>
            )}
            {tophatID && (
              <Text>
                <span style={{ color: "gray" }}>TOP HAT ID:</span> {tophatID}
              </Text>
            )}
            {admin1 !== "" && (
              <Text>
                <span style={{ color: "gray" }}>Admin address 1:</span>

                {<Text fontSize="xx-small">{admin1}</Text>}
              </Text>
            )}
            {admin2 !== "" && (
              <Text>
                <span style={{ color: "gray" }}>Admin address 2:</span>
                {<Text fontSize="xx-small">{admin2}</Text>}
              </Text>
            )}
          </Stack>
        </Box>
        <Box pt={8}>
          <Image
            src={uriSBT}
            alt={`${nameSBT} SBT image preview`}
            rounded="xl"
            m="auto"
          />
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
          <Button
            variant="solid"
            w="full"
            color="black"
            onClick={() => handleDeployCohort && handleDeployCohort()}
          >
            Deploy cohort
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default PreviewNewCohort;
