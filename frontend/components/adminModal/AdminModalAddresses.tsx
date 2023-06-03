import { Box, Button, Text, VStack } from "@raidguild/design-system";
import React, { Dispatch } from "react";
import { zeroAddress } from "utils/constants";

interface AdminModalAddressesProps {
  admin1: string;
  admin2: string;
  editAdmins: boolean;
  setEditAdmins: Dispatch<boolean>;
}

/**
 * @remarks - This component is used in the CohortAdminModal component to display the current admin addresses. Component will not display if editAdmins state is true in CohortAdminModal component
 * @param admin1 - address of admin 1 pulled from RoM contract.
 * @param admin2 - address of admin 2 pulled from RoM contract.
 * @param editAdmins - stateful logic used to determine whethere or not to display nodes. passed down from EditCohortAdmin component.
 * @param setEditAdmins - useState setter function for editAdmins passed down from EditCohortAdmin component.
 * @returns div that displays admin addresses and edit button.
 */
const AdminModalAddresses: React.FC<AdminModalAddressesProps> = ({
  admin1,
  admin2,
  editAdmins,
  setEditAdmins,
}) => {
  return (
    <VStack spacing={"1rem"} display={editAdmins ? "none" : "block"} w="full">
      {admin1 === zeroAddress && admin2 === zeroAddress && (
        <Box textAlign="center">
          <Text>
            This cohort has no admin! Click Edit to add up to (2) HATS admin
          </Text>
        </Box>
      )}
      <Box display={admin1 === zeroAddress ? "none" : "block"}>
        <Text>Admin 1:</Text>
        <Box
          bg="black"
          pb={2}
          pt={1}
          px={2}
          mt={1}
          border="1px solid red"
          rounded="md"
          w="full"
        >
          {admin1}
        </Box>
      </Box>

      <Box display={admin2 === zeroAddress ? "none" : "block"}>
        <Text>Admin 2:</Text>
        <Box
          bg="black"
          pb={2}
          pt={1}
          px={2}
          mt={1}
          border="1px solid red"
          rounded="md"
          w="full"
        >
          {admin2}
        </Box>
      </Box>
      <Box w="full" textAlign="center">
        <Button
          onClick={() => setEditAdmins(true)}
          w="50%"
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
