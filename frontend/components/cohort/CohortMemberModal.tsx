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
  Box,
  Tooltip,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { useNetwork } from "wagmi";
import BlockExplorerLink from "../blockExplorer/BlockExplorerLink";
import { useSlaughter } from "hooks/useRiteOfMoloch";
import GridTemplate from "../GridTemplate";
import { useCohortByAddress } from "hooks/useCohort";
import { DateTime } from "luxon";

interface CohortMemberModalProps {
  address: `0x${string}`;
  cohortAddress: `0x${string}`;
  joinedAt: string;
  stake: string;
}

const CohortMemberModal: React.FC<CohortMemberModalProps> = ({
  address,
  cohortAddress,
  joinedAt,
  stake,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useNetwork();
  const { cohorts } = useCohortByAddress(cohortAddress);

  const cohort = cohorts?.cohorts?.[0];

  const { writeSlaughter, isError } = useSlaughter(cohortAddress, [address]);

  const deadline = Number(cohort?.joinEndTime);

  const isPassedStakingDate = () => {
    const nowUnix = Math.round(new Date().getTime() / 1000);
    return deadline > nowUnix ? true : false;
  };

  const handleSlaughter = () => {
    if (isPassedStakingDate()) {
      writeSlaughter && writeSlaughter();
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
          <ModalHeader color="red">
            <Text>{cohort?.name}</Text>
            <Text fontSize="md">{cohortAddress}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="-1.5em">
            <GridTemplate
              isHeading
              column1="Initiate Address"
              column2="Amount Staked"
              column3="Date Staked"
            />
            <GridTemplate
              column1={
                <Tooltip
                  label={address}
                  shouldWrapChildren
                  hasArrow
                  placement="bottom"
                >
                  <Text>{address && BlockExplorerLink(chain, address)}</Text>
                </Tooltip>
              }
              column2={stake}
              column3={joinedAt}
            />
          </ModalBody>
          <ModalFooter>
            <Box>
              <Button
                variant="solid"
                size="md"
                onClick={handleSlaughter}
                isDisabled={!isPassedStakingDate() || isError}
              >
                Slash Stake
              </Button>
              <Text mt={1} fontSize="xx-small" color="red" textAlign="center">
                Slashing is available on{" "}
                {DateTime.fromSeconds(deadline).toLocaleString()}
              </Text>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortMemberModal;
