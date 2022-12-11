import { Link, Text } from "@chakra-ui/react";

export const DeployCohortButton = () => {
  return (
    <Link href="/deploy-cohort">
      <Text
        w="fit"
        bg="red"
        p="15px"
        fontFamily="rubik"
        fontSize={{ lg: "1.2rem", sm: "1rem" }}
        mt="6rem"
        mb="2rem"
        mx="auto"
        textAlign="center"
        rounded="md"
        _hover={{
          cursor: "pointer",
          underline: "none",
        }}
      >
        Deploy Your Own Cohort
      </Text>
      <Text color="white" textAlign="center" mb="6rem">
        Deploy your own Cohort to begin slaying Moloch for your DAO today!
      </Text>
    </Link>
  );
};
