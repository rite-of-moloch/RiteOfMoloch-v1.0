import React, { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Meta } from "./Meta";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box background="purpleGradient">
      <Meta />
      <Flex
        // minH="350px"
        minH="100vh"
        minW="80%"
        maxW="80rem"
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        fontFamily="spaceMono"
        mx="auto"
        px="2rem"
      >
        <Box
          bgImage="/assets/ai_2.png"
          position="fixed"
          height="-webkit-fill-available"
          left="0"
          width="100%"
          opacity="0.09"
          bgPos="top"
          bgSize="cover"
          zIndex={1}
          pointerEvents="none"
        />
        <Header />
        {children}
        <Footer />
      </Flex>
    </Box>
  );
};
