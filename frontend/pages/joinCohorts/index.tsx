import React from "react";
import {
  Box,
  Heading,
  HStack,
  Spinner,
  Stack,
  Spacer,
} from "@raidguild/design-system";
import BackButton from "components/BackButton";
import CohortDetail from "components/cohort/CohortDetail";
import SearchCohorts from "components/cohort/SearchCohorts";
import { FieldValues, useForm } from "react-hook-form";
import GridTemplate from "components/GridTemplate";
import { useCohorts } from "hooks/useCohort";

/**
 * @remarks Non-admin page. Page for prospective and cohort members
 */
const JoinCohorts: React.FC = () => {
  const { cohorts, isLoading } = useCohorts();

  const localForm = useForm<FieldValues>();
  const { watch } = localForm;
  watch();

  const renderCohorts = cohorts?.cohorts.map((cohort) => (
    <CohortDetail
      address={cohort.address}
      key={cohort.id}
      memberOrAdmin={"member"}
    />
  ));

  return (
    <>
      <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
        <Heading as="h1" textAlign="center" color="#FF3864">
          Active Cohorts
        </Heading>
        <HStack>
          <Spacer />
          <Box ml={2} w="50%" alignItems="center">
            <SearchCohorts name="searchResult" localForm={localForm} />
          </Box>
        </HStack>
        <GridTemplate
          isHeading
          column1="Cohort"
          column2="Required Stake"
          column3="Staking Deadline"
          column4="Cohort Details"
        />
        {!renderCohorts ||
          (renderCohorts.length === 0 && (
            <Box w="full" textAlign="center" p={2} fontFamily="texturina">
              <Heading as="h3" fontSize="xl">
                No cohorts found
              </Heading>
            </Box>
          ))}
        {isLoading && (
          <Box w="full" textAlign="center" p={2} fontFamily="texturina">
            <Spinner size="xl" my="50" color="red" emptyColor="purple" />
          </Box>
        )}
        {renderCohorts}
      </Stack>
      <BackButton path="/" />
    </>
  );
};

export default JoinCohorts;
