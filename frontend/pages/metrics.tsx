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
import { FieldValues, useForm } from "react-hook-form";
import { SelectOptions } from "utils/types/select";
import { useAccount } from "wagmi";
import CohortMetricsBox from "components/CohortMetricsBox";
import useCohorts from "hooks/useCohorts";

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
      // console.log(item.value);
      return item.value !== e.currentTarget.id;
    });
    setValue("chooseCohort", newSelect);
  };
  watch();

  const cohorts = useCohorts();

  const cohortOptions: SelectOptions = [];
  cohorts?.map((chort) => {
    cohortOptions.push({
      value: chort?.id,
      label: chort?.id,
    });
  });

  cohortOptions.unshift({
    value: "overallPerformance",
    label: "Overall performance",
  });

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

  // prepare cohort ID's to pass into subgraphQuery
  let cohortId1 = values.chooseCohort?.[0]?.value;
  let cohortId2 = values.chooseCohort?.[1]?.value;
  let cohortId3 = values.chooseCohort?.[2]?.value;

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

  if (!isConnected) return <NotConnected />;
  return (
    <>
      (
      <>
        <Box textAlign="center" w={["full", "full", "80%"]} py={2}>
          <Heading as="h2">Cohort Metrics</Heading>
          {cohorts === undefined && (
            <Box w="full" textAlign="center" p={2} fontFamily="texturina">
              <Spinner size="xl" my="50" color="red" emptyColor="purple" />
              <Text>Loading cohorts...</Text>
            </Box>
          )}
          {
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
                justifySelf={arrLength === 0 || !arrLength ? "center" : "auto"}
              >
                {cohortSelect}
              </GridItem>
            </SimpleGrid>
          }
        </Box>
        <BackButton path="/admin" />
      </>
      )
    </>
  );
};

export default Metrics;
