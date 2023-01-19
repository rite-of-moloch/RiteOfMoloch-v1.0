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
        <ModalContent w="full">
          <ModalCloseButton />
          <ModalBody mx={"-1.5rem"}>
            <SimpleGrid
              columns={3}
              spacingX={2}
              px={2}
              bg="black"
              borderTop="1px solid #FF3864"
              borderBottom="1px solid #FF3864"
              alignItems="center"
            >
              {/* <Box justifySelf="center" textAlign="center" w="full">
                Cohort Member
              </Box> */}

              <Box justifySelf="center" textAlign="center" w="full">
                {blockExplorerLink(initiateData.address)}
              </Box>
              <Box justifySelf="center" textAlign="center" w="full">
                {initiateData.stake}
              </Box>
              <Box justifySelf="center" textAlign="center" w="full">
                {initiateData.joinedAt}
              </Box>
            </SimpleGrid>
            {/* </HStack> */}
          </ModalBody>

          <ModalFooter>
            <Box>
              <Button variant="outline" size="md" onClick={handleSlashStake}>
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
