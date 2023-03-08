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
  Input,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { FieldValues, useForm } from "react-hook-form";

interface AddAdminModalProps {
  address: string;
}
/**
 *
 * @param address pass in cohort address
 * @returns
 */
const AddAdminModal: React.FC<AddAdminModalProps> = ({ address }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const localForm = useForm<FieldValues>();
  const { getValues, watch } = localForm;
  const values = getValues();
  console.log(values);

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
            <VStack spacing={3}>
              <Box>
                <Input
                  label="Admin1"
                  name="admin1"
                  placeholder="Enter address"
                  type="text"
                  localForm={localForm}
                />
              </Box>
              <Box>
                <Input
                  label="Admin 2"
                  name="admin2"
                  placeholder="Enter address"
                  type="text"
                  localForm={localForm}
                />
              </Box>
            </VStack>
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
