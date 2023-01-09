import React, { ReactNode } from "react";
import ConnectWallet from "./ConnectWallet";
import { Box, Grid, GridItem } from "@raidguild/design-system";

interface NotConnectedProps {
  children?: ReactNode;
}

const NotConnected: React.FC<NotConnectedProps> = ({ children }) => {
  return (
    <Box
      bg="gradientSBTPrev"
      border="red 1px solid"
      rounded="lg"
      textAlign="center"
      w={["50%", "50%", "30%"]}
      py="5rem"
    >
      <Box left="50%" top="50%">
        <ConnectWallet />
      </Box>
    </Box>
  );
};

export default NotConnected;
