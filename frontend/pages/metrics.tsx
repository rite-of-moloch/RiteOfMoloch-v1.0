import React from "react";
import {
  Box,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@raidguild/design-system";
import BackButton from "components/BackButton";
import NotConnected from "components/NotConnected";
import SelectForm from "components/SelectForm";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { FieldValues, useForm } from "react-hook-form";
import { COHORTS, METRICS } from "utils/subgraph/queries";
import { SelectOptions } from "utils/types/select";
import { Cohort } from "utils/types/subgraphQueries";
import { useAccount } from "wagmi";
import CohortMetricsBox from "components/CohortMetricsBox";
import CohortMetricsOverall from "components/CohortMetricsOverall";

/**
 * @remarks use can select up to 3 cohorts. Metrics about the cohort will be rendered onto this page. Data gets pulled from subgraph query
 * @returns
 */
const Metrics = () => {
  const { isConnected } = useAccount();
  const localForm = useForm<FieldValues>();
  const { watch, getValues, setValue } = localForm;
  watch();
  const values = getValues();

  /**
   *
   * @remarks if use clicks on X in CohortMetricsBox, function below checks cohort.id and removes it from values.chooseCohort array if it matches
   */
  const removeOption = (e: any) => {
    const newSelect = values.chooseCohort?.filter((item: any) => {
      console.log(item.value);
      return item.value !== e.currentTarget.id;
    });
    setValue("chooseCohort", newSelect);
  };
  watch();

  const cohorts = useSubgraphQuery(COHORTS());
  const isLoading = cohorts.isLoading;
  const cohort: Cohort[] | undefined = cohorts?.data?.cohorts;

  const cohortOptions: SelectOptions = [];
  cohort?.map((chort) => {
    cohortOptions.push({
      value: chort?.id,
      label: chort?.id,
    });
  });

  cohortOptions.unshift({
    value: "overallPerformance",
    label: "Overall performance",
  });

  console.log(cohortOptions);

  const cohortSelect = (
    <SelectForm
      name="chooseCohort"
      placeholder="Select cohorts"
      options={cohortOptions}
      isSearchable
      isMulti
      localForm={localForm}
    />
  );

  /**
   * @remarks loop over values.chooseCohort. For each cohort.id, run a subgraph query which renders cohort meterics data and renders it into CohortMetricsBox
   */

  // console.log(values.chooseCohort);
  // prepare cohort ID's to pass into subgraphQuery
  let cohortId1 = values.chooseCohort?.[0]?.value;
  let cohortId2 = values.chooseCohort?.[1]?.value;
  let cohortId3 = values.chooseCohort?.[2]?.value;
  console.log(cohortId1, cohortId2);

  // const overallMetrics = useSubgraphQuery(METRICS());

  const arrLength = values.chooseCohort?.length;
  const gridLogic = () => {
    switch (arrLength) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 3;
      default:
        return 1;
    }
  };
  console.log("arrLength", arrLength);

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <>
          <Box textAlign="center" w={["full", "full", "80%"]} py={2}>
            <Heading as="h2">Cohort Metrics</Heading>
            {isLoading && (
              <Box w="full" textAlign="center" p={2} fontFamily="texturina">
                <Spinner size="xl" my="50" color="red" emptyColor="purple" />
                <Text>Loading cohorts...</Text>
              </Box>
            )}
            {!isLoading && (
              <SimpleGrid columns={[1, arrLength > 0 ? 2 : 1, gridLogic()]}>
                {cohortId1 && (
                  <GridItem mr={[0, "0.5rem", "1rem"]} mt={["1rem"]}>
                    {
                      <CohortMetricsBox
                        id={cohortId1 ? cohortId1 : null}
                        removeOption={removeOption}
                        overallPerformance={cohortId1 === "overallPerformance"}
                      />
                    }
                  </GridItem>
                )}
                {cohortId2 && (
                  <GridItem mx={[0, "0.5rem"]} mt="1rem">
                    {
                      <CohortMetricsBox
                        id={cohortId2 ? cohortId2 : null}
                        removeOption={removeOption}
                        overallPerformance={cohortId2 === "overallPerformance"}
                      />
                    }
                  </GridItem>
                )}
                {/* TODO: SETUP CohortMetricsOverall */}
                {cohortId3 && (
                  <GridItem
                    ml={[0, "0rem", "1rem"]}
                    mr={[0]}
                    pr={[0, "0.5rem", 0]}
                    mt="1rem"
                  >
                    {
                      <CohortMetricsBox
                        id={cohortId3 ? cohortId3 : null}
                        removeOption={removeOption}
                        overallPerformance={cohortId3 === "overallPerformance"}
                      />
                    }
                  </GridItem>
                )}
                <GridItem
                  display={arrLength === 3 ? "none" : ""}
                  ml={[0, "0.5rem", "1rem"]}
                  pr={[0, "1rem", 0]}
                  mt="1rem"
                  w={[
                    "full",
                    "full",
                    arrLength === 0 || !arrLength ? "50%" : "full",
                  ]}
                  justifySelf={
                    arrLength === 0 || !arrLength ? "center" : "auto"
                  }
                >
                  {cohortSelect}
                </GridItem>
              </SimpleGrid>
            )}
          </Box>
          <BackButton path="/admin" />
        </>
      )}
    </>
  );
};

export default Metrics;
