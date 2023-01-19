import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Text,
  Image,
  SimpleGrid,
  Box,
  HStack,
  Link,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";

interface CohortMemberModalProps {
  initiateData: MemberData;
}

const CohortMemberModal: React.FC<CohortMemberModalProps> = ({
  initiateData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useNetwork();

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address.slice(0, 4)}...{address.slice(-6)}
    </Link>
  );

  const handleSlashStake = () => {
    console.log("slashing member stake");
    // Ethers slash function
  };
  return (
    <>
      <Button onClick={onOpen} size="xxs" w="full">
        Manage
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} variant="member">
        <ModalOverlay onClick={onClose} />
        <ModalContent minW="full">
          <ModalCloseButton />
          <ModalBody mx="-1.5em">
            <SimpleGrid columns={3} spacingX={2} mb={2}>
              <Box justifySelf="center" textAlign="center" w="full">
                Address:
              </Box>
              <Box justifySelf="center" textAlign="center" w="full">
                Shares:
              </Box>
              <Box justifySelf="center" textAlign="center" w="full">
                Date Staked:
              </Box>
            </SimpleGrid>
            <SimpleGrid
              columns={3}
              spacingX={2}
              px={2}
              pt={2}
              pb={2.5}
              bg="black"
              borderTop="1px solid #FF3864"
              borderBottom="1px solid #FF3864"
              alignItems="center"
            >
              <Box justifySelf="center" textAlign="center" w="full">
                <Text>{blockExplorerLink(initiateData.address)}</Text>
              </Box>
              <Box
                justifySelf="center"
                justifyContent="center"
                textAlign="center"
                w="full"
                // px={3}
              >
                <Text>{initiateData.stake}</Text>
              </Box>
              <Box
                justifySelf="center"
                justifyContent="center"
                textAlign="center"
                w="full"
              >
                <Text>{initiateData.joinedAt}</Text>
              </Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Box>
              <Button variant="gray" size="md" onClick={handleSlashStake}>
                Slash Stake
              </Button>
              <Text mt={1} fontSize="xx-small" color="red">
                Slashing is available in {initiateData.joinedAt} days
              </Text>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortMemberModal;
