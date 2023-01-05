import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const Tooltip = defineStyleConfig({
  baseStyle: {
    fontWeight: "normal",
    border: "1px solid",
    p: "1rem",
    color: "white",
  },
  variants: {
    rgTheme: defineStyle({
      bg: "gradientSBTPrev",
      borderColor: "red",
      borderRadius: "xl",
    }),
  },
  defaultProps: {
    variant: "rgTheme",
  },
});

export default Tooltip;
