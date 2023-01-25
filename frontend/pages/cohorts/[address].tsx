import { FC, ReactNode } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
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
import BackButton from "components/BackButton";

interface CohortProps {
  children: ReactNode;
}

const Cohort: FC<CohortProps> = ({ children }) => {
  const { chain } = useNetwork();
  const router = useRouter();
  const { address } = router.query;

  const {
    data: initiates,
    isLoading,
    error,
  } = useSubgraphReactQuery(
    COHORT_INITIATES(address),
    Boolean(address) ? true : false
  );

  console.log("COHORT_INITIATES", initiates);

  const initiateList: MemberData[] | null =
    initiates?.cohort && initiates?.cohort?.initiates;
  console.log("initiateList", initiateList);

  const renderInitiateList = initiateList?.map((initiate: MemberData) => {
    return (
      <InitiateData
        address={initiate.address}
        id={initiate.id}
        joinedAt={initiate.joinedAt}
        stake={initiate.stake}
        key={initiate.id}
      />
    );
  });

  const isInitiates = renderInitiateList && renderInitiateList.length > 0;

  console.log("renderInitiateList", renderInitiateList);

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address}
    </Link>
  );

  return (
    <Stack
      w={["full", "full", "80%"]}
      alignSelf="center"
      spacing={5}
      my={!isInitiates ? 8 : 0}
    >
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
      {isInitiates ? (
        renderInitiateList
      ) : (
        <VStack
          border="1px solid #FF3864"
          textAlign="center"
          alignSelf="center"
          fontFamily="texturina"
          rounded="lg"
          bg="black"
          p={4}
          w={["full", "80%"]}
        >
          <Box mb={"0.5em"}>
            <Text>Nobody has staked to this cohort yet...</Text>
          </Box>
          <Box
            bgImage="/assets/raid__banner.png"
            bgPosition="center"
            bgRepeat="no-repeat"
            w="full"
            h="89px"
          />
        </VStack>
      )}

      <BackButton />
    </Stack>
  );
};

export default Cohort;
