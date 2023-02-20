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
import { getHasRite } from "utils/general";
import { COHORT_METADATA } from "utils/subgraph/queries";
import { useRouter } from "next/router";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { ReactNode } from "react";
import BackButton from "components/BackButton";
import NotConnected from "components/NotConnected";
import useTokenSymbol from "hooks/useTokenSymbol";
import useRiteBalanceOf from "hooks/useRiteBalanceOf";
import useIsMember from "hooks/useIsMember";
import useClaimStake from "hooks/useClaimStake";
import BlockExplorerLink from "components/BlockExplorerLink";

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

  const cohortMetadata = useSubgraphQuery(COHORT_METADATA(cohortAddress));
  const cohortData = cohortMetadata?.data?.cohort;
  // console.log(cohortData);

  const tokenSymbol = useTokenSymbol(cohortData?.token);

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  const riteBalance = useRiteBalanceOf(cohortAddress?.toString() || "", [
    userAddress(),
  ]);

  // TODO: check getHasRite hook. After running claim stake, it still shows user as staked
  const isStaked = getHasRite(riteBalance);

  const isMember = useIsMember(cohortData?.id, [userAddress()]);

  const { writeClaimStake, isLoadingClaimStake } = useClaimStake(
    cohortData?.id
  );

  const handleClaimStake = () => {
    console.log("isMember? claim stake", isMember);
    if (isMember && isStaked) {
      writeClaimStake && writeClaimStake();
    }
  };

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <VStack
          border="1px solid red"
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
              Minimum Stake
            </Box>
            <Box justifySelf="center" textAlign="center" w="full">
              Join Cohort
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
            borderTop="1px solid red"
            borderBottom="1px solid red"
            alignItems="center"
          >
            <Box justifySelf="start" textAlign="center" w="full">
              {BlockExplorerLink(chain, cohortData?.id)}
            </Box>
            <Box justifySelf="center" textAlign="center" w="full">
              <Text>
                <span>{cohortData?.tokenAmount}</span>
                <span style={{ marginLeft: "0.25em" }}>{tokenSymbol}</span>
              </Text>
            </Box>

            <Box justifySelf="center" textAlign="center" w="full">
              <Link href={`/stake/${cohortAddress}`}>
                <Button size="xs">Stake</Button>
              </Link>
            </Box>
          </SimpleGrid>
          <Box p={4}>
            <Image
              m="auto"
              src={cohortData.sbtUrl}
              alt="SBT image preview"
              w="250px"
              boxShadow="dark-lg"
              p="2"
              rounded="md"
              bg="gray"
            />
          </Box>
          {isMember && isStaked && (
            <Box>
              <Button
                size="md"
                onClick={handleClaimStake}
                disabled={!isStaked}
                isLoading={isLoadingClaimStake}
              >
                Claim Stake
              </Button>
            </Box>
          )}
        </VStack>
      )}
      {isConnected && <BackButton path="/joinCohorts" />}
    </>
  );
};

export default CohortPage;
