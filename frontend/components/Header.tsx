import React, { ReactNode } from "react";
import {
  Flex,
  Image,
  Text,
  // Popover,
  // PopoverTrigger,
  // PopoverContent,
  Button,
  // ConnectButton,
} from "@raidguild/design-system";
import Link from "next/link";
import styled from "@emotion/styled";
import { useContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useRouter } from "next/router";

// import { AppContext } from "../context/AppContext";

// import { SUPPORTED_NETWORK_IDS } from "../config";

// const getAccountString = (account: string) => {
//   const len = account.length;
//   return `0x${account.substr(2, 3).toUpperCase()}...${account
//     .substr(len - 3, len - 1)
//     .toUpperCase()}`;
// };

// const StyledPrimaryButton = styled(Button)`
//   min-width: 160px;
//   height: 50px;
//   text-transform: uppercase;
//   color: black;
//   border-radius: 2px;
//   padding-left: 24px;
//   padding-right: 24px;
// `;

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
      <ConnectButton />
      {/* {!context.signerAddress && (
        <StyledPrimaryButton
          bg="red"
          onClick={connectWallet}
          fontFamily="spaceMono"
        >
          CONNECT
        </StyledPrimaryButton>
      )}

      {context.signerAddress && (
        <Flex justify="center" align="center" zIndex={5} fontFamily="jetbrains">
          <Text color="white" fontFamily="jetbrains" mr="1rem" fontSize=".8rem">
            {SUPPORTED_NETWORK_IDS[context.chainId]}
          </Text>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button
                h="auto"
                bg="blackDark"
                fontWeight="normal"
                _hover={{ opacity: "0.8" }}
                p={{ base: 0, md: 3 }}
              >
                <Text px={2} display={{ md: "flex" }} color="red">
                  {getAccountString(context.signerAddress)}
                </Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent bg="none" w="auto" border="none">
              <Button
                bg="red"
                onClick={() => {
                  disconnect();
                }}
                mt="5px"
              >
                Disconnect
              </Button>
            </PopoverContent>
          </Popover>
        </Flex>
      )} */}
    </Flex>
  );
};
