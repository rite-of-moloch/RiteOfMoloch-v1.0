import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  Text,
  Image,
  Button,
  Link,
  HStack,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";

interface CohortConfirmationModalProps {
  openLogic: boolean;
}

const CohortConfirmationModal: React.FC<CohortConfirmationModalProps> = ({
  openLogic,
}) => {
  const { onOpen, onClose } = useDisclosure({
    defaultIsOpen: openLogic ? true : false,
  });

  const shouldOpen = () => {
    openLogic && onOpen;
  };

  shouldOpen();

  return (
    <>
      <Modal isOpen={openLogic} onClose={onClose} variant="member">
        <ModalOverlay onClick={onClose} />
        <ModalContent minW="full">
          <ModalHeader color="red">Success!</ModalHeader>
          <ModalBody>
            <Text textAlign="center">
              You&apos;ve successfull deployed a chohort
            </Text>
            <Text></Text>
          </ModalBody>
          <Box maxH="150px" mx="auto" my={"1rem"}>
            <Image src="/assets/guild_sunset.png" alt="guild-sunset-logo" />
          </Box>
          <ModalFooter>
            <HStack
              m="auto"
              w={["full", "full", "70%", "50%"]}
              spacing={"1rem"}
            >
              <Box w="50%">
                <Link href="/cohorts">
                  <Button variant="solid" size="md" w="full">
                    View Cohorts
                  </Button>
                </Link>
              </Box>
              <Box w="50%">
                <Link href="/">
                  <Button variant="solid" size="md" w="full">
                    Home
                  </Button>
                </Link>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortConfirmationModal;
