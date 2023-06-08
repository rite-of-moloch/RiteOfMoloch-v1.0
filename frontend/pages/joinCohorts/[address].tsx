import {
  Button,
  Text,
  Box,
  Link,
  VStack,
  Image,
  Heading,
  Tooltip,
} from "@raidguild/design-system";
import { useAccount, useNetwork } from "wagmi";
import { useRouter } from "next/router";
import BackButton from "components/BackButton";
import useTokenSymbol from "hooks/useTokenSymbol";
import useIsMember from "hooks/useIsMember";
import useClaimStake from "hooks/useClaimStake";
import BlockExplorerLink from "components/blockExplorer/BlockExplorerLink";
// import { getDeadline, unixToUTC } from "utils/general";
import GridTemplate from "components/GridTemplate";
import { useCohortByAddress } from "hooks/useCohort";
import { DateTime } from "luxon";

/**
 * Checks if msg.sender has staked to the cohort passed in by cohortAddress. Displays data about cohortAddress. msg.sender can re-claim stake, or redirect to page and
 *
 * @param cohortAddress gets passed into subgraphquery endpoints
 * @returns
 */

const CohortPage = () => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { address: cohortAddress } = router.query;

  const { cohort } = useCohortByAddress((cohortAddress as string) || "");

  const tokenSymbol = useTokenSymbol(cohort?.token);
  const deadline = DateTime.fromSeconds(+cohort?.createdAt).plus({
    seconds: cohort?.time,
  });

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  const isMember = useIsMember(cohort?.address, [userAddress()]);

  console.log(isMember);

  const { writeClaimStake, prepareErrorClaimStake, isLoadingClaimStake } =
    useClaimStake(cohort?.address || "");

  console.log(writeClaimStake);
  // checks error message to see if usere has any stake
  const userHasNoStake =
    prepareErrorClaimStake?.message?.includes("User has no stake");
  console.log(userHasNoStake);

  const handleClaimStake = () => {
    console.log("isMember", isMember);
    if (isMember) {
      writeClaimStake && writeClaimStake();
    }
  };

  return (
    <>
      <VStack
        border="1px solid red"
        rounded="xl"
        bg="gradientSBTPrev"
        py={6}
        w={["full", "90%", "70%"]}
        fontFamily="texturina"
      >
        <Heading as="h2" fontSize="2xl" color="red" my={3}>
          <Text>{cohort && cohort?.name ? cohort.name : "Unknown"}</Text>
        </Heading>
        <GridTemplate
          isHeading
          style="noSideBorders"
          column1="Cohort Address"
          column2="Minimum Stake"
          column3="Deadline"
          column4="Join Cohort"
        />
        <GridTemplate
          column1={
            <Tooltip
              label={cohort?.id}
              shouldWrapChildren
              hasArrow
              placement="bottom"
            >
              {BlockExplorerLink(chain, cohort?.address)}
            </Tooltip>
          }
          column2={
            <Text>
              <span>{cohort?.tokenAmount}</span>
              <span style={{ marginLeft: "0.25em" }}>{tokenSymbol}</span>
            </Text>
          }
          column3={deadline.toLocaleString()}
          column4={
            <Link href={`/stake/${cohortAddress}`}>
              <Button size="xs">Stake</Button>
            </Link>
          }
        />
        <Box p={4}>
          <Image
            m="auto"
            src={cohort?.sbtUrl}
            alt="SBT image preview"
            w="250px"
            boxShadow="dark-lg"
            p="2"
            rounded="md"
            bg="gray"
          />
        </Box>
        {isMember && (
          <Box>
            <Button
              size="md"
              onClick={handleClaimStake}
              isDisabled={userHasNoStake}
              isLoading={isLoadingClaimStake}
            >
              {!userHasNoStake ? "Claim Stake" : "No stake to claim!"}
            </Button>
          </Box>
        )}
      </VStack>
      {isConnected && <BackButton path="/joinCohorts" />}
    </>
  );
};

export default CohortPage;
