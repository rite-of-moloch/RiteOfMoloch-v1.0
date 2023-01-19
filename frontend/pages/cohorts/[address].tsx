import { FC, ReactNode } from "react";
import { Heading, Link, Stack } from "@raidguild/design-system";
import { useRouter } from "next/router";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { cohortInitiates } from "utils/subgraph/queries";
import { MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import InitiateData from "components/initiateData";

interface CohortProps {
  children: ReactNode;
}

const Cohort: FC<CohortProps> = ({ children }) => {
  const router = useRouter();
  const { chain } = useNetwork();
  const { address } = router.query;

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address}
    </Link>
  );

  const timeUTC = (time: string) => new Date(time).toUTCString();

  // const metadata = useSubgraphQuery(cohortMetadata(address));

  // const cohort: CohortMetadata | null =
  //   metadata.data && metadata?.data["cohort"];

  const initiates = useSubgraphQuery(cohortInitiates(address, 0, 10));

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
        Cohort {address}
      </Heading>
      {renderInitiateList}
    </Stack>
  );
};

export default Cohort;
