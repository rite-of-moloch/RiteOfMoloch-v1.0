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
      fontFamily: "spaceMono",
      h: "fit",
      bg: "gradientSBTPrev",
      rounded: "2xl",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    dialog: {
      bg: "gradientSBTPrev",
      pt: "3em",
      mt: "0",
    },
    footer: {
      marginX: "auto",
      fontSize: "2xl",
      mb: "-3rem",
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
      overlay: {},
      dialogContainer: {
        w: "fit",
        minW: "fit",
      },
      dialog: { w: "full" },
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
