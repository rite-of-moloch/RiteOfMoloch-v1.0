import React, { FC, ReactNode } from "react";
import { Box, Heading, Spinner, Stack, Text } from "@raidguild/design-system";
import CohortDetail from "components/cohort/CohortDetail";
import BackButton from "components/BackButton";
import SearchCohorts from "components/cohort/SearchCohorts";
import { FieldValues, useForm } from "react-hook-form";
import GridTemplate from "components/GridTemplate";
import { useCohorts } from "hooks/useCohort";
import { DateTime } from "luxon";

interface ReviewOngoingCohortProps {
  children?: ReactNode;
}

/**
 * Admin page. Page for admins to view active cohorts and members
 */
const ReviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const { cohorts, isLoading } = useCohorts();
  const localForm = useForm<FieldValues>();
  const { getValues, watch } = localForm;
  watch();
  const searchResult = getValues().searchResult;

  const filteredCohorts = cohorts?.cohorts
    .filter((cohort) => {
      if (
        searchResult === "" ||
        !searchResult ||
        cohort.address?.includes(searchResult) ||
        cohort.stakingToken?.includes(searchResult) ||
        cohort.minimumStake?.includes(searchResult) ||
        cohort.stakeDuration?.includes(searchResult)
      ) {
        return cohort;
      }
    })
    .map((cohort) => {
      return (
        <CohortDetail
          address={cohort.address}
          key={cohort.id}
          memberOrAdmin={"admin"}
        />
      );
    });

  return (
    <>
      <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
        <Heading as="h1" textAlign="center" color="#FF3864">
          Cohorts
        </Heading>
        {isLoading ? (
          <Box w="full" textAlign="center" p={2} fontFamily="texturina">
            <Spinner size="xl" my="50" color="red" emptyColor="purple" />
            <Text>Loading cohorts...</Text>
          </Box>
        ) : (
          <>
            <>
              <Box w={["50%", "50%", "40%", "30%"]} alignSelf="end">
                <SearchCohorts name="searchResult" localForm={localForm} />
              </Box>
              <GridTemplate
                isHeading
                column1="Address"
                column2="Stake"
                column3="Deadline"
                column4="Manage"
              />
            </>
            {filteredCohorts && filteredCohorts?.length > 0 && filteredCohorts}
          </>
        )}
      </Stack>
      <BackButton path="/admin" />
      {children}
    </>
  );
};

export default ReviewOngoingCohort;
