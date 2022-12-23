import React, { ReactNode } from "react";
import { Text } from "@chakra-ui/react";

interface BoxHeaderProps {
  text: string;
}

export const BoxHeader: React.FC<BoxHeaderProps> = ({ text }) => {
  return (
    <Text
      w="full"
      bg="purple"
      color="black"
      p="15px"
      fontFamily="rubik"
      fontSize={{ lg: "1.2rem", sm: "1rem" }}
      mb="2rem"
      textAlign="center"
      opacity={0.85}
    >
      {text}
    </Text>
  );
};
