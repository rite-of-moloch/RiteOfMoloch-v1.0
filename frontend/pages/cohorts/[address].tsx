import { FC, ReactNode } from "react";
import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@raidguild/design-system";
import { useRouter } from "next/router";
import {
  COHORT_INITIATES,
  COHORTS,
  COHORT_METADATA,
} from "utils/subgraph/queries";
import { MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import InitiateData from "components/initiateData";
import { useSubgraphReactQuery } from "hooks/useSubgraphReactQuery";

interface CohortProps {
  children: ReactNode;
}

const Cohort: FC<CohortProps> = ({ children }) => {
  const { chain } = useNetwork();
  const router = useRouter();
  const { address } = router.query;

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address}
    </Link>
  );

  /*
  const initiates = useSubgraphQuery(COHORT_INITIATES(address, 0, 10));

  const initiateList: MemberData[] | null =
    initiates.data && initiates?.data?.cohort?.initiates;
  console.log("initiateList", initiateList);

  console.log(initiates);

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

   */

  const {
    data: initiates,
    isLoading,
    error,
  } = useSubgraphReactQuery(COHORT_INITIATES(address), address);
  console.log("COHORT_INITIATES", initiates);

  const initiateList: MemberData[] | null =
    initiates?.data && initiates?.data?.cohort?.initiates;
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
      <Heading as="h1" textAlign="center" color="red">
        Cohort Initiates
      </Heading>
      <Heading
        as="h4"
        fontSize="md"
        fontWeight="normal"
        textAlign="center"
        color="white"
      >
        {address}
      </Heading>
      {/* {renderInitiateList && renderInitiateList.length > 0 && (
        <SimpleGrid
          columns={4}
          fontFamily="texturina"
          justifyContent="center"
          alignItems="center"
          px={4}
          spacingX={2}
          w="full"
        >
          <Box justifySelf="start">Address</Box>
          <Box justifySelf="center">Shares</Box>
          <Box justifySelf="center">Date Staked</Box>
        </SimpleGrid>
      )} */}
      {/* {renderInitiateList && renderInitiateList.length > 0 ? (
        renderInitiateList
      ) : (
        <Box
          border="1px solid #FF3864"
          textAlign="center"
          fontFamily="texturina"
          rounded="lg"
        >
          <Text my={10}>Nobody has staked to this cohort yet!</Text>
        </Box>
      )} */}
      <Box
      // textAlign="center"
      >
        <Link href="/cohorts">
          <Button variant="outline">back</Button>
        </Link>
      </Box>
    </Stack>
  );
};

export default Cohort;
