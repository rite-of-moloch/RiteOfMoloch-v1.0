import React, { ReactNode } from "react";
import { Box, Text } from "@chakra-ui/react";

interface BoxHeaderProps {
  text: string;
  color?: string;
}

const BoxHeader: React.FC<BoxHeaderProps> = ({ text, color = "white" }) => {
  return (
    <Box
      w="full"
      bg="purple"
      py="1rem"
      px="1.5rem"
      fontFamily="rubik"
      fontSize={{ lg: "1.2rem", sm: "1rem" }}
      mb="2rem"
      textAlign="center"
      opacity={0.85}
    >
      <Text color={color}>{text}</Text>
    </Box>
  );
};

export default BoxHeader;
