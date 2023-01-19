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
      position: "fixed",
      border: "1px solid #FF3864",
      fontFamily: "spaceMono",
      h: "fit",
      bg: "gradientSBTPrev",
      rounded: "2xl",
      top: "50%",
      left: "50%",
      marginTop: "-100px",
      marginLeft: "-250px",
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
        w: ["90%", "50%", "45%", "30%"],
      },
      closeButton: {
        color: "red",
      },
    },
    member: {
      dialogContainer: {
        w: "fit",
        minW: "fit",
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
