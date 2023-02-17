import React, { ReactNode } from "react";
import ConnectWallet from "./ConnectWallet";
import { Box, Heading } from "@raidguild/design-system";

interface NotConnectedProps {
  children?: ReactNode;
}

const NotConnected: React.FC<NotConnectedProps> = ({ children }) => {
  return (
    <>
      <Heading as="h1" fontFamily="uncial" color="red" textAlign="center">
        SLAY OR BE SLAIN...
      </Heading>
      <Box
        bg="gradientSBTPrev"
        border="red 1px solid"
        rounded="lg"
        textAlign="center"
        w={["60%", "60%", "50%", "40%"]}
        py="5rem"
      >
        <ConnectWallet />
      </Box>
    </>
  );
};

export default NotConnected;
