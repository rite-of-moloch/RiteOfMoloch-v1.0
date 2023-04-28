import React, { ReactNode } from "react";
import {
  Box,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import BackButton from "components/BackButton";
import CohortDetail from "components/CohortDetail";
import NotConnected from "components/NotConnected";
import SearchCohorts from "components/SearchCohorts";
// import SelectForm from "components/SelectForm";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { FieldValues, useForm } from "react-hook-form";
// import { cohortOptions } from "utils/cohortOptions";
import { getDeadline, unixToUTC } from "utils/general";
import { COHORTS } from "utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";
import { useAccount } from "wagmi";
import useRiteBalanceOf from "hooks/useRiteBalanceOf";
import GridTemplate from "components/GridTemplate";

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

  const { data, isLoading } = useSubgraphQuery(COHORTS());
  //  `!isLoading`: hook has fetched data. `isLoading`: hook has not yet fetched data
  const cohort: Cohort[] | undefined = data?.data?.data?.cohorts;

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

  console.log(renderCohorts);

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
                  {/* <Box display="">
                    <SelectForm
                      name="selectCohorts"
                      placeholder="SELECT COHORTS"
                      options={cohortOptions}
                      isClearable={false}
                      localForm={localForm}
                    />
                  </Box> */}
                </Box>
                <Box ml={2} w="50%" alignItems="center">
                  <SearchCohorts name="searchResult" localForm={localForm} />
                </Box>
              </HStack>
              <GridTemplate
                isHeading
                column1="Cohort"
                column2="Required Stake"
                column3="Staking Date"
                column4="Cohort Details"
              />
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
          {filteredCohorts && filteredCohorts?.length > 0 && filteredCohorts}
        </Stack>
      )}
      {isConnected && !isLoading && <BackButton path="/" />}
      {children}
    </>
  );
};

export default JoinCohorts;
