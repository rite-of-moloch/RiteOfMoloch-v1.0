import { Box, Text, VStack } from "@raidguild/design-system";

const nobodyStaked = () => {
  return (
    <VStack
      border="1px solid #FF3864"
      textAlign="center"
      alignSelf="center"
      fontFamily="texturina"
      rounded="lg"
      bg="black"
      p={4}
      w={["full", "80%"]}
    >
      <Box mb={"0.5em"}>
        <Text>Nobody has staked to this cohort yet...</Text>
      </Box>
      <Box
        bgImage="/assets/raid__banner.png"
        bgPosition="center"
        bgRepeat="no-repeat"
        w="full"
        h="89px"
      />
    </VStack>
  );
};

export default nobodyStaked;
