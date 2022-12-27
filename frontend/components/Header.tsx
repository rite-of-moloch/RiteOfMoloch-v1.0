import React, { ReactNode } from "react";
import { Flex, Image, Text, Box } from "@raidguild/design-system";
import Link from "next/link";
import ConnectBtn from "./ConnectWallet";

interface HeaderProps {
  children?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Flex
      h="100px"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      px="2rem"
    >
      <Link href="/" passHref>
        <Flex alignItems="center" cursor="pointer">
          <Image
            src="/assets/logos/swords.webp"
            alt="logo"
            w={{ lg: "50px", sm: "25px" }}
          />
          <Box mx={"0.5rem"} color="red" fontFamily="uncial">
            <Text fontSize={["1rem", "1rem", "1rem", "1.5rem"]}>
              Rite Of Moloch
            </Text>
          </Box>
        </Flex>
      </Link>
      <ConnectBtn />
    </Flex>
  );
};
