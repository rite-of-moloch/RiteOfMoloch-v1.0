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
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { MemberData } from "utils/types/subgraphQueries";

interface CohortMemberModalProps {
  initiateData: MemberData;
}

const CohortMemberModal: React.FC<CohortMemberModalProps> = ({
  initiateData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mx={"-1.5rem"}>
            <HStack
              bg="black"
              w="full"
              borderTop="1px solid #FF3864"
              borderBottom="1px solid #FF3864"
              py={2}
              px={1}
              justifyContent="space-around"
            >
              <Box ml={3}>Cohort Member</Box>
              <Box>
                {initiateData.address.slice(0, 4)}...
                {initiateData.address.slice(-6)}
              </Box>
              <Box>{initiateData.stake}</Box>
              <Box mr={3}>{initiateData.joinedAt}</Box>
            </HStack>
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
