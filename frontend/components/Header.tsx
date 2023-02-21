import React, { ReactNode } from "react";
import { Flex, Image, Text, Box, HStack } from "@raidguild/design-system";
import Link from "next/link";
import ConnectBtn from "./ConnectWallet";
import { useAccount } from "wagmi";
import AdminDropdown from "./adminDropdown";

interface HeaderProps {
  children?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const { isConnected } = useAccount();
  return (
    <Flex
      h="100px"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      // px="2rem"
    >
      <Link href="/" passHref>
        <Flex alignItems="center" cursor="pointer">
          <Image
            src="/assets/logos/swords.webp"
            alt="logo"
            w={["25px", "50px"]}
          />
          <Box mx={"0.5rem"} color="red" fontFamily="uncial">
            <Text fontSize={["1rem", "1.5rem"]}>Rite Of Moloch</Text>
          </Box>
        </Flex>
      </Link>
      {isConnected && (
        // <HStack>
        // <AdminDropdown adminA="0x" adminB="" />
        <ConnectBtn />
        // </HStack>
      )}
    </Flex>
  );
};
