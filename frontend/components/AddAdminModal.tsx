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
import useReadContract from "hooks/useReadContract";
import { utils } from "ethers";

interface AddAdminModalProps {
  address: string | undefined;
}
/**
 * @param address pass in cohort address
 * @returns modal that displays HATS admin. User can click edit, which toggles editAdmin to "edit". User can then change or remote an address to click "save", which will toggle editAdmin to "edit", and create a transaction that creates admins
 */
const AddAdminModal: React.FC<AddAdminModalProps> = ({ address }) => {
  const [editAdmin1, setEditAdmin1] = useState(false);
  const [editAdmin2, setEditAdmin2] = useState(false);
  const [displayAddAdmin1, setDisplayAddAdmin1] = useState(false);
  const [displayAddAdmin2, setDisplayAddAdmin2] = useState(false);
  const [updatedAdmin1, setUpdatedAdmin1] = useState("");
  const [updatedAdmin2, setUpdatedAdmin2] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("editAdmin1", editAdmin1);

  const localForm = useForm<FieldValues>();
  const {
    register,
    getValues,
    watch,
    setValue,
    formState: { errors, isValid },
  } = localForm;
  const values = getValues();
  watch();
  console.log(errors, isValid);

  // TODO: REMOVE SUBGRAPH QUERY AND USE HATS CONTRACT TO GET ADMIN
  const { data } = useSubgraphQuery(COHORT_METADATA(address));
  const cohortMetadata = data?.data?.data?.cohort;

  // call smart contract to get admins
  const getAdmins = () => {
    const { data: data1 } = useReadContract(
      (cohortMetadata?.id as `0x${string}`) || "",
      "riteOfMolochAddress",
      "admin1"
    );
    const { data: data2 } = useReadContract(
      (cohortMetadata?.id as `0x${string}`) || "",
      "riteOfMolochAddress",
      "admin2"
    );
    // force type of admin1 and admin2 from "unknown" to string
    const admin1 = data1 ? data1.toString() : "";
    const admin2 = data2 ? data2.toString() : "";

    return { admin1, admin2 };
  };

  const { admin1, admin2 } = getAdmins();
  console.log(admin1, admin2);

  const zeroAddress = "0x0000000000000000000000000000000000000000";

  // create new admin1
  const {
    writeMintAdminHatProposal: newAdmin1,
    isLoadingMintAdminHatProposal: isLoadingNewAdmin1,
  } = useMintAdminHatProposal(address?.toString() || "", [values?.admin1]);

  // create new admin2
  const {
    writeMintAdminHatProposal: newAdmin2,
    isLoadingMintAdminHatProposal: isLoadingNewAdmin2,
  } = useMintAdminHatProposal(address?.toString() || "", [values?.admin2]);

  // change admin1
  const {
    writeTransferAdminHatProposal: changeAdmin1,
    isLoadingTransferAdminHatProposal: isLoadingChangeAdmin1,
  } = useTransferAdminHatProposal(address?.toString() || "", [
    admin1,
    values?.admin1,
  ]);

  // change admin2
  const {
    writeTransferAdminHatProposal: changeAdmin2,
    isLoadingTransferAdminHatProposal: isLoadingChangeAdmin2,
  } = useTransferAdminHatProposal(address?.toString() || "", [
    admin2,
    values?.admin2,
  ]);

  const handleEdit = () => {
    setEditAdmin1(true);
  };

  const handleSaveEdit = () => {
    // submit transaction to HATS contract
    setValue("admin1", values?.admin1);
    setValue("admin2", values?.admin2);
    watch();
    setEditAdmin1(false);
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
    setEditAdmin1(false);
    onClose();
  };

  const handleDisplayAddAdmin1 = () => {
    setDisplayAddAdmin1(true);
  };

  const handleDisplayAddAdmin2 = () => {
    setDisplayAddAdmin2(true);
  };

  const handleMintAdmin1 = () => {
    setValue("admin1", values?.admin1);
    // submit transaction to HATS contract
    newAdmin1 && newAdmin1();
  };

  const handleMintAdmin2 = () => {
    setValue("admin2", values?.admin2);
    // submit transaction to HATS contract
    newAdmin2 && newAdmin2();
  };

  const handleTransferAdminHatProposal1 = () => {
    // setValue("admin1", values?.admin1);
    // watch();
    console.log(isValid);
    setEditAdmin1(false);
    // transfer HATS admin role to new address
    changeAdmin1 && changeAdmin1();
  };

  const handleTransferAdminHatProposal2 = () => {
    setValue("admin2", values?.admin2);
    watch();
    setEditAdmin2(false);
    // transfer HATS admin role to new address
    changeAdmin2 && changeAdmin2();
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
                        isLoading={isLoadingNewAdmin1}
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
                  {/* editAdmin is set to true when user clicks "change admin button" */}
                  <Input
                    display={!displayAddAdmin1 ? "none" : "block"}
                    label={`Admin 1: ${admin1}`}
                    placeholder="Enter address"
                    type="text"
                    localForm={localForm}
                    {...register("admin1", {
                      onChange: (e) => setValue("admin1", e.target.value),
                      validate: (val) =>
                        utils.isAddress(val) || "Please enter a valid address",
                    })}
                  />
                  <Text>{errors.admin1}</Text>
                  <HStack w="full">
                    <Button
                      onClick={
                        !displayAddAdmin1
                          ? handleDisplayAddAdmin1
                          : handleTransferAdminHatProposal1
                      }
                      isLoading={isLoadingChangeAdmin1}
                      size="md"
                      w="50%"
                    >
                      {!displayAddAdmin1 ? "Change admin" : "Save"}
                    </Button>
                    <Button
                      onClick={() => setDisplayAddAdmin1(false)}
                      size="md"
                      w="50%"
                    >
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
                        isLoading={isLoadingNewAdmin2}
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
                    display={!displayAddAdmin2 ? "none" : "block"}
                    label={`Admin 2: ${admin2}}`}
                    placeholder="Enter address..."
                    type="text"
                    localForm={localForm}
                    {...register("admin2", {
                      onChange: (e) => setValue("admin2", e.target.value),
                      validate: (val) => utils.isAddress(val),
                    })}
                  />
                  <HStack w="full">
                    <Button
                      onClick={
                        !displayAddAdmin2
                          ? handleDisplayAddAdmin2
                          : handleTransferAdminHatProposal2
                      }
                      isLoading={isLoadingChangeAdmin2}
                      size="md"
                      w="50%"
                    >
                      {!displayAddAdmin2 ? "Change admin" : "Save"}
                    </Button>
                    <Button
                      onClick={() => setDisplayAddAdmin2(false)}
                      size="md"
                      w="50%"
                    >
                      Cancel
                    </Button>
                  </HStack>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
