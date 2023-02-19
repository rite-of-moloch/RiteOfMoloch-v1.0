import { Box, Heading, Spinner, Text } from "@raidguild/design-system";
import BackButton from "components/BackButton";
import NotConnected from "components/NotConnected";
import SelectForm from "components/SelectForm";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { COHORTS } from "utils/subgraph/queries";
import { SelectOptions } from "utils/types/select";
import { Cohort } from "utils/types/subgraphQueries";
import { useAccount } from "wagmi";

interface MetricsProps {
  cohort1?: any;
  cohort2?: any;
  cohort3?: any;
}
/**
 * @remarks use can select up to 3 cohorts. Metrics about the cohort will be rendered onto this page. Data gets pulled from subgraph query
 * @returns
 */
const Metrics: React.FC<MetricsProps> = ({ cohort1, cohort2, cohort3 }) => {
  const { isConnected } = useAccount();
  const localForm = useForm<FieldValues>();
  const { watch, getValues } = localForm;
  watch();
  const values = getValues();
  // console.log(values);

  const cohorts = useSubgraphQuery(COHORTS(), true);
  const isLoading = cohorts.isLoading;
  const cohort: Cohort[] | undefined = cohorts?.data?.cohorts;

  const cohortOptions: SelectOptions = [];
  cohort?.map((chort) => {
    cohortOptions.push({
      value: chort?.id,
      label: chort?.id,
    });
  });

  console.log(cohortOptions);

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <>
          <Box textAlign="center" w="full" p={2}>
            <Heading as="h2">Cohort Metrics</Heading>
            {isLoading && (
              <Box w="full" textAlign="center" p={2} fontFamily="texturina">
                <Spinner size="xl" my="50" color="red" emptyColor="purple" />
                <Text>Loading cohorts...</Text>
              </Box>
            )}
            {!isLoading && (
              <Box w={["full", "full", "full", "50%"]} mx="auto" mt="5rem">
                <SelectForm
                  name="chooseCohort"
                  placeholder="choose cohort (3 max)"
                  options={cohortOptions}
                  isClearable={true}
                  isSearchable
                  localForm={localForm}
                />
              </Box>
            )}
          </Box>
          <BackButton path="/admin" />
        </>
      )}
    </>
  );
};

export default Metrics;
