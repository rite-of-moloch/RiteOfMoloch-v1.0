import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Text,
  Box,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";

interface PreviewModalProps {
  sbtImageURL: string;
  sbtName: string;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  sbtImageURL,
  sbtName,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} variant="outline" w="full">
        Preview SBT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>{sbtImageURL}</ModalBody>

          <ModalFooter>
            <Text fontSize="2xl">{sbtName}</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewModal;
