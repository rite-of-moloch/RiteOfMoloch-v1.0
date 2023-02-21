import { Box, Button, Text, VStack } from "@raidguild/design-system";
import React, { useState } from "react";

interface AdminDropdownProps {
  adminA: string | null;
  adminB: string | null;
}
const AdminDropdown: React.FC<AdminDropdownProps> = ({ adminA, adminB }) => {
  const [displayAdmin, setDisplayAdmin] = useState(false);
  const handleDisplayAdmin = () => {
    setDisplayAdmin(!displayAdmin);
  };

  const renderAddAmin = (cohortAddress: string) => {
    console.log("add admin");
  };
  return (
    <VStack>
      <Box onClick={handleDisplayAdmin}>
        <Text>ADMINISTRATORS</Text>
      </Box>
      <Box display={displayAdmin && adminA ? "flex" : "none"}>
        <Text>{adminA}</Text>
      </Box>
      <Box display={displayAdmin && adminB ? "flex" : "none"}>
        <Text>{adminB}</Text>
      </Box>
      <Box display={displayAdmin ? "flex" : "none"}>
        <Button
          variant="solid"
          // onClick={renderAddAmin}
        >
          add admin
        </Button>
      </Box>
    </VStack>
  );
};

export default AdminDropdown;
