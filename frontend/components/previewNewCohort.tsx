import { Box, HStack, Image, Text, VStack } from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import React, { ReactNode } from "react";

interface PreviewNewCohortProps {
  children?: ReactNode;
}

const PreviewNewCohort: React.FC<PreviewNewCohortProps> = ({ children }) => {
  const {
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

  return (
    <HStack
      // display={displayPart3 ? "inline" : "none"}
      rounded="xl"
      border="1px"
      bg="gradientSBTPrev"
    >
      <VStack w="50%">
        <Text>yeah</Text>
      </VStack>
      <Box w="50%">
        <Image src={sbtImage} alt={`${nameCohort} SBT image preview`} />
      </Box>
    </HStack>
  );
};

export default PreviewNewCohort;
