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
import { COHORT_METADATA } from "utils/subgraph/queries";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import useReadContract from "hooks/useReadContract";
// import AdminModalAddresses from "./AdminModalAddresses";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
