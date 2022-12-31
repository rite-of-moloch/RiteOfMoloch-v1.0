import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers([
  "dialogContainer",
  "dialog",
  "closeButton",
  "body",
  "footer",
]);

const Modal = helpers.defineMultiStyleConfig({
  baseStyle: {
    dialogContainer: {
      // alignSelf: "center",
      border: "1px",
      borderColor: "red",
      fontFamily: "spaceMono",
      w: ["70%", "70%", "45%", "30%"],
      h: "50%",
      bg: "gradientSBTPrev",
      rounded: "xl",
      m: "auto",
    },
    dialog: {
      bg: "gradientSBTPrev",
      // alignContent: "center",
    },
    closeButton: {
      bg: "transparent",
      color: "red",
    },
    body: {},
  },
});

export default Modal;
