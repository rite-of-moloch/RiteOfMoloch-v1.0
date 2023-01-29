import {
  Button,
  Text,
  SimpleGrid,
  Box,
  Link,
  VStack,
  Image,
  Heading,
} from "@raidguild/design-system";
import { useAccount, useNetwork } from "wagmi";
import { unixToUTC } from "utils/general";
import { COHORT_INITIATES, COHORT_METADATA } from "utils/subgraph/queries";
import { useRouter } from "next/router";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { ReactNode } from "react";
import BackButton from "components/BackButton";
import NotConnected from "components/NotConnected";

interface CohortPageProps {
  children: ReactNode;
}

/**
 * Checks if msg.sender has staked to the cohort passed in by cohortAddress. Displays data about cohortAddress. msg.sender can re-claim stake, or redirect to page and
 *
 * @param cohortAddress gets passed into subgraphquery endpoints
 * @returns
 */

const CohortPage: React.FC<CohortPageProps> = ({ children }) => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { address: cohortAddress } = router.query;

  // get general data about cohort
  const cohortMetadata = useSubgraphQuery(
    COHORT_METADATA(cohortAddress),
    Boolean(cohortAddress)
  );
  const cohortData = cohortMetadata?.data?.cohort;
  // console.log(cohortData);

  // check if msg.sender has staked to cohort or not
  const cohortInitiates = useSubgraphQuery(
    COHORT_INITIATES(cohortAddress),
    Boolean(cohortAddress)
  );
  // console.log(cohortInitiates);

  const isMsgSenderStaked = (): [Boolean, string | undefined] => {
    const initiateList = cohortInitiates?.data?.cohort.initiates?.map(
      (initiate: { [x: string]: string }) => {
        if (address === initiate.address) {
          return [initiate?.joinedAt, true];
        } else {
          return ["not staked", false];
        }
      }
    );
    console.log(initiateList);

    let joinedAt: undefined | string;
    let staked: Boolean = false;
    initiateList?.forEach((initiate: [string, Boolean]) => {
      console.log(initiate[1]);
      if (initiate[1]) {
        let joinedAt = initiate[0];
        let staked = true;
      } else {
        let staked = false;
      }
    });
    console.log([staked, joinedAt]);
    return [staked, joinedAt];
  };
  const isStaked = isMsgSenderStaked();
  console.log(isStaked);

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address?.slice(0, 4)}...{address?.slice(-6)}
    </Link>
  );

  const stakeButton = (
    <Link href={`/stake/${cohortAddress}`}>
      <Button size="xs">Stake</Button>
    </Link>
  );

  const handleClaimStake = () => {
    console.log("claim stake function");
  };

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <VStack
          border="1px solid #FF3864"
          rounded="xl"
          bg="gradientSBTPrev"
          py={6}
          w={["full", "90%", "70%"]}
        >
          <Heading as="h2" fontSize="md" color="red" my={3}>
            <Text>{cohortData?.id}</Text>
          </Heading>
          <SimpleGrid columns={3} spacingX={2} w="full">
            <Box justifySelf="start" textAlign="center" w="full">
              Address
            </Box>
            <Box justifySelf="center" textAlign="center" w="full">
              Shares
            </Box>
            <Box justifySelf="center" textAlign="center" w="full">
              Date Staked
            </Box>
          </SimpleGrid>
          <SimpleGrid
            columns={3}
            spacingX={2}
            px={2}
            pt={2}
            pb={2.5}
            w="full"
            bg="black"
            borderTop="1px solid #FF3864"
            borderBottom="1px solid #FF3864"
            alignItems="center"
          >
            <Box justifySelf="start" textAlign="center" w="full">
              {blockExplorerLink(cohortData?.id)}
            </Box>
            <Box justifySelf="center" textAlign="center" w="full">
              {cohortData?.tokenAmount}
            </Box>
            {/* show dateStaked for msg.sender */}
            <Box justifySelf="center" textAlign="center" w="full">
              {isStaked[0] ? unixToUTC(isStaked[1] || "") : stakeButton}
            </Box>
          </SimpleGrid>
          <Image
            m="auto"
            src={"/assets/season-v-token.svg"}
            alt="SBT image preview"
            w="250px"
          />
          <Box>
            <Button
              size="md"
              onClick={handleClaimStake}
              disabled={!isStaked[0]}
            >
              Claim Stake
            </Button>
          </Box>
        </VStack>
      )}
      {isConnected && <BackButton path="/joinCohorts" />}
    </>
  );
};

export default CohortPage;
