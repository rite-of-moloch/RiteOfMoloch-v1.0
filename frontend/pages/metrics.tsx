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
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { COHORTS } from "utils/subgraph/queries";
import { SelectOptions } from "utils/types/select";
import { Cohort } from "utils/types/subgraphQueries";
import { useAccount } from "wagmi";
import CohortMetricsBox from "components/CohortMetricsBox";

// TODO: DELETE WHEN SUBGRAPH IS READY
const fakeMetrics1 = {
  id: "0x09cd0f78f44f3140d560fd0538b8d4baa001c685",
  stakingToken: "LINK",
  symbol: "LINK",
  deployDate: "12/12/23",
  onboardingEnd: "12/12/24",
  cohortSize: 15,
  successPercent: 18,
  membersSlashed: 1,
  treasurySize: 10000000,
  lastMemberStaked: "04/04/23",
  sbtImage: "assets/season-v-token.svg",
};
const fakeMetrics2 = {
  id: "0x8afba3ef4a4e8f87dd759851b61b5641e8a4461d",
  stakingToken: "LINK",
  symbol: "LINK",
  deployDate: "12/12/23",
  onboardingEnd: "12/12/24",
  cohortSize: 15,
  successPercent: 18,
  membersSlashed: 1,
  treasurySize: 10000000,
  lastMemberStaked: "04/04/23",
  sbtImage: "assets/season-v-token.svg",
};

const fakeMetrics3 = {
  id: "0x514b1a78ccf45c76b06a7096d40772cfdcaef1bd",
  stakingToken: "LINK",
  symbol: "LINK",
  deployDate: "12/12/23",
  onboardingEnd: "12/12/24",
  cohortSize: 15,
  successPercent: 18,
  membersSlashed: 1,
  treasurySize: 10000000,
  lastMemberStaked: "04/04/23",
  sbtImage: "assets/season-v-token.svg",
};

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
  const { watch, getValues, setValue } = localForm;
  watch();
  const values = getValues();

  const removeOption = (e: any) => {
    const newSelect = values.chooseCohort?.filter((item: any) => {
      return item.value !== e.currentTarget.id;
    });
    // console.log(newSelect);
    setValue("chooseCohort", newSelect);
  };
  watch();
  // console.log(values.chooseCohort);

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

  const cohortSelect = (
    <SelectForm
      name="chooseCohort"
      placeholder="Select cohorts"
      options={cohortOptions}
      isSearchable
      isMulti
      // isOptionDisabled={() => values.chooseCohort.length}
      localForm={localForm}
    />
  );

  useEffect(() => {}, []);

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
              <>
                <Box mx={4} mt={2}>
                  {cohortSelect}
                </Box>

                <SimpleGrid columns={[1, 1, 3]}>
                  <GridItem m="1rem">
                    {
                      <CohortMetricsBox
                        metrics={fakeMetrics1}
                        removeOption={removeOption}
                      />
                    }
                  </GridItem>
                  <GridItem m="1rem">
                    {
                      <CohortMetricsBox
                        metrics={fakeMetrics2}
                        removeOption={removeOption}
                      />
                    }
                  </GridItem>
                  <GridItem m="1rem">
                    {
                      <CohortMetricsBox
                        metrics={fakeMetrics3}
                        removeOption={removeOption}
                      />
                    }
                  </GridItem>
                </SimpleGrid>
              </>
            )}
          </Box>
          <BackButton path="/admin" />
        </>
      )}
    </>
  );
};

export default Metrics;
