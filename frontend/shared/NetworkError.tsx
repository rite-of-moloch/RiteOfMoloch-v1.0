import { Flex, Box, Text } from "@chakra-ui/react";

export const NetworkError = () => {
  return (
    <Flex direction="column" alignItems="center">
      <Box fontSize="40px" color="red">
        <i className="fa-solid fa-circle-xmark"></i>
      </Box>
      <Text fontFamily="spaceMono" color="white" fontSize="1.2rem">
        Unsupported network
      </Text>
    </Flex>
  );
};
