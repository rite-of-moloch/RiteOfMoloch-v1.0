import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  SimpleGrid,
  Box,
  Link,
  Flex,
  VStack,
  Image,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { CohortMetadata, MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import { unixToUTC } from "utils/general";
import { COHORT_INITIATES, COHORT_METADATA } from "utils/subgraph/queries";
import { useRouter } from "next/router";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { ReactNode } from "react";
import BackButton from "components/BackButton";
// import useIsMember from "hooks/useIsMember";

interface CohortDetailModalProps {
  children: ReactNode;
}

/**
 * Returns a modal containing data about msg.sender if he has staked to the cohort. Gives option to claim stake back
 *
 * @param address address of cohort. Gets passed into subgraphquery endpoing COHORT_INITIATES and extracts data about msg.sender
 * @returns modal with data about initiate
 */

const CohortDetailModal: React.FC<CohortDetailModalProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const { chain } = useNetwork();

  const router = useRouter();
  const { address: cohortAddress } = router.query;

  const cohortInitiates = useSubgraphQuery(
    COHORT_INITIATES(cohortAddress),
    Boolean(cohortAddress)
  );
  console.log(cohortInitiates);

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address?.slice(0, 4)}...{address?.slice(-6)}
    </Link>
  );

  const handleStakeCohort = () => {
    console.log("stake to cohort function");
    // Ethers slash function
  };

  const handleClaimStake = () => {
    console.log("claim stake function");
  };
  return (
    <>
      <VStack
        border="1px solid #FF3864"
        rounded="xl"
        bg="gradientSBTPrev"
        py={10}
        w={["full", "90%", "70%"]}
      >
        <SimpleGrid columns={3} spacingX={2} w="full">
          <Box justifySelf="start" textAlign="center" w="full">
            Address:
          </Box>
          <Box justifySelf="center" textAlign="center" w="full">
            Shares:
          </Box>
          <Box justifySelf="center" textAlign="center" w="full">
            Date Staked:
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
            <Text>
              cohort address
              {/* {blockExplorerLink(address)} */}
            </Text>
          </Box>
          <Box justifyContent="center" textAlign="center" w="full">
            <Text>
              stake
              {/* {stake} */}
            </Text>
          </Box>
          <Box justifyContent="center" textAlign="center" w="full">
            <Text>ok</Text>
          </Box>
        </SimpleGrid>
        {/* <Flex border="1px" w="full" m="auto"> */}
        <Image
          m="auto"
          src={"/assets/season-v-token.svg"}
          alt="SBT image preview"
          w="50%"
        />
        {/* </Flex> */}

        <Box>
          <Button
            variant="solid"
            size="md"
            onClick={handleClaimStake}
            // disabled={true}
          >
            Claim Stake
          </Button>
        </Box>
      </VStack>
      <BackButton path="/joinCohorts" />
    </>
  );
};

export default CohortDetailModal;
