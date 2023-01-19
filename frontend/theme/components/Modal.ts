import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers([
  "overlay",
  "dialogContainer",
  "dialog",
  "closeButton",
  "body",
  "footer",
]);

const Modal = helpers.defineMultiStyleConfig({
  baseStyle: {
    dialogContainer: {
      position: "fixed",
      border: "1px solid #FF3864",
      fontFamily: "texturina",
      h: "fit",
      bg: "gradientSBTPrev",
      rounded: "2xl",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    dialog: {
      bg: "transparent",
      pt: "3em",
      mt: "0",
      w: "100%",
    },
    footer: {
      marginX: "auto",
      fontSize: "2xl",
      mb: "-3rem",
      bg: "transparent",
    },
  },
  variants: {
    sbt: {
      dialogContainer: {
        w: ["90%", "50%", "45%", "35%"],
      },
      closeButton: {
        color: "red",
      },
    },
    member: {
      dialogContainer: {
        w: ["90%", "80%", "75%", "65%"],
      },
      closeButton: {
        color: "white",
      },
      footer: {
        textAlign: "right",
        w: "full",
        mt: "0.5rem",
      },
    },
  },
  defaultProps: {
    variant: "sbt",
  },
});

export default Modal;
