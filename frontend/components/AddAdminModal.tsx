import React, { useState } from "react";
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
  HStack,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { FieldValues, useForm } from "react-hook-form";

interface AddAdminModalProps {
  address: string | undefined;
}
/**
 * @remarks
 * @param address pass in cohort address
 * @returns modal that displays HATS admin. User can click edit, which toggles editAdmin to "edit". User can then change or remote an address to click "save", which will toggle editAdmin to "edit", and create a transaction that creates admins
 */
const AddAdminModal: React.FC<AddAdminModalProps> = ({ address }) => {
  const [editAdmin, setEditAdmin] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const localForm = useForm<FieldValues>();
  const { getValues, watch, setValue } = localForm;
  const values = getValues();

  // TODO: replace adminPlaceholders with values from subgraph

  const admin1Placeholder = "0x000000000000001";
  const admin2Placeholder = "0x000000000000002";

  const handleEdit = () => {
    setEditAdmin(true);
  };

  const handleSaveEdit = () => {
    // submit transaction to HATS contract
    setValue("admin1", values?.admin1);
    setValue("admin2", values?.admin2);
    watch();
    setEditAdmin(false);
    onClose();
  };

  const handleCancelEdit = () => {
    setValue("admin1", admin1Placeholder);
    setValue("admin2", admin2Placeholder);
    watch();
    setEditAdmin(false);
    onClose();
  };

  console.log(editAdmin);

  return (
    <>
      <Button onClick={onOpen} size="sm" variant="outline">
        Cohort Admins
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay onClick={onClose} />
        <ModalContent>
          <ModalHeader>Cohort Administrators</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="-1.5em">
            <VStack spacing={3} w={["full", "80%"]} m="auto">
              <Input
                label="Admin 1"
                name="admin1"
                placeholder="Enter address"
                type="text"
                defaultValue={admin1Placeholder}
                localForm={localForm}
                autoComplete="false"
                isDisabled={!editAdmin}
              />
              <Input
                label="Admin 2"
                name="admin2"
                placeholder="Enter address"
                type="text"
                defaultValue={admin2Placeholder}
                autoComplete="false"
                localForm={localForm}
                isDisabled={!editAdmin}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Box>
                {editAdmin ? (
                  <Button onClick={handleSaveEdit} size="md">
                    Save changes
                  </Button>
                ) : (
                  <Button onClick={handleEdit} size="md">
                    Edit
                  </Button>
                )}
              </Box>
              <Box onClick={handleCancelEdit}>
                {editAdmin ? (
                  <Button onClick={handleCancelEdit} size="md">
                    Cancel
                  </Button>
                ) : (
                  <Button onClick={() => onClose()} size="md">
                    Close
                  </Button>
                )}
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
