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
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";

interface CohortConfirmationModalProps {
  openLogic: boolean;
}

const CohortConfirmationModal: React.FC<CohortConfirmationModalProps> = ({
  openLogic,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: openLogic ? true : false,
  });

  console.log(isOpen);

  const shouldOpen = () => {
    openLogic && onOpen;
    // console.log("isOpen", isOpen);
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
          </ModalBody>
          <Box maxH="150px" mx="auto" my={"1rem"}>
            <Image src="/assets/guild_sunset.png" alt="guild-sunset-logo" />
          </Box>
          <ModalFooter>
            <Box w="full" textAlign="center">
              <Link href="/">
                <Button variant="solid" size="md">
                  Home
                </Button>
              </Link>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortConfirmationModal;
