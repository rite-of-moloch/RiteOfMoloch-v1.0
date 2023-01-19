import React, { FC, ReactNode, useState } from "react";
import { Heading, VStack } from "@raidguild/design-system";
import { useQuery } from "react-query";
import CohortDetail from "../components/cohortDetail";
import { useSubgraphQuery } from "../hooks/useSubgraphQuery";
import { cohorts } from "../utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";

interface ReviewOngoingCohortProps {
  children?: ReactNode;
}

const reviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const [page, setPage] = useState(0);

  const cohortList = useSubgraphQuery(cohorts(0, 10));
  const cohort: Cohort | null = cohortList.data && cohortList?.data["cohorts"];
  console.log(cohort);

  // const getCohorts = (pageParam: number) => {
  //   const cohort = cohortList?.data?.cohorts;
  //   return cohort;
  // };

  // const { status, data, error, isFetching, isPreviousData } = useQuery({
  //   queryKey: ["cohorts", page],
  //   queryFn:
  //     () =>
  //     ({ pageParam = 0 }) =>
  //       getCohorts(pageParam),
  //   keepPreviousData: true,
  //   staleTime: 5000,
  // });

  const renderCohorts = cohort
    ? cohort?.map((cohort: { [x: string]: string }) => {
        return (
          <CohortDetail
            cohortName={"cohort name"}
            address={cohort.id}
            stake={555}
            stakingDate={cohort.tokenAmount}
            key={cohort.id}
          />
        );
      })
    : null;

  return (
    <>
      <VStack spacing={6} w={["full", "80%"]}>
        {renderCohorts}
      </VStack>
    </>
  );
};

export default reviewOngoingCohort;
