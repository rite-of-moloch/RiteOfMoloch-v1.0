import { useContext } from "react";
import { VStack, Heading, Image } from "@chakra-ui/react";

export const HeaderOne = () => {
  return (
    <>
      {/* {!context.signerAddress && ( */}
      <VStack justifyContent="center" m="auto" mb="rem">
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
      {/* )} */}
      {/* {context.signerAddress ? ( */}
      <Heading
        as="h1"
        fontFamily="uncial"
        color="red"
        textAlign="center"
        mb="2rem"
      >
        SLAY OR BE SLAIN...
      </Heading>
      {/* ) : null} */}
    </>
  );
};
