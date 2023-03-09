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
import { COHORT_METADATA } from "utils/subgraph/queries";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";

interface AddAdminModalProps {
  address: string | undefined;
}
/**
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

  const { data: cohortAdmins } = useSubgraphQuery(COHORT_METADATA(address));
  const cohortMetadata = cohortAdmins?.data.data.cohort;
  const admin1 = cohortMetadata?.admin1;
  const admin2 = cohortMetadata?.admin2;
  // console.log(admin1, admin2);

  const zeroAddress = "0x0000000000000000000000000000000000000000";

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

  // if user clicks cancel, form values will revert back to original admin values which are pulled from a subgraph query
  const handleCancelEdit = () => {
    if (admin1 !== zeroAddress) {
      setValue("admin1", admin1);
    } else {
      setValue("admin1", "");
    }

    if (admin2 !== zeroAddress) {
      setValue("admin2", admin2);
    } else {
      setValue("admin2", "");
    }

    watch();
    setEditAdmin(false);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} variant="admin">
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
                defaultValue={admin1 !== zeroAddress ? admin1 : ""}
                localForm={localForm}
                autoComplete="false"
                isDisabled={!editAdmin}
              />
              <Input
                label="Admin 2"
                name="admin2"
                placeholder="Enter address"
                type="text"
                defaultValue={admin2 !== zeroAddress ? admin1 : ""}
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
