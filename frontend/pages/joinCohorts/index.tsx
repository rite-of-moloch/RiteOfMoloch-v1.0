import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import BackButton from "components/BackButton";
import CohortDetail from "components/CohortDetail";
import NoSearchResults from "components/NoSearchReults";
import NotConnected from "components/NotConnected";
import SearchCohorts from "components/SearchCohorts";
import SelectForm from "components/SelectForm";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";

import { FieldValues, useForm } from "react-hook-form";
import { cohortOptions } from "utils/cohortOptions";
import { getDeadline, unixToUTC } from "utils/general";
import { COHORTS, COHORT_INITIATES } from "utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";
import { useAccount } from "wagmi";
import useRiteBalanceOf from "hooks/useRiteBalanceOf";

interface JoinCohortsProps {
  children?: ReactNode;
}

/**
 * @remarks Non-admin page. Page for prospective and cohort members
 */
const JoinCohorts: React.FC<JoinCohortsProps> = ({ children }) => {
  const { isConnected, address } = useAccount();

  const localForm = useForm<FieldValues>();
  const { getValues, watch } = localForm;
  watch();
  const searchResult = getValues().searchResult;
  const selectCohorts = getValues().selectCohorts?.value;

  const cohortList = useSubgraphQuery(COHORTS());
  //  `!isLoading`: hook has fetched data. `isLoading`: hook has not yet fetched data
  const isLoading = cohortList.isLoading;
  const cohort: Cohort[] | undefined = cohortList?.data?.cohorts;
  console.log(cohort);

  console.log(selectCohorts);

  /**
   *
   * @remarks if msg.sender has > 0 rites, then address is staked
   */
  const isStaked = (id: string) => {
    const balance = useRiteBalanceOf(id, [address || ""]);
    if (!balance) {
      return false;
    } else if (Number(balance.toString()) > 0) {
      return true;
    }
  };
  // console.log(isStaked("0x09cd0f78f44f3140d560fd0538b8d4baa001c685"));

  const renderCohorts = cohort?.map((cohort: Cohort) => {
    return (
      <CohortDetail
        address={cohort.id}
        stake={cohort.tokenAmount}
        stakingAsset={cohort.token}
        stakingDate={unixToUTC(getDeadline(cohort.createdAt, cohort.time))}
        key={cohort.id}
        memberOrAdmin={"member"}
      />
    );
  });

  // TODO: uncomment when COHORT subgraphquery is fixed to include an array of cohort initiates, and in the next loop, filter through `selectedCohorts`
  // const selectedCohorts = renderCohorts?.filter((cohort) => {
  //   console.log(selectCohorts);
  //   if (selectCohorts === "allCohorts" || !selectCohorts) {
  //     return cohort;
  //   } else if (selectCohorts === "onlyStakedCohorts") {
  //     return isStaked(cohort?.props.address);
  //   } else if (selectCohorts === "nonStakedOngoing") {
  //     return !isStaked(cohort?.props.address);
  //   }
  // });
  // console.log(selectedCohorts);

  // TODO: add "selectCohorts" to filter results
  const filteredCohorts = renderCohorts?.filter((cohort) => {
    if (searchResult === "" || !searchResult) {
      return cohort;
    } else if (
      cohort.props.address?.includes(searchResult) ||
      cohort.props.stakingAsset?.includes(searchResult) ||
      cohort.props.stake?.includes(searchResult) ||
      cohort.props.stakingAsset?.includes(searchResult) ||
      cohort.props.stakingDate?.includes(searchResult)
    ) {
      return cohort;
    }
  });

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
          <Heading as="h1" textAlign="center" color="#FF3864">
            Active Cohorts
          </Heading>
          {!isLoading && (
            <>
              <HStack>
                <Box mr={2} w="50%" pt={4}>
                  <Box display="">
                    <SelectForm
                      name="selectCohorts"
                      placeholder="SELECT COHORTS"
                      options={cohortOptions}
                      isClearable={false}
                      localForm={localForm}
                    />
                  </Box>
                </Box>
                <Box ml={2} w="50%" alignItems="center">
                  <SearchCohorts name="searchResult" localForm={localForm} />
                </Box>
              </HStack>

              <SimpleGrid
                columns={4}
                fontFamily="texturina"
                justifyContent="center"
                alignItems="center"
                spacingX={2}
                mb={-3}
                w="full"
              >
                <Box justifySelf="start" pl={4}>
                  Address
                </Box>
                <Box justifySelf="center">Required Stake</Box>
                <Box justifySelf="center">Staking Date</Box>
                <Box />
              </SimpleGrid>
            </>
          )}
          {isLoading && (
            <>
              <Box w="full" textAlign="center" p={2} fontFamily="texturina">
                <Spinner size="xl" my="50" color="red" emptyColor="purple" />
                <Text>Loading cohorts...</Text>
              </Box>
            </>
          )}
          {filteredCohorts && filteredCohorts?.length > 0
            ? filteredCohorts
            : NoSearchResults}
        </Stack>
      )}
      {isConnected && !isLoading && <BackButton path="/" />}
      {children}
    </>
  );
};

export default JoinCohorts;
