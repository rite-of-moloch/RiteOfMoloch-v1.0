import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  HStack,
  Box,
  Image,
} from "@raidguild/design-system";
import { FiKey, FiChevronDown, FiXCircle } from "react-icons/fi";
import { truncateAddress } from "utils/general";

const ConnectWallet = () => {
  const { isConnecting, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => (
        <div
          {...(!mounted && {
            "aria-hidden": true,
            style: {
              opacity: 0,
              pointerEvents: "none",
              userSelect: "none",
            },
          })}
        >
          {(() => {
            if (!mounted || !account || !chain) {
              return (
                <Button
                  variant="solid"
                  leftIcon={<FiKey />}
                  disabled={isConnecting}
                  onClick={openConnectModal}
                  data-cy="connect-wallet"
                >
                  Connect
                </Button>
              );
            }

            if (chain.unsupported) {
              return (
                <Button variant="solid" onClick={openChainModal}>
                  Unsupported network
                </Button>
              );
            }

            return (
              <Flex gap={3}>
                <Menu offset={[0, 4]} placement="bottom-end" autoSelect={false}>
                  <Button variant="solid" onClick={openChainModal}>
                    <Image
                      alt={chain.name ?? "Chain icon"}
                      src={chain.iconUrl}
                      width={25}
                      height={25}
                      mr={2}
                    />
                    {chain.name}
                  </Button>

                  <MenuButton
                    as={Button}
                    variant="solid"
                    rightIcon={
                      <Icon as={FiChevronDown} color="brand.primary.600" />
                    }
                  >
                    {account.ensName
                      ? account.ensName
                      : truncateAddress(account.address)}
                  </MenuButton>
                  <MenuList backgroundColor="gray.800" minWidth="none" py={0}>
                    <MenuItem
                      onClick={() => openAccountModal()}
                      _hover={{ backgroundColor: "gray.600" }}
                    >
                      <HStack>
                        <Icon as={FiKey} color="white" />
                        <Box color="white">Wallet</Box>
                      </HStack>
                    </MenuItem>
                    <MenuItem
                      onClick={() => disconnect()}
                      _hover={{ backgroundColor: "gray.600" }}
                    >
                      <HStack spacing={2}>
                        <Icon as={FiXCircle} color="red.300" />
                        <Box color="red.300">Sign Out</Box>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            );
          })()}
        </div>
      )}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;
