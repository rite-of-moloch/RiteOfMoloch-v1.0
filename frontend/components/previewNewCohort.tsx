import { Box, HStack, Image, Text, VStack } from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import React, { ReactNode } from "react";

interface PreviewNewCohortProps {
  children?: ReactNode;
}

const PreviewNewCohort: React.FC<PreviewNewCohortProps> = ({ children }) => {
  const {
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
  } = useFormContext();
  console.log(sbtImage);
  return (
    <VStack>
      <HStack
        display={displayPreviewNewCohort ? "inline" : "none"}
        w={["90%", "90%", "60%"]}
        rounded="xl"
        border="1px"
        borderColor="red"
        bg="black"
        px={8}
        py={6}
        m="auto"
      >
        <VStack w="50%" alignItems="start" wordBreak="break-word">
          <Text color="red" fontWeight="semibold">
            {nameCohort || "Name cohort"}
          </Text>
          <Text>Name SBT: {nameSBT}</Text>
          <Text>Symbol SBT: {symbolSBT}</Text>
          <Text>SBT URI: {uriSBT}</Text>
          <Text>Stake per member: {stakePerMember}</Text>
          <Text>Staking duration: {stakingPeriod}</Text>
          <Text>Cohort size: {cohortSize}</Text>
          <Text>Onboarding period: {onboardingPeriod}</Text>
          <Text>Address staking asset: {nameSBT}</Text>
          {/* <Text>Controller address: {}</Text> */}
          {/* <Text>Treasury address: {}</Text> */}
          {tophatOwnerAddress !== "" && (
            <Text>
              Tophat owner address:{" "}
              <span>
                {<Text fontSize="xx-small">{tophatOwnerAddress}</Text>}
              </span>
            </Text>
          )}
          {tophatID !== "" && (
            <>
              <Text>
                Tophat owner address:{" "}
                <span>{<Text fontSize="xx-small">{tophatID}</Text>}</span>
              </Text>
            </>
          )}
          {admin2 !== "" && (
            <>
              <Text>
                Additional admin address 1:{" "}
                <span>{<Text fontSize="xx-small">{admin2}</Text>}</span>
              </Text>
              {/* {isSuperAdmin2 && <Text fontWeight="bold">*super admin</Text>} */}
            </>
          )}
          {admin3 !== "" && (
            <>
              <Text>
                Additional admin address 1:{" "}
                <span>{<Text fontSize="xx-small">{admin3}</Text>}</span>
              </Text>
              {/* {isSuperAdmin3 && <Text fontWeight="bold">*super admin</Text>} */}
            </>
          )}
        </VStack>
        <Box w="50%">
          <Image
            src={sbtImage}
            alt={`${nameCohort} SBT image preview`}
            rounded="2xl"
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default PreviewNewCohort;
