import React, { FC, ReactNode } from "react";
import {
  Box,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import CohortDetail from "components/CohortDetail";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { COHORTS } from "utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";
import { getDeadline, unixToUTC } from "utils/general";
import BackButton from "components/BackButton";
import { useAccount } from "wagmi";
import NotConnected from "components/NotConnected";
import SearchCohorts from "components/SearchCohorts";
import { FieldValues, useForm } from "react-hook-form";
import GridTemplate from "components/GridTemplate";

interface ReviewOngoingCohortProps {
  children?: ReactNode;
}

/**
 * Admin page. Page for admins to view active cohorts and members
 *
 */
const ReviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const localForm = useForm<FieldValues>();
  const { getValues, watch } = localForm;
  watch();
  const searchResult = getValues().searchResult;

  const cohortList = useSubgraphQuery(COHORTS());

  /**
   * (!isLoading): hook has fetched data.
   * (isLoading): hook has not yet fetched data
   */

  const cohort: Cohort[] | undefined = cohortList?.data?.data?.data?.cohorts;
  console.log(cohort);

  const isLoading = cohortList?.isLoading;

  const renderCohorts = cohort?.map((cohort: Cohort) => {
    return (
      <CohortDetail
        address={cohort.id}
        stake={cohort.tokenAmount}
        stakingAsset={cohort.token}
        stakingDate={unixToUTC(getDeadline(cohort.createdAt, cohort.time))}
        key={cohort.id}
        memberOrAdmin={"admin"}
      />
    );
  });

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
            Cohorts
          </Heading>
          {isLoading && (
            <Box w="full" textAlign="center" p={2} fontFamily="texturina">
              <Spinner size="xl" my="50" color="red" emptyColor="purple" />
              <Text>Loading cohorts...</Text>
            </Box>
          )}
          {!isLoading && (
            <>
              <Box w={["50%", "50%", "40%", "30%"]} alignSelf="end">
                <SearchCohorts name="searchResult" localForm={localForm} />
              </Box>

              <GridTemplate
                isHeading
                column1="Address"
                column2="Stake"
                column3="Deadline"
                column4={null}
              />
            </>
          )}
          {filteredCohorts && filteredCohorts?.length > 0 && filteredCohorts}
        </Stack>
      )}
      {isConnected && !isLoading && <BackButton path="/admin" />}
      {children}
    </>
  );
};

export default ReviewOngoingCohort;
