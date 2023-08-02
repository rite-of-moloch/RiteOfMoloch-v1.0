import React from "react";
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import EditCohortAdmins from "./EditCohortAdmins";
import { useAdmins } from "hooks/useHats";

interface CohortAdminModalProps {
  address: `0x${string}`;
  btnVariant?: "outline" | "admin";
}
/**
 * @param address pass in cohort address
 * @param btnVariant button variant
 * @returns modal that displays HATS admin. User can click edit, which toggles editAdmin to "edit". User can then change or remote an address to click "save", which will toggle editAdmin to "edit", and create a transaction that creates admins
 */
const CohortAdminModal: React.FC<CohortAdminModalProps> = ({
  address,
  btnVariant = "admin",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { admins } = useAdmins(address);
  const [admin1, admin2] = admins;

  return (
    <>
      <Button onClick={onOpen} variant={btnVariant} w="full">
        Cohort Admins
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay onClick={onClose} />
        <ModalContent>
          <ModalHeader>Cohort Administrators</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="-1.5em">
            <VStack spacing={3} w={["full", "80%"]} m="auto">
              <EditCohortAdmins
                address={address}
                admin1={admin1}
                admin2={admin2}
                onClose={onClose}
              />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortAdminModal;
