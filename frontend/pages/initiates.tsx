import React from "react";
import { Box, Heading, Spinner, Stack, Text } from "@raidguild/design-system";
import BackButton from "components/BackButton";
import SearchCohorts from "components/cohort/SearchCohorts";
import { FieldValues, useForm } from "react-hook-form";
import InitiatesAll from "components/InitiatesAll";
import { unixToUTC } from "utils/general";
import GridTemplate from "components/GridTemplate";
import { zeroAddress } from "utils/constants";
import { useInitiates } from "hooks/useInitiates";

/**
 * @returns list of all addresses that have staked to a cohort
 */
const Initiates = () => {
  const { initiates, isLoading } = useInitiates();

  const localForm = useForm<FieldValues>();
  const { watch, getValues } = localForm;
  watch();
  const searchResult = getValues("searchResult");

  const filteredInitiates = initiates?.initiates
    .filter((initiate) => {
      if (
        searchResult === "" ||
        !searchResult ||
        initiate.address?.includes(searchResult) ||
        initiate.cohort.id?.includes(searchResult)
      )
        return initiate;
    })
    .map((initiate) => {
      return (
        <InitiatesAll
          address={initiate.address}
          cohortName={initiate.cohort?.name || "N/A"}
          cohortAddress={initiate.cohort?.address}
          stake={initiate.stakeAmount}
          joinedAt={unixToUTC((initiate.joinedAt * 1000).toString())}
          key={initiate.id}
        />
      );
    });

  return (
    <>
      <Heading as="h1" textAlign="center" color="#FF3864">
        Initiates
      </Heading>

      {isLoading ? (
        <Box w="full" textAlign="center" p={2} fontFamily="texturina">
          <Spinner size="xl" my="50" color="red" emptyColor="purple" />
          <Text>Loading cohorts...</Text>
        </Box>
      ) : (
        <>
          <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
            <Box w={["50%", "50%", "40%", "30%"]} alignSelf="end">
              <SearchCohorts name="searchResult" localForm={localForm} />
            </Box>
            <GridTemplate
              column1="Address"
              column2="Cohort"
              column3="Stake"
              column4="DateStaked"
              column5={" "}
              isHeading
            />
            {filteredInitiates}
          </Stack>
          <Box textAlign="center" w={["full", "full", "80%"]} py={2}></Box>
          <BackButton path="/admin" />
        </>
      )}
    </>
  );
};

export default Initiates;
