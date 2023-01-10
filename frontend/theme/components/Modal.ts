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
      border: "1px",
      borderColor: "red",
      fontFamily: "spaceMono",
      w: ["90%", "50%", "45%", "30%"],
      h: "fit",
      minH: "20%",
      maxH: "50%",
      bg: "gradientSBTPrev",
      rounded: "2xl",
      position: "absolute",
      left: "50%",
      top: "50%",
      marginLeft: "-25%",
      marginTop: "-125px",
    },
    dialog: {
      bg: "gradientSBTPrev",
      pt: "3em",
      mt: "0",
    },
    closeButton: {
      color: "red",
    },

    footer: {
      marginX: "auto",
      fontSize: "2xl",
      mb: "-3rem",
    },
  },
});

export default Modal;
