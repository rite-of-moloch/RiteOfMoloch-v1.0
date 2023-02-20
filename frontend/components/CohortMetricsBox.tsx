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
import { RxOpenInNewWindow } from "react-icons/rx";
import BlockExplorerLink from "./BlockExplorerLink";

interface CohortMetricsBoxProps {
  removeOption: Dispatch<any>;
  id: string | undefined;
}

/**
 * @remarks id in Box wrapper is used for filter function in parent element `Metrics` to check if value exists in array
 * @param param0
 * @returns
 */
const CohortMetricsBox: React.FC<CohortMetricsBoxProps> = ({
  id,
  removeOption,
}) => {
  const { chain } = useNetwork();
  const metricsData = useSubgraphQuery(COHORT_METRICS_CARD(id));
  const metrics: CohortMetricsCard = metricsData?.data?.cohort;
  console.log(metrics);

  const cohortMetadataRaw = useSubgraphQuery(COHORT_METADATA(id));
  const cohortMetadata: CohortMetadata | null = cohortMetadataRaw?.data?.cohort;
  console.log("cohortMetadata", cohortMetadata);

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

  return (
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
          <Text>
            Symbol:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {symbol}
            </span>
          </Text>
          <Text>
            Deploy date:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {deployDate}
            </span>
          </Text>
          <Text>
            Onboarding end:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {unixToUTC(getdeadline)}
            </span>
          </Text>
          <Text>
            Cohort size:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.totalMembers}
            </span>
          </Text>
          <Text>
            Success percentage:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.successPercentage}%
            </span>
          </Text>
          <Text>
            Members slashed:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {metrics?.slashedMembers}
            </span>
          </Text>
          {/* TODO: create hook that calls `totalSupply` functioin on Baal contract and gets treasury size https://goerli.etherscan.io/address/0x6053de194226843e4fd99a82c1386b4c76e19e34#readContract */}
          {/* <Text>
            Treasury size:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {treasurySize}
            </span>
          </Text> */}
          <Text>
            Staking date of last member:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {lastMemberJoined()}
            </span>
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
  );
};

export default CohortMetricsBox;
