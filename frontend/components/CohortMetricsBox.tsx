import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@raidguild/design-system";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import useTokenSymbol from "hooks/useTokenSymbol";
import React, { Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getDeadline, unixToUTC } from "utils/general";
import { COHORT_METADATA, COHORT_METRICS_CARD } from "utils/subgraph/queries";
import { CohortMetadata, CohortMetricsCard } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";

import BlockExplorerLink from "./BlockExplorerLink";
import CohortMetricsOverall from "./CohortMetricsOverall";

interface CohortMetricsBoxProps {
  removeOption: Dispatch<any>;
  id: string | undefined;
  overallPerformance: Boolean;
}

/**
 * @remarks id in Box wrapper is used for filter function in parent element `Metrics` to check if value exists in array
 * @params removeOption gets passed in a state management function from metrics component that runs a filter function. If cohort.id matches the Box id in this component, it renders
 * @returns Box with cohort metric data of the cohort id which gets passed into id
 */
const CohortMetricsBox: React.FC<CohortMetricsBoxProps> = ({
  id,
  removeOption,
  overallPerformance,
}) => {
  const { chain } = useNetwork();
  const metricsData = useSubgraphQuery(COHORT_METRICS_CARD(id));
  const metrics: CohortMetricsCard = metricsData?.data?.cohort;

  const cohortMetadataRaw = useSubgraphQuery(COHORT_METADATA(id));
  const cohortMetadata: CohortMetadata | null = cohortMetadataRaw?.data?.cohort;

  const symbol = useTokenSymbol(metrics?.token);
  const getdeadline = getDeadline(
    cohortMetadata?.createdAt,
    cohortMetadata?.time
  );

  const lastMemberJoined = (): string => {
    let date = metrics?.initiates[metrics?.initiates.length - 1]?.joinedAt;
    let formattedDate = unixToUTC((Number(date) * 1000).toString());
    if (formattedDate === "Invalid Date") {
      return "N/A";
    } else {
      return formattedDate || "N/A";
    }
  };

  const deployDate = unixToUTC((Number(metrics?.createdAt) * 1000).toString());

  const dataText = (text: string) => (
    <span style={{ color: "white", marginLeft: "0.25rem" }}>{text}</span>
  );

  return (
    <>
      {!overallPerformance && (
        <Box border="red solid 1px" rounded="lg" bg="black" p={6} id={id}>
          <Stack alignItems="end" mt={-5} mr={-5} h="2rem">
            <Box h="full" id={id} onClick={removeOption}>
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
                {id?.slice(0, 4)}...{id?.slice(-6)}
              </Heading>

              <Text>
                Staking token:
                <span style={{ color: "white", marginLeft: "0.5rem" }}>
                  {BlockExplorerLink(chain, metrics?.token)}
                </span>
              </Text>
              <Text>Symbol: {dataText(symbol || "")}</Text>
              <Text>Deploy date: {dataText(deployDate)}</Text>
              <Text>
                Onboarding end:
                <span style={{ color: "white", marginLeft: "0.5rem" }}>
                  {unixToUTC(getdeadline)}
                </span>
              </Text>
              <Text>
                Cohort size: {dataText(metrics?.totalMembers.toString())}
              </Text>
              <Text>
                Success percentage:{" "}
                {dataText(metrics?.successPercentage.toString())}
              </Text>
              <Text>
                Members slashed: {dataText(metrics?.slashedMembers.toString())}
              </Text>
              {/* TODO: create hook that calls `totalSupply` functioin on Baal contract and gets treasury size https://goerli.etherscan.io/address/0x6053de194226843e4fd99a82c1386b4c76e19e34#readContract */}
              {/* <Text>
              Treasury size:
              <span style={{ color: "white", marginLeft: "0.5rem" }}>
                {treasurySize}
              </span>
            </Text> */}
              <Text>
                Staking date of last member: {dataText(lastMemberJoined())}
              </Text>
            </VStack>
            <HStack alignSelf="start" maxW="40%">
              <Image
                src={`${metrics?.sbtUrl}`}
                alt="SBT image preview"
                boxShadow="dark-lg"
                p="1"
                rounded="md"
                bg="gray"
              />
            </HStack>
          </HStack>
          <VStack mt="2rem" mb="0.5rem" spacing="1rem">
            <Box w="full">
              <Link href={`/cohorts/${id}`}>
                <Button w="full" fontSize={["xs", "sm", "sm", "md"]}>
                  Manage cohort
                </Button>
              </Link>
            </Box>
            <Box w="full">
              <Link href={"/admin"}>
                <Button
                  w="full"
                  fontSize={["xs", "sm", "sm", "md"]}
                  variant="outline"
                >
                  Admins
                </Button>
              </Link>
            </Box>
          </VStack>
        </Box>
      )}
      {overallPerformance && (
        <Box>{<CohortMetricsOverall removeOption={removeOption} />}</Box>
      )}
    </>
  );
};

export default CohortMetricsBox;
