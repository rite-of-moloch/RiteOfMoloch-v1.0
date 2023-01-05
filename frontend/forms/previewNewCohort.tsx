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
import React, { ReactNode } from "react";

interface PreviewNewCohortProps {
  children?: ReactNode;
}

const PreviewNewCohort: React.FC<PreviewNewCohortProps> = ({ children }) => {
  const {
    setDisplayPart3,
    setDisplayPreviewNewCohort,
    displayPreviewNewCohort,
    nameCohort,
    sbtImage,
    nameSBT,
    symbolSBT,
    uriSBT,
    stakePerMember,
    cohortSize,
    onboardingPeriod,
    stakingPeriod,
    tophatOwnerAddress,
    tophatID,
    admin2,
    admin3,
    superadmin2,
    superadmin3,
  } = useFormContext();
  console.log(superadmin2, superadmin3);

  const handleBack = (): void => {
    setDisplayPart3(true);
    setDisplayPreviewNewCohort(false);
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
          <Stack fontSize="sm">
            <Text fontSize="lg" color="red" fontWeight="semibold">
              {nameCohort || "Name cohort"}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Name SBT:</span> {nameSBT}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Symbol SBT:</span> {symbolSBT}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>SBT URI:</span> {uriSBT}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Stake per member:</span>{" "}
              {stakePerMember}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Staking duration:</span>{" "}
              {stakingPeriod}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Cohort size:</span> {cohortSize}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Onboarding period:</span>
              {onboardingPeriod}
            </Text>
            {/* <Text><span style={{ color: "gray" }}>Address staking asset:</span> {nameSBT}</Text> */}
            {/* <Text><span style={{ color: "gray" }}>Controller address:</span> {}</Text> */}
            {/* <Text><span style={{ color: "gray" }}>Treasury address:</span> {}</Text> */}
            {tophatOwnerAddress !== "" && (
              <Text>
                <span style={{ color: "gray" }}>Tophat owner address 1:</span>
                <span>
                  {<Text fontSize="xx-small">{tophatOwnerAddress}</Text>}
                </span>
              </Text>
            )}
            {tophatID !== "" && (
              <Text>
                <span style={{ color: "gray" }}>Tophat owner address 2:</span>
                <span>{<Text fontSize="xx-small">{tophatID}</Text>}</span>
              </Text>
            )}
            {admin2 !== "" && (
              <>
                <Text>
                  <span style={{ color: "gray" }}>
                    Additional admin address 1:
                  </span>
                  <span>
                    {
                      <>
                        <Text fontSize="xx-small">{admin2}</Text>
                        <Text fontSize="xx-small">
                          {superadmin2 && "*superadmin"}
                        </Text>
                      </>
                    }
                  </span>
                </Text>
              </>
            )}
            {admin3 !== "" && (
              <>
                <Text>
                  <span style={{ color: "gray" }}>
                    Additional admin address 2:
                  </span>
                  <span>
                    {
                      <>
                        <Text fontSize="xx-small">{admin3}</Text>
                        <Text fontSize="xx-small">
                          {superadmin3 && "*superadmin"}
                        </Text>
                      </>
                    }
                  </span>
                </Text>
              </>
            )}
          </Stack>
        </Box>
        <Box pt={8}>
          <Image
            src={sbtImage}
            alt={`${nameCohort} SBT image preview`}
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
          <Button variant="solid" w="full">
            Deploy cohort
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default PreviewNewCohort;
