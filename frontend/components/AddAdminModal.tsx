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
  Text,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { FieldValues, useForm } from "react-hook-form";
import { GrAdd } from "react-icons/gr";
import { FaMinus } from "react-icons/fa";

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
  const [hideAdmin1, setHideAdmin1] = useState(false);
  const [hideAdmin2, setHideAdmin2] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const localForm = useForm<FieldValues>();
  const { getValues, watch, setValue } = localForm;
  const values = getValues();
  console.log(values);

  const admin1 = "0x000000000000001";
  const admin2 = "0x000000000000002";
  const admins = [admin1];

  const handleEdit = () => {
    setEditAdmin(true);
    console.log(editAdmin);
  };

  const handleSave = () => {
    // submit transaction to HATS contract
    console.log("handleSave");
    setEditAdmin(false);
  };

  const handleCancelEdit = () => {
    console.log("cancel");
    setEditAdmin(false);
  };

  const handleAddAdmin1 = () => {
    setHideAdmin1(!hideAdmin1);
  };

  const handleAddAdmin2 = () => {
    setHideAdmin2(!hideAdmin2);
  };

  const handleDeleteAdmin1 = () => {
    setValue("admin1", "");
  };

  const handleDeleteAdmin2 = () => {
    setValue("admin2", "");
  };

  return (
    <>
      <Button onClick={onOpen} size="sm" variant="outline">
        Cohort Admins
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay onClick={onClose} />
        <ModalContent>
          <ModalHeader>Add admins</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="-1.5em">
            <VStack spacing={3} w={["full", "80%"]} m="auto">
              {/* start admin1 */}
              <HStack alignContent="center" alignItems="end" w="full">
                <Button
                  size="sm"
                  mb={1}
                  color="black"
                  onClick={() => handleAddAdmin1}
                >
                  {hideAdmin1 ? <GrAdd size="1rem" /> : <FaMinus size="1rem" />}
                </Button>
                {!admins[0] ? (
                  <Input
                    label=""
                    name="admin2"
                    placeholder="Enter address"
                    type="text"
                    localForm={localForm}
                    display={hideAdmin1 ? "none" : ""}
                  />
                ) : (
                  <Box border="1px solid red" pb={2} pt={1} px={2} rounded="md">
                    <Text>{admin1}</Text>
                  </Box>
                )}
              </HStack>
              {/* start admin2 */}
              <HStack alignContent="center" alignItems="end" w="full">
                <Button
                  size="sm"
                  mb={1}
                  color="black"
                  onClick={handleAddAdmin2}
                >
                  {hideAdmin2 ? <GrAdd size="1rem" /> : <FaMinus size="1rem" />}
                </Button>
                {!admins[1] ? (
                  <Input
                    label=""
                    name="admin2"
                    placeholder="Enter address"
                    type="text"
                    localForm={localForm}
                    display={hideAdmin2 ? "none" : ""}
                  />
                ) : (
                  <Box border="1px solid red" pb={2} pt={1} px={2} rounded="md">
                    <Text>{admin2}</Text>
                  </Box>
                )}
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Box w="fit">
                <Button onClick={editAdmin ? handleSave : handleEdit} size="md">
                  {editAdmin ? "Save changes" : "edit"}
                </Button>
              </Box>
              <Box
                onClick={handleCancelEdit}
                w="fit"
                display={editAdmin ? "" : "none"}
              >
                <Button size="md">Cancel</Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
