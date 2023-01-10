import React, { ReactNode } from "react";
import ConnectWallet from "./ConnectWallet";
import { Box, Grid, GridItem } from "@raidguild/design-system";
import HeaderOne from "./Header0ne";

interface NotConnectedProps {
  children?: ReactNode;
}

const NotConnected: React.FC<NotConnectedProps> = ({ children }) => {
  return (
    <>
      {/* <HeaderOne /> */}
      <Box
        bg="gradientSBTPrev"
        border="red 1px solid"
        rounded="lg"
        textAlign="center"
        w={["50%", "50%", "30%"]}
        py="5rem"
      >
        <ConnectWallet />
      </Box>
    </>
  );
};

export default NotConnected;
