import { ReactNode } from "react";
import {
  Box,
  GridItem,
  Heading,
  HStack,
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
import NobodyStaked from "components/NobodyStaked";
import useCohortName from "hooks/useCohortName";
import AddAdminModal from "components/AddAdminModal";
import { RxOpenInNewWindow } from "react-icons/rx";

interface CohortDetailProps {
  children: ReactNode;
}

const CohortDetail: React.FC<CohortDetailProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const { address: cohortAddress } = router.query;

  const { data, isLoading } = useSubgraphQuery(COHORT_INITIATES(cohortAddress));

  const initiateList: MemberData[] | undefined =
    data?.data?.data?.cohort?.initiates;

  console.log(initiateList);

  const renderInitiateList = initiateList?.map((initiate: MemberData) => {
    const dateJoined = new Date(+initiate.joinedAt * 1000).toLocaleDateString();
    return (
      <InitiateData
        address={initiate.address}
        cohortAddress={cohortAddress?.toString() || ""}
        id={initiate.id}
        joinedAt={dateJoined}
        stake={initiate.stake}
        key={initiate.id}
      />
    );
  });

  const isInitiates = renderInitiateList && renderInitiateList.length > 0;

  const cohortName = useCohortName(cohortAddress?.toString() || "");

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
          <Heading as="h2" textAlign="center" color="red">
            {cohortName?.toString().toUpperCase()}
          </Heading>
          <Stack
            direction={["column", "column", "row"]}
            textAlign="center"
            justifyContent="center"
            alignItems="center"
          >
            <Link
              fontSize={["sm", "md"]}
              href={`${chain?.blockExplorers?.default.url}/address/${cohortAddress}`}
              isExternal
            >
              {cohortAddress}
            </Link>
            <Box>
              {/* <AddAdminModal address={cohortAddress?.toString()} /> */}
            </Box>
          </Stack>

          {/* <HStack textAlign="center">
            <Box fontSize="md" fontWeight="normal" mb={"1rem"}>
              <Link
                href={`${chain?.blockExplorers?.default.url}/address/${cohortAddress}`}
                isExternal
              >
                {cohortAddress}
              </Link>
            </Box> */}
          {/* <Box>
            <AddAdminModal address={cohortAddress?.toString()} />
          </Box> */}
          {/* </HStack> */}

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
              <GridItem margin="auto">Initiate</GridItem>
              <GridItem margin="auto">Shares</GridItem>
              <GridItem margin="auto">Date Staked</GridItem>
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
