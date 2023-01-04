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
} from "@raidguild/design-system";
import { Modal, ModalHeader } from "@chakra-ui/modal";

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
      <Button
        disabled={sbtImageURL === ""}
        onClick={onOpen}
        variant="outline"
        w="full"
      >
        Preview SBT
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={sbtImageURL} alt="SBT image preview" />
          </ModalBody>

          <ModalFooter>
            <Text>{sbtName}</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewModal;
