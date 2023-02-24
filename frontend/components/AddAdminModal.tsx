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
  Box,
  VStack,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { useNetwork } from "wagmi";

interface AddAdminModalProps {
  address: string;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ address }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useNetwork();

  return (
    <>
      <Button onClick={onOpen} size="sm" w="full">
        Add Admin
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} variant="member">
        <ModalOverlay onClick={onClose} />
        <ModalContent minW="full">
          <ModalHeader>Add admins</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="-1.5em">
            <VStack>(Add admin here)</VStack>
          </ModalBody>
          <ModalFooter>
            <Box>
              <Button>Add admin</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
