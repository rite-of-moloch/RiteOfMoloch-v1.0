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
  GridItem,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { CohortMetadata } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import { getDeadline, unixToUTC } from "utils/general";
import { COHORT_METADATA } from "utils/subgraph/queries";
import { useRouter } from "next/router";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import BlockExplorerLink from "./BlockExplorerLink";
import useSacrifice from "hooks/useSacrifice";

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
  const cohort: CohortMetadata | null = metadata?.data?.data?.data?.cohort;

  const deadline = getDeadline(cohort?.createdAt, cohort?.time);
  const { writeSacrifice } = useSacrifice(cohortAddress?.toString() || "0x");
  console.log(writeSacrifice);

  const isPassedStakingDate = () => {
    const today = new Date().getTime();
    const stakingLogic = deadline < today.toString();
    return stakingLogic ? true : false;
  };

  // TODO: create cohort with msg.sender as admin and test writeSacrifice function
  const handleSlashStake = () => {
    if (!!isPassedStakingDate) {
      writeSacrifice && writeSacrifice();
    } else {
      return;
    }
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
              <GridItem margin="auto">
                <Text>{address && BlockExplorerLink(chain, address)}</Text>
              </GridItem>
              <GridItem margin="auto">
                <Text>{stake}</Text>
              </GridItem>
              <GridItem margin="auto">
                <Text>{joinedAt}</Text>
              </GridItem>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Box>
              <Button
                variant="solid"
                size="md"
                onClick={handleSlashStake}
                isDisabled={!isPassedStakingDate()}
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
