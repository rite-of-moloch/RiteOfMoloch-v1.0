import { FC, ReactNode } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@raidguild/design-system";
import { useRouter } from "next/router";
import { COHORT_INITIATES } from "utils/subgraph/queries";
import { MemberData } from "utils/types/subgraphQueries";
import { useAccount, useNetwork } from "wagmi";
import InitiateData from "components/InitiateData";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import BackButton from "components/BackButton";
import NotConnected from "components/NotConnected";
import useIsMember from "hooks/useIsMember";
import NobodyStaked from "components/NobodyStaked";
import { unixToUTC } from "utils/general";

interface CohortDetailProps {
  children: ReactNode;
}

const CohortDetail: FC<CohortDetailProps> = ({ children }) => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { address: cohortAddress } = router.query;

  const userAddress: string = address ? address : "";

  const isMember = useIsMember([userAddress]);
  console.log("isMember", isMember);

  const { data: initiates, isLoading } = useSubgraphQuery(
    COHORT_INITIATES(cohortAddress),
    Boolean(cohortAddress) ? true : false
  );
  // console.log(isLoading);

  const initiateList: MemberData[] | null =
    initiates?.cohort && initiates?.cohort?.initiates;
  // console.log("initiateList", initiateList);

  const renderInitiateList = initiateList?.map((initiate: MemberData) => {
    return (
      <InitiateData
        address={initiate.address}
        id={initiate.id}
        joinedAt={unixToUTC(initiate.joinedAt)}
        stake={initiate.stake}
        key={initiate.id}
      />
    );
  });

  const isInitiates = renderInitiateList && renderInitiateList.length > 0;

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address}
    </Link>
  );

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <Stack
          w={["full", "full", "80%"]}
          alignSelf="center"
          spacing={5}
          my={!isInitiates ? 8 : 0}
        >
          <Heading as="h1" textAlign="center" color="red">
            Cohort Initiates
          </Heading>
          <Heading as="h4" fontSize="md" fontWeight="normal" textAlign="center">
            {cohortAddress}
          </Heading>
          {isInitiates && (
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
          )}
          {isLoading && (
            <Box w="full" textAlign="center" p={2} fontFamily="texturina">
              <Spinner size="xl" my="50" color="red" emptyColor="purple" />
              <Text>Loading initiates...</Text>
            </Box>
          )}
          {isInitiates
            ? !isLoading && renderInitiateList
            : !isLoading && <NobodyStaked />}

          <BackButton path="/cohorts" />
        </Stack>
      )}
      {children}
    </>
  );
};

export default CohortDetail;
