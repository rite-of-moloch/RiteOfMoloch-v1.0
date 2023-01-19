import { FC, ReactNode } from "react";
import {
  Box,
  HStack,
  Heading,
  Link,
  Stack,
  VStack,
} from "@raidguild/design-system";
import { useRouter } from "next/router";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { cohortMetadata, cohortInitiates } from "utils/subgraph/queries";
import { CohortMetadata, MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import InitiateData from "components/initiateData";

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

  const metadata = useSubgraphQuery(cohortMetadata(pid));

  const cohort: CohortMetadata | null =
    metadata.data && metadata?.data["cohort"];

  const initiates = useSubgraphQuery(cohortInitiates(pid, 0, 10));

  const initiateList: MemberData | null =
    initiates.data && initiates?.data["cohort"]["initiates"];
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
    <Stack direction="column">
      <Stack
        w="full"
        alignSelf="start"
        // borderRight="1px"
        // pr={2}
      >
        <Heading as="h3" fontSize="lg" textAlign="center">
          Cohort metadata:
        </Heading>
        <Box>Cohort Address: {pid}</Box>
        <Box>Created: {cohort && cohort["createdAt"]}</Box>
        <Box>DAO address: {cohort && cohort["dao"]}</Box>
        <Box>Time: {cohort && timeUTC(cohort["time"])}</Box>
        <Box>Token: {cohort && blockExplorerLink(cohort["token"])} </Box>
        <Box>Token amount: {cohort && cohort["tokenAmount"]}</Box>
      </Stack>
      <Stack
        w="full"
        // alignSelf="start"
        // pl={2}
      >
        <Heading as="h3" fontSize="lg" textAlign="center">
          Staked initiates:
        </Heading>
        <Stack spacing={4} m="auto" w="full">
          {renderInitiateList}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Cohort;
