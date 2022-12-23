import { VStack, Heading, Image } from "@chakra-ui/react";

const HeaderOne = () => {
  return (
    <VStack justifyContent="center" m="auto">
      <Heading
        as="h1"
        fontFamily="uncial"
        color="red"
        textAlign="center"
        mb="-2rem"
      >
        SLAY OR BE SLAIN...
      </Heading>
      <Image
        src="assets/season-v-token.svg"
        alt="SLAY OR BE SLAIN..."
        boxSize="50%"
      />
    </VStack>
  );
};

export default HeaderOne;
