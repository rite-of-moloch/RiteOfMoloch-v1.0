import React, { Dispatch } from "react";
import { Box, Heading, Stack, Text, VStack } from "@raidguild/design-system";
import { numberDecimals } from "utils/general";
import { AiOutlineClose } from "react-icons/ai";
import useMetrics from "hooks/useMetrics";

interface CohortMetricsOverallProps {
  removeOption: Dispatch<any>;
}
/**
 * @remarks runs subgraph query and renders overall cohort performance
 * @params removeOption gets passed in a state management function from metrics component that runs a filter function. If cohort.id matches the Box id in this component, it renders
 */
const CohortMetricsOverall: React.FC<CohortMetricsOverallProps> = ({
  removeOption,
}) => {
  const metrics = useMetrics();

  const dataText = (text: string) => (
    <span style={{ color: "white", marginLeft: "0.25rem" }}>{text}</span>
  );

  return (
    <Box border="red solid 1px" rounded="lg" bg="gradientSBTPrev" p={6}>
      {/* TODO: SETUP OVERALL COHORT METRICS */}
      <Stack alignItems="end" mt={-5} mr={-5} h="2rem">
        <Box h="full" id={"overallPerformance"} onClick={removeOption}>
          <AiOutlineClose color="gray" size="1.5rem" />
        </Box>
      </Stack>
      <Heading as="h3" fontSize="lg" color="red">
        Overall performance
      </Heading>
      <VStack
        textAlign="left"
        fontFamily="texturina"
        mt="1em"
        alignItems="start"
        color="whitesmoke"
      >
        <Text>
          Average cohort size:
          {dataText(numberDecimals(metrics?.averageCohortSize, 2))}
        </Text>
        <Text>Claim rate: {dataText(metrics?.slashedMembers)}</Text>
        <Text>Claimed members: {dataText(metrics?.claimedMembers)}</Text>
        <Text>Slashed members: {dataText(metrics?.slashedMembers)}</Text>
        <Text>Slash rate: {dataText(metrics?.slashRate)}</Text>
        <Text>Total cohorts: {dataText(metrics?.totalCohorts)}</Text>
        <Text>Total members: {dataText(metrics?.totalMembers)}</Text>
      </VStack>
    </Box>
  );
};

export default CohortMetricsOverall;
