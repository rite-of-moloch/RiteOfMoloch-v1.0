import React, { useEffect, useState } from "react";
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  // ModalFooter,
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
import { COHORT_METADATA } from "utils/subgraph/queries";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import useMintAdminHatProposal from "hooks/useMintAdminHatProposal";
import useTransferAdminHatProposal from "hooks/useTransferAdminHatProposal";

interface AddAdminModalProps {
  address: string | undefined;
}
/**
 * @param address pass in cohort address
 * @returns modal that displays HATS admin. User can click edit, which toggles editAdmin to "edit". User can then change or remote an address to click "save", which will toggle editAdmin to "edit", and create a transaction that creates admins
 */
const AddAdminModal: React.FC<AddAdminModalProps> = ({ address }) => {
  const [editAdmin, setEditAdmin] = useState(false);
  const [displayAddAdmin1, setDisplayAddAdmin1] = useState(false);
  const [displayAddAdmin2, setDisplayAddAdmin2] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const localForm = useForm<FieldValues>();
  const { getValues, watch, setValue } = localForm;
  const values = getValues();

  // TODO: REMOVE SUBGRAPH QUERY AND USE HATS CONTRACT TO GET ADMIN
  const { data: cohortAdmins } = useSubgraphQuery(COHORT_METADATA(address));
  const cohortMetadata = cohortAdmins?.data.data.cohort;
  const admin1 = cohortMetadata?.admin1;
  const admin2 = cohortMetadata?.admin2;

  const zeroAddress = "0x0000000000000000000000000000000000000000";

  // create admin proposal for admin1
  const {
    writeMintAdminHatProposal: writeMintAdminHatProposal1,
    isLoadingMintAdminHatProposal: isLoadingMintAdminHatProposal1,
    // errorMintAdminHatProposal: errorMintAdminHatProposal1,
  } = useMintAdminHatProposal(address?.toString() || "", [values?.admin1]);

  // create admin proposal for admin2
  const {
    writeMintAdminHatProposal: writeMintAdminHatProposal2,
    isLoadingMintAdminHatProposal: isLoadingMintAdminHatProposal2,
    // errorMintAdminHatProposal: errorMintAdminHatProposal2,
  } = useMintAdminHatProposal(address?.toString() || "", [values?.admin2]);

  const {
    writeTransferAdminHatProposal: writeTransferAdminHatProposal1,
    isLoadingTransferAdminHatProposal: isLoadingTransferAdminHatProposal1,
    // errorTransferAdminHatProposal,
  } = useTransferAdminHatProposal(address?.toString() || "", [
    admin1,
    values?.admin1,
  ]);

  const {
    writeTransferAdminHatProposal: writeTransferAdminHatProposal2,
    isLoadingTransferAdminHatProposal: isLoadingTransferAdminHatProposal2,
    // errorTransferAdminHatProposal,
  } = useTransferAdminHatProposal(address?.toString() || "", [
    admin2,
    values?.admin2,
  ]);

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

  const handleDisplayAddAdmin1 = () => {
    setDisplayAddAdmin1(!displayAddAdmin1);
  };

  const handleDisplayAddAdmin2 = () => {
    setDisplayAddAdmin2(!displayAddAdmin2);
  };

  const handleMintAdmin1 = () => {
    setValue("admin1", values?.admin1);
    // submit transaction to HATS contract
    writeMintAdminHatProposal1 && writeMintAdminHatProposal1();
  };

  const handleMintAdmin2 = () => {
    setValue("admin2", values?.admin2);
    // submit transaction to HATS contract
    writeMintAdminHatProposal2 && writeMintAdminHatProposal2();
  };

  const handleTransferAdminHatProposal1 = () => {
    setValue("admin1", values?.admin1);
    watch();
    setEditAdmin(false);
    // transfer HATS admin role to new address
    writeTransferAdminHatProposal1 && writeTransferAdminHatProposal1();
  };

  const handleTransferAdminHatProposal2 = () => {
    setValue("admin2", values?.admin2);
    watch();
    setEditAdmin(false);
    // transfer HATS admin role to new address
    writeTransferAdminHatProposal2 && writeTransferAdminHatProposal2();
  };

  useEffect(() => {
    console.log("admin1", admin1, "admin2", admin2);
    console.log("displayAddAdmin1", displayAddAdmin1);
    console.log("displayAddAdmin2", displayAddAdmin2);
  }, [admin1, admin2]);

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
              {/* if no admin exist, let user mint a new admin. Calls mintAdminHatsProposal function */}
              {admin1 === zeroAddress && admin2 === zeroAddress && (
                <>
                  <Box>
                    <Text textAlign="center" color="red">
                      No HATS admin found! You can add a maximum of (2)
                      additional admin to a cohort
                    </Text>
                  </Box>
                  <VStack w="full">
                    <Box display={displayAddAdmin1 ? "" : "none"} w="full">
                      <Input
                        label=""
                        name="admin1"
                        placeholder="Enter address"
                        type="text"
                        autoComplete="false"
                        localForm={localForm}
                      />
                    </Box>
                    <HStack w="full">
                      <Button
                        display={!displayAddAdmin1 ? "none" : ""}
                        size="md"
                        w="full"
                        onClick={handleMintAdmin1}
                        isLoading={isLoadingMintAdminHatProposal1}
                      >
                        Save
                      </Button>
                      <Button
                        size="md"
                        w="full"
                        onClick={handleDisplayAddAdmin1}
                      >
                        {!displayAddAdmin1 ? "Add HATS admin" : "Cancel"}
                      </Button>
                    </HStack>
                  </VStack>
                </>
              )}
              {/* if admin1 exists, display address and let user edit */}
              {admin1 !== zeroAddress && (
                <>
                  <Input
                    label="Admin 1"
                    name="admin1"
                    placeholder="Enter address"
                    type="text"
                    defaultValue={admin1}
                    localForm={localForm}
                    isDisabled={!editAdmin}
                  />
                  <HStack w="full">
                    <Button
                      onClick={handleTransferAdminHatProposal1}
                      isLoading={isLoadingTransferAdminHatProposal1}
                      size="md"
                      w="50%"
                    >
                      Change admin
                    </Button>
                    <Button onClick={handleSaveEdit} size="md" w="50%">
                      cancel
                    </Button>
                  </HStack>
                </>
              )}
              {/* if admin1 exist, but admin2 doesn't exist, user can mint a new admin */}
              {admin1 !== zeroAddress && admin2 === zeroAddress && (
                <>
                  <VStack w="full">
                    <Box display={displayAddAdmin2 ? "" : "none"} w="full">
                      <Input
                        label=""
                        name="admin2"
                        placeholder="Enter address"
                        type="text"
                        autoComplete="false"
                        localForm={localForm}
                      />
                    </Box>
                    <HStack w="full">
                      <Button
                        display={!displayAddAdmin2 ? "none" : ""}
                        size="md"
                        w="full"
                        onClick={handleMintAdmin2}
                        isLoading={isLoadingMintAdminHatProposal2}
                      >
                        Save
                      </Button>
                      <Button
                        size="md"
                        w="full"
                        onClick={handleDisplayAddAdmin2}
                      >
                        {!displayAddAdmin2 ? "Add HATS admin" : "Cancel"}
                      </Button>
                    </HStack>
                  </VStack>
                </>
              )}
              {/* if admin2 exists, display address and let user edit */}
              {admin2 !== zeroAddress && (
                <>
                  <Input
                    label="Admin 2"
                    name="admin2"
                    placeholder="Enter address"
                    type="text"
                    defaultValue={admin2}
                    autoComplete="false"
                    localForm={localForm}
                    isDisabled={!editAdmin}
                  />
                  <HStack w="full">
                    <Button
                      onClick={handleTransferAdminHatProposal2}
                      isLoading={isLoadingTransferAdminHatProposal2}
                      size="md"
                      w="50%"
                    >
                      Change admin
                    </Button>
                    <Button onClick={handleSaveEdit} size="md" w="50%">
                      cancel
                    </Button>
                  </HStack>
                </>
              )}
            </VStack>
          </ModalBody>
          {/* <ModalFooter></ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
