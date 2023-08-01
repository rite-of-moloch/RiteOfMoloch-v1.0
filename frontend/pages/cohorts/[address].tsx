import { ReactNode } from "react";
import {
  Button,
  Box,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import { useRouter } from "next/router";
import { useNetwork } from "wagmi";
import InitiateData from "components/InitiateData";
import BackButton from "components/BackButton";
import NobodyStaked from "components/stake/NobodyStaked";
import CohortAdminModal from "components/adminModal/cohortAdminModal";
import GridTemplate from "components/GridTemplate";
import { useInitiatesByCohort } from "hooks/useInitiates";
import { InitiateDetailsFragment } from ".graphclient";
import { useCohortByAddress } from "hooks/useCohort";
import { useSacrifice } from "hooks/useRiteOfMoloch";
import { utils } from "ethers";
import { useDecimalOf } from "hooks/useERC20";

interface CohortDetailProps {
  children: ReactNode;
}

const CohortDetail: React.FC<CohortDetailProps> = () => {
  const { chain } = useNetwork();
  const router = useRouter();
  const { address: cohortAddress } = router.query;

  const { cohorts, isLoading: isLoadingCohort } = useCohortByAddress(
    cohortAddress as string
  );

  const cohort = cohorts?.cohorts?.[0];

  const { initiates, isLoading: isLoadingInitiates } = useInitiatesByCohort(
    cohortAddress as string
  );

  const { writeSacrifice } = useSacrifice(cohortAddress as `0x${string}`);

  const handleSacrifice = () => {
    writeSacrifice && writeSacrifice();
  };

  let { decimals } = useDecimalOf(cohort?.stakingToken as `0x${string}`);

  const renderInitiateList = initiates?.initiates.map(
    (initiate: InitiateDetailsFragment) => {
      const dateJoined = new Date(
        +initiate.joinedAt * 1000
      ).toLocaleDateString();
      return (
        <InitiateData
          address={initiate.address}
          cohortAddress={cohortAddress as `0x${string}`}
          joinedAt={dateJoined}
          stake={utils.formatUnits(initiate.stakeAmount.toString(), decimals)}
          key={initiate.id}
        />
      );
    }
  );

  const isInitiates = renderInitiateList && renderInitiateList.length > 0;
  const cohortName = cohort?.name;

  return (
    <Stack
      w={["full", "full", "80%"]}
      alignSelf="center"
      spacing={5}
      my={!isInitiates ? 8 : 0}
    >
      {isLoadingCohort ? (
        <Box w="full" textAlign="center" p={2} fontFamily="texturina">
          <Spinner size="xl" my="50" color="red" emptyColor="purple" />
          <Text>Loading cohorts...</Text>
        </Box>
      ) : (
        <>
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
              <CohortAdminModal address={cohortAddress as `0x${string}`} />
            </Box>
          </Stack>
        </>
      )}

      {isInitiates && (
        <GridTemplate
          isHeading
          column1="Initiate"
          column2="Amount Staked"
          column3="Date Staked"
          column4="Manage"
        />
      )}

      {initiates?.initiates.length === 0 && isLoadingInitiates && (
        <Box w="full" textAlign="center" p={2} fontFamily="texturina">
          <Spinner size="xl" my="50" color="red" emptyColor="purple" />
          <Text>Loading initiates...</Text>
        </Box>
      )}

      {isInitiates ? renderInitiateList : <NobodyStaked />}

      {isInitiates && (
        <Box>
          <Button variant="solid" size="md" onClick={handleSacrifice}>
            Sacrifice Cohort
          </Button>
          <Text mt={1} fontSize="small" color="red" textAlign="left">
            Sacrifice all initiates that expired,
          </Text>
          <Text mt={1} fontSize="small" color="red" textAlign="left">
            and carry over survivors to new cohort.
          </Text>
        </Box>
      )}

      <BackButton path="/cohorts" />
    </Stack>
  );
};

export default CohortDetail;
