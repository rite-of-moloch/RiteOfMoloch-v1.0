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
import useReadContract from "hooks/useReadContract";
import EditCohortAdmins from "./EditCohortAdmins";
import useCohort from "hooks/useCohortByAddress";

interface CohortAdminModalProps {
  address: string | undefined;
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

  const { cohort } = useCohort(address || "");

  const getAdmins = () => {
    const { data: data1 } = useReadContract(
      (cohort?.id as `0x${string}`) || "",
      "riteOfMolochAddress",
      "admin1"
    );
    const { data: data2 } = useReadContract(
      (cohort?.id as `0x${string}`) || "",
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
              />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortAdminModal;
