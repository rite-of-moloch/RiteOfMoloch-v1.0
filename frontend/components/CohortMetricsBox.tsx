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
import useTokenSymbol from "hooks/useTokenSymbol";
import React, { Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getDeadline, unixToUTC } from "utils/general";
import { useNetwork } from "wagmi";

import BlockExplorerLink from "./BlockExplorerLink";
import CohortMetricsOverall from "./CohortMetricsOverall";
import CohortAdminModal from "./adminModal/cohortAdminModal";
import useCohort from "hooks/useCohort";

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
  const cohort = useCohort(id);

  const symbol = useTokenSymbol(cohort?.token);
  const getdeadline = getDeadline(cohort?.createdAt, cohort?.time);

  const lastMemberJoined = (): string => {
    if (!cohort?.initiates) return "N/A";

    let date = cohort?.initiates[cohort?.initiates.length - 1]?.joinedAt;
    let formattedDate = unixToUTC((Number(date) * 1000).toString());

    if (formattedDate === "Invalid Date") {
      return "N/A";
    } else {
      return formattedDate || "N/A";
    }
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
                      {BlockExplorerLink(chain, id || "")}
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
                  {BlockExplorerLink(chain, cohort?.token)}
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
                Cohort size: {dataText(cohort?.totalMembers.toString())}
              </Text>
              <Text>
                Success percentage:{" "}
                {dataText(cohort?.successPercentage.toString())}
              </Text>
              <Text>
                Members slashed: {dataText(cohort?.slashedMembers.toString())}
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
            {/* <HStack alignSelf="start" maxW="40%">
              <Image
                src={`${metrics?.sbtUrl}`}
                alt="SBT image preview"
                boxShadow="dark-lg"
                p="1"
                rounded="md"
                bg="gray"
              />
            </HStack> */}
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
