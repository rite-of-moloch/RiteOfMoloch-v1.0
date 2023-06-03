import React, { useEffect, useState } from "react";
import { Box, Heading, Spinner, Stack, Text } from "@raidguild/design-system";
import BackButton from "components/BackButton";
import NotConnected from "components/NotConnected";
import { useAccount } from "wagmi";
import SearchCohorts from "components/SearchCohorts";
import { FieldValues, useForm } from "react-hook-form";
import InitiatesAll from "components/InitiatesAll";
import { unixToUTC } from "utils/general";
import GridTemplate from "components/GridTemplate";
import { useGraphClient } from "hooks/useGraphClient";
import { InitiateDetailsFragment } from ".graphclient";

/**
 * @returns list of all addresses that have staked to a cohort
 */
const Initiates = () => {
  const { isConnected } = useAccount();
  const graphClient = useGraphClient();
  const [initiates, setInitiates] = useState<InitiateDetailsFragment[]>();

  const localForm = useForm<FieldValues>();
  const { watch, getValues } = localForm;
  watch();
  const searchResult = getValues().searchResult;

  useEffect(() => {
    const getInitiates = async () => {
      const query = await graphClient.Initiates();
      setInitiates(query.initiates);
    };
    getInitiates();
  }, []);

  const renderInitiates = initiates?.map((initiate) => {
    const cohortID = initiate.id.split("-")[1];
    const joinedAt = Number(initiate.joinedAt);
    return (
      <InitiatesAll
        address={initiate.address}
        cohortId={cohortID}
        stake={initiate.stake}
        joinedAt={unixToUTC((joinedAt * 1000).toString())}
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

  const isInitiates = renderInitiates && renderInitiates.length > 0;

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <>
          <Heading as="h1" textAlign="center" color="#FF3864">
            Initiates
          </Heading>
          { !isInitiates && (
            <Box w="full" textAlign="center" p={2} fontFamily="texturina">
              <Spinner size="xl" my="50" color="red" emptyColor="purple" />
              <Text>Loading cohorts...</Text>
            </Box>)
          }

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
