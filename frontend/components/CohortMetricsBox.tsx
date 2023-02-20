import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@raidguild/design-system";
import React, { Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface CohortMetricsBoxProps {
  removeOption: Dispatch<any>;
  metrics?: {
    id: string;
    stakingToken: string;
    symbol: string;
    deployDate: string;
    onboardingEnd: string;
    cohortSize: number;
    successPercent: number;
    membersSlashed: number;
    treasurySize: number;
    lastMemberStaked: string;
    sbtImage: string;
  } | null;
}

/**
 * @remarks id in Box wrapper is used for filter function in parent element `Metrics` to check if value exists in array
 * @param param0
 * @returns
 */
const CohortMetricsBox: React.FC<CohortMetricsBoxProps> = ({
  metrics,
  removeOption,
}) => {
  return (
    <Box border="red solid 1px" rounded="lg" bg="black" p={6} id={metrics?.id}>
      <Stack alignItems="end" mt={-5} mr={-5} h="2rem">
        <Box h="full" id={metrics?.id} onClick={removeOption}>
          <AiOutlineClose color="gray" size="1.5rem" />
        </Box>
      </Stack>
      <HStack>
        <VStack
          w="80%"
          alignItems="start"
          textAlign="left"
          fontFamily="texturina"
          color="gray"
        >
          <Heading as="h3" color="red" fontSize="md">
            {metrics?.id.slice(0, 4)}...{metrics?.id.slice(-6)}
          </Heading>
          <Text>
            Staking token:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.stakingToken}
            </span>
          </Text>
          <Text>
            Symbol:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.symbol}
            </span>
          </Text>
          <Text>
            Deploy date:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.deployDate}
            </span>
          </Text>
          <Text>
            Onboarding end:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.onboardingEnd}
            </span>
          </Text>
          <Text>
            Cohort size:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.cohortSize}
            </span>
          </Text>
          <Text>
            Success percentage:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.successPercent}
            </span>
          </Text>
          <Text>
            Members slashed:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.membersSlashed}
            </span>
          </Text>
          <Text>
            Treasury size:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.treasurySize}
            </span>
          </Text>
          <Text>
            Staking date of last member:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.lastMemberStaked}
            </span>
          </Text>
        </VStack>
        <HStack alignSelf="start" maxW="40%">
          <Image src={`${metrics?.sbtImage}`} />
        </HStack>
      </HStack>
      <VStack mt="2rem" mb="0.5rem" spacing="1rem">
        <Button w="full">Manage cohort</Button>
        <Button w="full" variant="outline">
          Administrators
        </Button>
      </VStack>
    </Box>
  );
};

export default CohortMetricsBox;
