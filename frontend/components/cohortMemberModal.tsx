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
  Tooltip,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { useNetwork } from "wagmi";
import { getDeadline, unixToUTC } from "utils/general";
import BlockExplorerLink from "./BlockExplorerLink";
import useSacrifice from "hooks/useSacrifice";
import useCohortName from "hooks/useCohortByAddress";
import GridTemplate from "./GridTemplate";
import useCohort from "hooks/useCohortByAddress";

interface CohortMemberModalProps {
  address: string;
  cohortAddress: string;
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

  const { cohort } = useCohort(cohortAddress);

  const deadline = getDeadline(cohort?.createdAt, cohort?.time);
  const { writeSacrifice, isError, errorSacrifice, prepareErrorSacrifice } =
    useSacrifice(address?.toString());

  const isPassedStakingDate = () => {
    const today = new Date().getTime();
    const stakingLogic = deadline < today.toString();
    return stakingLogic ? true : false;
  };

  // TODO: create cohort with msg.sender as admin and test writeSacrifice function
  const handlSacrifice = () => {
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
          <ModalHeader color="red">
            <Text>{cohort?.name}</Text>
            <Text fontSize="md">{cohortAddress}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="-1.5em">
            <GridTemplate
              isHeading
              column1="Initiate Address"
              column2="Minimum Shares"
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
                onClick={handlSacrifice}
                isDisabled={!isPassedStakingDate() || isError}
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
