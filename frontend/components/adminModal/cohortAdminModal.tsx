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
// import useMintAdminHatProposal from "hooks/useMintAdminHatProposal";
// import useTransferAdminHatProposal from "hooks/useTransferAdminHatProposal";
import useReadContract from "hooks/useReadContract";
// import { utils } from "ethers";
import AdminModalAddresses from "./AdminModalAddresses";
import { zeroAddress } from "utils/constants";
import EditCohortAdmins from "./EditCohortAdmins";

interface CohortAdminModalProps {
  address: string | undefined;
}
/**
 * @param address pass in cohort address
 * @returns modal that displays HATS admin. User can click edit, which toggles editAdmin to "edit". User can then change or remote an address to click "save", which will toggle editAdmin to "edit", and create a transaction that creates admins
 */
const CohortAdminModal: React.FC<CohortAdminModalProps> = ({ address }) => {
  const [editAdmins, setEditAdmins] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const localForm = useForm<FieldValues>();
  const {
    register,
    getValues,
    watch,
    formState: { errors, isValid },
  } = localForm;
  watch();
  const values = getValues();
  console.log(values, errors);

  // TODO: REMOVE SUBGRAPH QUERY AND USE HATS CONTRACT TO GET ADMIN
  const { data } = useSubgraphQuery(COHORT_METADATA(address));
  const cohortMetadata = data?.data?.data?.cohort;
  // console.log(cohortMetadata);

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
    // force typing of admin1 and admin2 from "unknown" to string
    const admin1 = data1 ? data1.toString() : "";
    const admin2 = data2 ? data2.toString() : "";

    return { admin1, admin2 };
  };

  const { admin1, admin2 } = getAdmins();
  // console.log(admin1, admin2);

  const handleEditAdmins = () => {
    setEditAdmins(!editAdmins);
  };

  // create new admin1:
  // const {
  //   writeMintAdminHatProposal: newAdmin1,
  //   isLoadingMintAdminHatProposal: isLoadingNewAdmin1,
  // } = useMintAdminHatProposal(address?.toString() || "", [values?.admin1]);

  // create new admin2:
  // const {
  //   writeMintAdminHatProposal: newAdmin2,
  //   isLoadingMintAdminHatProposal: isLoadingNewAdmin2,
  // } = useMintAdminHatProposal(address?.toString() || "", [values?.admin2]);

  // change admin1:
  // const {
  //   writeTransferAdminHatProposal: changeAdmin1,
  //   isLoadingTransferAdminHatProposal: isLoadingChangeAdmin1,
  // } = useTransferAdminHatProposal(address?.toString() || "", [
  //   admin1,
  //   values?.admin1,
  // ]);

  // change admin2:
  // const {
  //   writeTransferAdminHatProposal: changeAdmin2,
  //   isLoadingTransferAdminHatProposal: isLoadingChangeAdmin2,
  // } = useTransferAdminHatProposal(address?.toString() || "", [
  //   admin2,
  //   values?.admin2,
  // ]);

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
              {admin1 !== zeroAddress && !editAdmins && (
                <AdminModalAddresses
                  admin1={admin1}
                  admin2={admin2}
                  setEditAdmins={setEditAdmins}
                />
              )}
              {editAdmins && (
                <EditCohortAdmins
                  admin1={admin1}
                  admin2={admin2}
                  localForm={localForm}
                  register={register}
                  setEditAdmins={setEditAdmins}
                />
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortAdminModal;
