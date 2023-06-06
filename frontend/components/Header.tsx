import React, { ReactNode } from "react";
import { Flex, Image, Text, Box } from "@raidguild/design-system";
import Link from "next/link";
import ConnectBtn from "./ConnectWallet";
import { useAccount } from "wagmi";

interface HeaderProps {
  children?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const { isConnected } = useAccount();
  return (
    <Flex h="100px" w="100%" alignItems="center" justifyContent="space-between">
      <Link href="/" passHref>
        <Flex alignItems="center">
          <Image
            src="/assets/logos/swords.webp"
            alt="logo"
            w={["1rem", "1.5rem", "2rem"]}
          />
          <Box mx={"0.5rem"} color="red" fontFamily="uncial">
            <Text cursor={"pointer"} fontSize={["1rem", "1rem", "1.5rem"]}>Rite Of Moloch</Text>
          </Box>
        </Flex>
      </Link>
      {isConnected && <ConnectBtn />}
    </Flex>
  );
};
