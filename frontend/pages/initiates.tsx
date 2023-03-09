import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import BackButton from "components/BackButton";
import NotConnected from "components/NotConnected";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import useCohortName from "hooks/useCohortName";
import { INITIATES } from "utils/subgraph/queries";
import { useAccount } from "wagmi";
import { Initiates } from "utils/types/subgraphQueries";
import SearchCohorts from "components/SearchCohorts";
import { FieldValues, useForm } from "react-hook-form";
import InitiatesAll from "components/InitiatesAll";
import { unixToUTC } from "utils/general";

/**
 * @returns list of all addresses that have staked to a cohort
 */
const Initiates = () => {
  const { isConnected } = useAccount();

  const localForm = useForm<FieldValues>();
  const { watch, getValues } = localForm;
  watch();
  const searchResult = getValues().searchResult;

  const initiates = useSubgraphQuery(INITIATES());
  const isLoading = initiates.isLoading;
  const initiatesList: Initiates[] | undefined =
    initiates?.data?.data?.data?.initiates;

  const renderInitiates = initiatesList?.map((initiate) => {
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

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <>
          <Heading as="h1" textAlign="center" color="#FF3864">
            Initiates
          </Heading>
          {isLoading && (
            <Box w="full" textAlign="center" p={2} fontFamily="texturina">
              <Spinner size="xl" my="50" color="red" emptyColor="purple" />
              <Text>Loading cohorts...</Text>
            </Box>
          )}

          <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
            <Box w={["50%", "50%", "40%", "30%"]} alignSelf="end">
              <SearchCohorts name="searchResult" localForm={localForm} />
            </Box>
            <SimpleGrid columns={5} fontWeight="bold">
              <GridItem margin="auto">
                <Text>Address</Text>
              </GridItem>
              <GridItem margin="auto">
                <Text>Cohort</Text>
              </GridItem>
              <GridItem margin="auto">
                <Text>Stake</Text>
              </GridItem>
              <GridItem margin="auto">
                <Text>Date Staked</Text>
              </GridItem>
            </SimpleGrid>
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
