import React from "react";
import { Box, Heading, Spinner, Stack, Text } from "@raidguild/design-system";
import BackButton from "components/BackButton";
import { useAccount } from "wagmi";
import SearchCohorts from "components/cohort/SearchCohorts";
import { FieldValues, useForm } from "react-hook-form";
import InitiatesAll from "components/InitiatesAll";
import { unixToUTC } from "utils/general";
import GridTemplate from "components/GridTemplate";
import { useGraphClient } from "hooks/useGraphClient";
import { useQuery } from "@tanstack/react-query";
import { zeroAddress } from "utils/constants";

/**
 * @returns list of all addresses that have staked to a cohort
 */
const Initiates = () => {
  const { isConnected } = useAccount();
  const graphClient = useGraphClient();

  const localForm = useForm<FieldValues>();
  const { watch, getValues } = localForm;
  watch();
  const searchResult = getValues().searchResult;

  const { data: initiates, isLoading } = useQuery({
    queryKey: ["initiates"],
    queryFn: async () => graphClient.Initiates(),
    enabled: isConnected,
  });

  const renderInitiates = initiates?.initiates.map((initiate) => {
    const joinedAt = Number(initiate.joinedAt);
    console.log(initiate);
    return (
      <InitiatesAll
        address={initiate.address}
        cohortName={initiate.cohort?.name || "N/A"}
        cohortAddress={initiate.cohort?.address || zeroAddress}
        stake={initiate.stakeAmount}
        joinedAt={unixToUTC((joinedAt * 1000).toString())}
        key={initiate.id}
      />
    );
  });

  const filteredInitiates = renderInitiates?.filter((initiate) => {
    if (searchResult === "" || !searchResult) {
      return initiate;
    } else if (
      initiate.props.address?.includes(searchResult) ||
      initiate.props.cohortId?.includes(searchResult)
    ) {
      return initiate;
    }
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
