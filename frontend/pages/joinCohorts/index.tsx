import React, { ReactNode } from "react";
import { Box, Heading, HStack, Spinner, Stack } from "@raidguild/design-system";
import BackButton from "components/BackButton";
import CohortDetail from "components/CohortDetail";
import NotConnected from "components/NotConnected";
import SearchCohorts from "components/SearchCohorts";
import { FieldValues, useForm } from "react-hook-form";
import { getDeadline, unixToUTC } from "utils/general";
import { useAccount } from "wagmi";
import useRiteBalanceOf from "hooks/useRiteBalanceOf";
import GridTemplate from "components/GridTemplate";
import useCohorts from "hooks/useCohorts";

/**
 * @remarks Non-admin page. Page for prospective and cohort members
 */
const JoinCohorts: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { cohorts, isLoading } = useCohorts();

  const localForm = useForm<FieldValues>();
  const { getValues, watch } = localForm;
  watch();
  const searchResult = getValues().searchResult;
  const selectCohorts = getValues().selectCohorts?.value;


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

  const renderCohorts = cohorts?.map((cohort) => (
    <CohortDetail
      address={cohort.address}
      stake={cohort.tokenAmount}
      stakingAsset={cohort.token}
      stakingDate={unixToUTC(getDeadline(cohort.createdAt, cohort.time))}
      key={cohort.address}
      memberOrAdmin={"member"}
    />
  ));

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

  if (!isConnected) {
    return <NotConnected />;
  }

  return (
    <>
      <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
        <Heading as="h1" textAlign="center" color="#FF3864">
          Active Cohorts
        </Heading>

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
