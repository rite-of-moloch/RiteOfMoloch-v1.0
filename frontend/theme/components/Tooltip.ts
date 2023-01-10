import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const Tooltip = defineStyleConfig({
  baseStyle: {
    fontWeight: "normal",
    border: "1px solid red",
    px: "1.5rem",
    py: "1rem",
    background: "black",
    textColor: "white",
    borderRadius: "xl",
  },
});

export default Tooltip;
