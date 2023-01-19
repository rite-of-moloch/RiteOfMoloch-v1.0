import { FC, ReactNode } from "react";
import {
  Box,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@raidguild/design-system";
import { useRouter } from "next/router";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { cohortMetadata, cohortInitiates } from "utils/subgraph/queries";
import { CohortMetadata, MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import InitiateData from "components/initiateData";
import Head from "next/head";

interface CohortProps {
  children: ReactNode;
}

const Cohort: FC<CohortProps> = ({ children }) => {
  const router = useRouter();
  const { chain } = useNetwork();
  const { pid } = router.query;

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address}
    </Link>
  );

  const timeUTC = (time: string) => new Date(time).toUTCString();

  // const metadata = useSubgraphQuery(cohortMetadata(pid));

  // const cohort: CohortMetadata | null =
  //   metadata.data && metadata?.data["cohort"];

  const initiates = useSubgraphQuery(cohortInitiates(pid, 0, 10));

  const initiateList: MemberData | null =
    initiates.data && initiates?.data["cohort"]?.initiates;
  console.log("initiateList", initiateList);

  const renderInitiateList = initiateList?.map((initiate: MemberData) => {
    return (
      <InitiateData
        address={initiate.address}
        id={initiate.id}
        joinedAt={initiate.joinedAt}
        stake={initiate.stake}
      />
    );
  });

  return (
    <Stack w="full" alignSelf="start" spacing={5}>
      <Heading as="h2" fontSize="lg" textAlign="left" color="red">
        Cohort {pid}
      </Heading>
      {renderInitiateList}
    </Stack>
  );
};

export default Cohort;
