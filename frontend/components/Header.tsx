import React, { ReactNode } from "react";
import { Flex, Image, Button } from "@raidguild/design-system";
import Link from "next/link";
import ConnectBtn from "./ConnectBtn";

interface HeaderProps {
  children: ReactNode;
}

export const Header = () => {
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
        </Flex>
      </Link>

      <ConnectBtn />
    </Flex>
  );
};
