import { Box, Button, VStack } from "@raidguild/design-system";
import React, { Dispatch } from "react";
import { zeroAddress } from "utils/constants";

interface AdminModalAddressesProps {
  admin1: string;
  admin2: string;
  setEditAdmins: Dispatch<boolean>;
}

/**
 * @remarks - This component is used in the CohortAdminModal component to display the current admin addresses. Component will not display if editAdmins state is true in CohortAdminModal component
 * @param admin1 - address of admin 1 pulled from RoM contract
 * @param admin2 - address of admin 2 pulled from RoM contract
 * @param setEditAdmins - function that toggles editAdmins state in CohortAdminModal
 * @returns VStack which displays admin addresses and edit button
 */
const AdminModalAddresses: React.FC<AdminModalAddressesProps> = ({
  admin1,
  admin2,
  setEditAdmins,
}) => {
  return (
    <VStack spacing={"1rem"}>
      <Box
        display={admin1 === zeroAddress ? "none" : "block"}
        bg="black"
        pb={2}
        pt={1}
        px={2}
        border="1px solid red"
        rounded="md"
        w="full"
      >
        {admin1}
      </Box>
      <Box
        display={admin2 === zeroAddress ? "none" : "block"}
        bg="black"
        pb={2}
        pt={1}
        px={2}
        border="1px solid red"
        rounded="md"
        w="full"
      >
        {admin2}
      </Box>
      <Box w="50%">
        <Button
          onClick={() => setEditAdmins(true)}
          w="full"
          fontFamily="spaceMono"
          mt="1rem"
        >
          EDIT
        </Button>
      </Box>
    </VStack>
  );
};

export default AdminModalAddresses;
