import React from "react";
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
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { CohortMetadata } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import { getDeadline, unixToUTC } from "utils/general";
import { COHORT_METADATA } from "utils/subgraph/queries";
import { useRouter } from "next/router";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import BlockExplorerLink from "./BlockExplorerLink";

interface CohortMemberModalProps {
  address: string;
  id: string;
  joinedAt: string;
  stake: string;
}

const CohortMemberModal: React.FC<CohortMemberModalProps> = ({
  address,
  joinedAt,
  stake,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useNetwork();
  const router = useRouter();
  const { address: cohortAddress } = router.query;

  const metadata = useSubgraphQuery(COHORT_METADATA(cohortAddress));
  const cohort: CohortMetadata | null = metadata?.data?.cohort;
  // console.log("cohort", cohort);

  const deadline = getDeadline(cohort?.createdAt, cohort?.time);

  // TODO: if current timestamp > deadline, allow for slashing of stake
  const handleSlashStake = () => {
    console.log("slashing...");
    // Ethers slash function
  };

  return (
    <>
      <Button onClick={onOpen} size="xs" w="full">
        Manage
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} variant="member">
        <ModalOverlay onClick={onClose} />
        <ModalContent minW="full">
          <ModalHeader>Initiate</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="-1.5em">
            <SimpleGrid columns={3} spacingX={2} mb={2}>
              <Box justifySelf="center" textAlign="center" w="full">
                Address:
              </Box>
              <Box justifySelf="center" textAlign="center" w="full">
                Minimum shares:
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
              bg="black"
              borderTop="1px solid red"
              borderBottom="1px solid red"
              alignItems="center"
            >
              <Box justifySelf="center" textAlign="center" w="full">
                <Text>{address && BlockExplorerLink(chain, address)}</Text>
              </Box>
              <Box
                justifyContent="center"
                textAlign="center"
                w="full"
                // px={3}
              >
                <Text>{stake}</Text>
              </Box>
              <Box justifyContent="center" textAlign="center" w="full">
                <Text>{joinedAt}</Text>
              </Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Box>
              <Button
                variant="solid"
                size="md"
                onClick={handleSlashStake}
                disabled={true}
              >
                Slash Stake
              </Button>
              <Text mt={1} fontSize="xx-small" color="red" textAlign="center">
                Slashing is available on {unixToUTC(deadline)}
              </Text>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortMemberModal;
