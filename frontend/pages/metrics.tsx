import React, { useEffect } from "react";
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
import { COHORTS, COHORT_METADATA } from "utils/subgraph/queries";
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

const metricsArray = [fakeMetrics1, fakeMetrics2, fakeMetrics3];

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
      return item.value !== e.currentTarget.id;
    });
    // console.log(newSelect);
    setValue("chooseCohort", newSelect);
  };
  // watch();

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

  /**
   * @remarks loop over values.chooseCohort. For each cohort.id, run a subgraph query which renders cohort meterics data and renders it into CohortMetricsBox
   */

  // console.log(values.chooseCohort);
  // prepare cohort ID's to pass into subgraphQuery
  let id1 = values.chooseCohort?.[0]?.value;
  let id2 = values.chooseCohort?.[1]?.value;
  let id3 = values.chooseCohort?.[2]?.value;

  // TODO: replace subgraph query with cohort metrics data
  // TODO: replace cohortData1a... with cohortData1
  const query1 = useSubgraphQuery(COHORT_METADATA(id1));
  const query2 = useSubgraphQuery(COHORT_METADATA(id2));
  const query3 = useSubgraphQuery(COHORT_METADATA(id3));
  const cohortData1a = query1?.data?.cohort;
  const cohortData2a = query2?.data?.cohort;
  const cohortData3a = query3?.data?.cohort;

  let cohortData1;
  let cohortData2;
  let cohortData3;

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
          <Box textAlign="center" w="full" py={2}>
            <Heading as="h2">Cohort Metrics</Heading>
            {isLoading && (
              <Box w="full" textAlign="center" p={2} fontFamily="texturina">
                <Spinner size="xl" my="50" color="red" emptyColor="purple" />
                <Text>Loading cohorts...</Text>
              </Box>
            )}
            {!isLoading && (
              <SimpleGrid columns={gridLogic()} border="1px">
                {cohortData1 && (
                  <GridItem m="1rem">
                    {
                      <CohortMetricsBox
                        metrics={cohortData1 ? cohortData1 : null}
                        removeOption={removeOption}
                      />
                    }
                  </GridItem>
                )}
                {cohortData2 && (
                  <GridItem m="1rem">
                    {
                      <CohortMetricsBox
                        metrics={cohortData2 ? cohortData2 : null}
                        removeOption={removeOption}
                      />
                    }
                  </GridItem>
                )}
                {cohortData3 && (
                  <GridItem m="1rem">
                    {
                      <CohortMetricsBox
                        metrics={cohortData3 ? cohortData3 : null}
                        removeOption={removeOption}
                      />
                    }
                  </GridItem>
                )}
                <GridItem
                  display={arrLength === 3 ? "none" : "block"}
                  m="1rem"
                  w={arrLength === 0 || !arrLength ? "50%" : "full"}
                  justifySelf={arrLength === 0 || !arrLength ? "center" : "end"}
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
