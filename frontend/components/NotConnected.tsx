import React from "react";
import ConnectWallet from "./ConnectWallet";
import { Box, Heading, Stack } from "@raidguild/design-system";

const NotConnected = () => {
  return (
    <>
      <Stack w={["60%", "60%", "50%", "40%"]} spacing={"2rem"} mt="-2rem">
        <Heading as="h1" fontFamily="uncial" color="red" textAlign="center">
          SLAY OR BE SLAIN...
        </Heading>
        <Box
          bg="gradientSBTPrev"
          border="red 1px solid"
          rounded="lg"
          textAlign="center"
          py="5rem"
        >
          <ConnectWallet />
        </Box>
      </Stack>
    </>
  );
};

export default NotConnected;
