import { Flex, Heading, Image } from "@chakra-ui/react";

export const Page404 = () => {
  return (
    <Flex
      w="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src="/assets/raid__banner.png"
        color="red"
        alt="Raid Guild"
        w="200px"
      />
      <Heading color="red">404 Page not found</Heading>
    </Flex>
  );
};
