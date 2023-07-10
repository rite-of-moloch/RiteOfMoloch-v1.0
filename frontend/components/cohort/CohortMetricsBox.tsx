import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@raidguild/design-system";
import { useTokenSymbol } from "hooks/useERC20";
import React, { Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { unixToUTC } from "utils/general";
import { useNetwork } from "wagmi";
import BlockExplorerMetricLink from "../blockExplorer/BlockExplorerMetricLink";
import CohortMetricsOverall from "./CohortMetricsOverall";
import CohortAdminModal from "../adminModal/cohortAdminModal";
import { useCohortByID } from "hooks/useCohort";
import { DateTime } from "luxon";

interface CohortMetricsBoxProps {
  removeOption: Dispatch<any>;
  id: string;
  overallPerformance: Boolean;
}

/**
 * @remarks id in Box wrapper is used for filter function in parent element `Metrics` to check if value exists in array
 * @params removeOption gets passed in a state management function from metrics component that runs a filter function. If cohort.id matches the Box id in this component, it renders
 * @params id - cohort ID
 * @params overallPerformance - boolean that indicates if selection is overall performance
 * @returns Box with cohort metric data of the cohort id which gets passed into id
 */
const CohortMetricsBox: React.FC<CohortMetricsBoxProps> = ({
  id,
  removeOption,
  overallPerformance,
}) => {
  const { chain } = useNetwork();
  const cohort = useCohortByID(id);

  const splitAddr = (str: string): string => {
    const names = str.split("-");
    return names[1];
  };

  const formatAddr = (str: string): string => {
    return `${str.slice(0, 6)}...${str.slice(-4)}`;
  };

  const splitFormatAddr = (str: string): string => {
    const addr = splitAddr(str);
    return formatAddr(addr);
  };

  const symbol = useTokenSymbol(cohort?.token);
  const deadline = DateTime.fromSeconds(+cohort?.createdAt).plus({
    seconds: cohort?.time,
  });

  const lastMemberJoined = (): string => {
    if (!cohort?.initiates) return "N/A";

    let date = cohort?.initiates[cohort?.initiates.length - 1]?.joinedAt;
    let formattedDate = DateTime.fromSeconds(+date).toLocaleString();

    if (!formattedDate || formattedDate === "Invalid Date") {
      return "N/A";
    }
    return formattedDate;
  };

  const deployDate = unixToUTC((Number(cohort?.createdAt) * 1000).toString());

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
              w="full"
              alignItems="start"
              textAlign="left"
              fontFamily="texturina"
              color="gray"
            >
              <Box w="full" textAlign="center">
                <Tooltip label={id} shouldWrapChildren hasArrow>
                  <Heading as="h3" color="red" fontSize={["md", "md", "lg"]}>
                    <HStack>
                      <Text textAlign="center">Cohort:</Text>
                      {BlockExplorerMetricLink(
                        chain,
                        splitFormatAddr(id),
                        splitAddr(id)
                      )}
                    </HStack>
                  </Heading>
                </Tooltip>
              </Box>
              <Box>
                <Image
                  src={`${cohort?.sbtUrl}`}
                  alt="SBT image preview"
                  boxShadow="dark-lg"
                  p="1"
                  rounded="md"
                  bg="gray"
                />
              </Box>
              <Text>
                Staking token:
                <span style={{ color: "white", marginLeft: "0.5rem" }}>
                  {BlockExplorerMetricLink(
                    chain,
                    cohort ? formatAddr(cohort?.token) : "",
                    cohort?.token
                  )}
                </span>
              </Text>
              <Text>Symbol: {dataText(symbol || "")}</Text>
              <Text>Deploy date: {dataText(deployDate)}</Text>
              <Text>
                Onboarding end:
                <span style={{ color: "white", marginLeft: "0.5rem" }}>
                  {deadline.toLocaleString()}
                </span>
              </Text>
              <Text>
                Cohort size: {dataText(cohort?.totalMembers)}
              </Text>
              <Text>
                Success percentage:{" "}
                {dataText(Number(cohort?.successPercentage).toFixed(2))}
              </Text>
              <Text>
                Members slashed: {dataText(cohort?.slashedMembers)}
              </Text>
              <Text>
                Staking date of last member: {dataText(lastMemberJoined())}
              </Text>
            </VStack>
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
              <CohortAdminModal address={id} btnVariant="outline" />
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
